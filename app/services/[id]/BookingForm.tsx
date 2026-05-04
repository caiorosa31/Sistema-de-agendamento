"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarDays, MapPin, MessageSquare, Clock, ArrowRight } from "lucide-react";

const TIME_SLOTS = [
  "08:00", "09:00", "10:00", "11:00", "12:00",
  "13:00", "14:00", "15:00", "16:00", "17:00", "18:00",
];

function getTodayString() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
}

export function BookingForm({
  serviceId,
  servicePrice,
  servicePriceUnit,
}: {
  serviceId: string;
  servicePrice: number;
  servicePriceUnit: string;
}) {
  const router = useRouter();
  const [form, setForm] = useState({
    date: "",
    time: "09:00",
    address: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.date || !form.address) {
      setError("Data e endereço são obrigatórios.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const dateTime = `${form.date}T${form.time}:00`;

      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId,
          date: dateTime,
          address: form.address,
          notes: form.notes || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Erro ao criar agendamento");
        return;
      }

      router.push(`/bookings/${data.booking.id}/payment`);
    } catch {
      setError("Erro de conexão. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600 flex items-start gap-2">
          <span className="mt-0.5 flex-shrink-0">⚠</span>
          {error}
        </div>
      )}

      {/* Date + Time row */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">
            <CalendarDays className="w-3.5 h-3.5" />
            Data
          </label>
          <input
            type="date"
            required
            min={getTodayString()}
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="w-full px-3.5 py-3 border border-gray-200 rounded-xl text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
          />
        </div>

        <div className="space-y-1.5">
          <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">
            <Clock className="w-3.5 h-3.5" />
            Horário
          </label>
          <select
            value={form.time}
            onChange={(e) => setForm({ ...form, time: e.target.value })}
            className="w-full px-3.5 py-3 border border-gray-200 rounded-xl text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition appearance-none"
          >
            {TIME_SLOTS.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Address */}
      <div className="space-y-1.5">
        <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">
          <MapPin className="w-3.5 h-3.5" />
          Endereço do serviço
        </label>
        <input
          type="text"
          required
          placeholder="Rua, número, bairro, cidade"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
          className="w-full px-3.5 py-3 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
        />
      </div>

      {/* Notes */}
      <div className="space-y-1.5">
        <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">
          <MessageSquare className="w-3.5 h-3.5" />
          Observações
          <span className="text-gray-400 font-normal normal-case">(opcional)</span>
        </label>
        <textarea
          placeholder="Instruções especiais para o prestador..."
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
          rows={3}
          className="w-full px-3.5 py-3 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition resize-none"
        />
      </div>

      {/* Total + CTA */}
      <div className="pt-4 border-t border-gray-100 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">Total a pagar</span>
          <div className="text-right">
            <span className="text-2xl font-bold text-gray-900">
              R$ {servicePrice.toFixed(2).replace(".", ",")}
            </span>
            <span className="text-sm text-gray-400 ml-1">{servicePriceUnit}</span>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-700 hover:bg-indigo-800 active:bg-indigo-900 text-white font-semibold py-4 rounded-xl transition-all text-sm disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm shadow-indigo-200"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              Agendando...
            </>
          ) : (
            <>
              Agendar e Pagar
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
