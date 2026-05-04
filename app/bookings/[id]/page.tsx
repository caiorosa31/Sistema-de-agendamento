"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  Calendar,
  MapPin,
  FileText,
  ArrowLeft,
  Clock,
  CreditCard,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Edit3,
} from "lucide-react";

const STATUS_CONFIG: Record<string, { label: string; textColor: string; bgColor: string; borderColor: string }> = {
  PENDING:   { label: "Aguardando pagamento", textColor: "text-amber-700",   bgColor: "bg-amber-50",   borderColor: "border-amber-200" },
  CONFIRMED: { label: "Confirmado",           textColor: "text-emerald-700", bgColor: "bg-emerald-50", borderColor: "border-emerald-200" },
  CANCELLED: { label: "Cancelado",            textColor: "text-red-600",     bgColor: "bg-red-50",     borderColor: "border-red-200" },
  COMPLETED: { label: "Concluído",            textColor: "text-gray-600",    bgColor: "bg-gray-100",   borderColor: "border-gray-200" },
};

const STATUS_ICONS: Record<string, React.ReactNode> = {
  PENDING:   <AlertCircle className="w-4 h-4" />,
  CONFIRMED: <CheckCircle2 className="w-4 h-4" />,
  CANCELLED: <XCircle className="w-4 h-4" />,
  COMPLETED: <CheckCircle2 className="w-4 h-4" />,
};

const TIME_SLOTS = [
  "08:00", "09:00", "10:00", "11:00", "12:00",
  "13:00", "14:00", "15:00", "16:00", "17:00", "18:00",
];

interface Booking {
  id: string;
  date: string;
  notes: string | null;
  address: string;
  status: string;
  service: {
    id: string;
    title: string;
    price: number;
    unit: string;
    duration: number;
    provider: { name: string };
  };
  payment: { status: string; method: string | null } | null;
}

function formatDate(dateStr: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(dateStr));
}

export default function BookingDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [cancelling, setCancelling] = useState(false);
  const [error, setError] = useState("");
  const [editForm, setEditForm] = useState({
    date: "",
    time: "09:00",
    address: "",
    notes: "",
  });

  useEffect(() => {
    fetch(`/api/bookings/${id}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.booking) {
          setBooking(data.booking);
          const d = new Date(data.booking.date);
          setEditForm({
            date: d.toISOString().split("T")[0],
            time: `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`,
            address: data.booking.address,
            notes: data.booking.notes || "",
          });
        } else {
          setError(data.error || "Agendamento não encontrado");
        }
      })
      .catch(() => setError("Erro ao carregar agendamento"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: `${editForm.date}T${editForm.time}:00`,
          address: editForm.address,
          notes: editForm.notes || null,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Erro ao atualizar");
        return;
      }

      setBooking(data.booking);
      setEditing(false);
    } catch {
      setError("Erro de conexão");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = async () => {
    if (!confirm("Tem certeza que deseja cancelar este agendamento?")) return;
    setCancelling(true);

    try {
      const res = await fetch(`/api/bookings/${id}`, { method: "DELETE" });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Erro ao cancelar");
        return;
      }

      setBooking(data.booking);
    } catch {
      setError("Erro de conexão");
    } finally {
      setCancelling(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-indigo-700 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (error && !booking) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-4">
        <p className="text-red-600">{error}</p>
        <Link href="/dashboard" className="text-indigo-700 font-medium hover:underline">
          Voltar ao painel
        </Link>
      </div>
    );
  }

  if (!booking) return null;

  const statusCfg = STATUS_CONFIG[booking.status] ?? STATUS_CONFIG.PENDING;
  const canEdit = booking.status !== "CANCELLED" && booking.status !== "COMPLETED";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-extrabold text-indigo-700 tracking-tight">
            SERVICELY
          </Link>
          <Link href="/dashboard" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
            Meu Painel
          </Link>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-6 py-8 space-y-5">
        {/* Breadcrumb */}
        <Link
          href="/dashboard/bookings"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Meus Agendamentos
        </Link>

        {/* Title row */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Agendamento</h1>
            <p className="text-xs text-gray-400 mt-0.5 font-mono">#{booking.id.slice(-8).toUpperCase()}</p>
          </div>
          <span
            className={`inline-flex items-center gap-1.5 text-sm font-semibold px-3 py-1.5 rounded-full border ${statusCfg.textColor} ${statusCfg.bgColor} ${statusCfg.borderColor}`}
          >
            {STATUS_ICONS[booking.status]}
            {statusCfg.label}
          </span>
        </div>

        {error && (
          <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Service card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="h-1.5 bg-gradient-to-r from-indigo-500 to-indigo-700" />
          <div className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-bold text-gray-900 text-lg">{booking.service.title}</h2>
                <p className="text-sm text-gray-500 mt-0.5">{booking.service.provider.name}</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-indigo-700">
                  R$ {booking.service.price.toFixed(2).replace(".", ",")}
                </p>
                <p className="text-xs text-gray-400">{booking.service.unit}</p>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-1.5 text-sm text-gray-500">
              <Clock className="w-4 h-4 text-gray-400" />
              {booking.service.duration} min de duração
            </div>
          </div>
        </div>

        {/* Details / Edit form */}
        {editing ? (
          <form onSubmit={handleSave} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
            <div className="flex items-center gap-2">
              <Edit3 className="w-4 h-4 text-indigo-600" />
              <h3 className="font-bold text-gray-900">Editar Agendamento</h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide">Data</label>
                <input
                  type="date"
                  required
                  value={editForm.date}
                  onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
                  className="w-full px-3.5 py-3 border border-gray-200 rounded-xl text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide">Horário</label>
                <select
                  value={editForm.time}
                  onChange={(e) => setEditForm({ ...editForm, time: e.target.value })}
                  className="w-full px-3.5 py-3 border border-gray-200 rounded-xl text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                >
                  {TIME_SLOTS.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide">Endereço</label>
              <input
                type="text"
                required
                value={editForm.address}
                onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                className="w-full px-3.5 py-3 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Observações <span className="font-normal text-gray-400 normal-case">(opcional)</span>
              </label>
              <textarea
                value={editForm.notes}
                onChange={(e) => setEditForm({ ...editForm, notes: e.target.value })}
                rows={3}
                className="w-full px-3.5 py-3 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition resize-none"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 bg-indigo-700 hover:bg-indigo-800 text-white font-semibold py-3 rounded-xl transition-colors text-sm disabled:opacity-70 shadow-sm shadow-indigo-200"
              >
                {saving ? "Salvando..." : "Salvar Alterações"}
              </button>
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="flex-1 border border-gray-200 text-gray-600 font-semibold py-3 rounded-xl hover:bg-gray-50 transition-colors text-sm"
              >
                Cancelar
              </button>
            </div>
          </form>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
            <h3 className="font-bold text-gray-900">Detalhes</h3>

            <div className="space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 bg-indigo-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-4 h-4 text-indigo-600" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Data e Hora</p>
                  <p className="text-sm font-medium text-gray-800 mt-0.5">{formatDate(booking.date)}</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 bg-indigo-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-indigo-600" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Endereço</p>
                  <p className="text-sm font-medium text-gray-800 mt-0.5">{booking.address}</p>
                </div>
              </div>

              {booking.notes && (
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 bg-indigo-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FileText className="w-4 h-4 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Observações</p>
                    <p className="text-sm font-medium text-gray-800 mt-0.5">{booking.notes}</p>
                  </div>
                </div>
              )}
            </div>

            {booking.payment && (
              <div className="pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 bg-emerald-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <CreditCard className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Pagamento</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-sm font-medium text-gray-800">
                        {booking.payment.method === "pix" ? "PIX" : "Cartão de Crédito"}
                      </span>
                      <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-semibold">
                        Pago
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        {canEdit && !editing && (
          <div className="flex flex-col gap-3">
            {booking.status === "PENDING" && !booking.payment && (
              <Link
                href={`/bookings/${booking.id}/payment`}
                className="w-full bg-indigo-700 hover:bg-indigo-800 text-white font-semibold py-4 rounded-xl transition-colors text-sm text-center shadow-sm shadow-indigo-200"
              >
                Realizar Pagamento
              </Link>
            )}

            <button
              onClick={() => setEditing(true)}
              className="w-full border border-gray-200 text-gray-700 font-semibold py-3.5 rounded-xl hover:bg-gray-50 transition-colors text-sm flex items-center justify-center gap-2"
            >
              <Edit3 className="w-4 h-4" />
              Editar Agendamento
            </button>

            {booking.status === "PENDING" && (
              <button
                onClick={handleCancel}
                disabled={cancelling}
                className="w-full text-red-600 border border-red-100 font-semibold py-3.5 rounded-xl hover:bg-red-50 transition-colors text-sm disabled:opacity-50"
              >
                {cancelling ? "Cancelando..." : "Cancelar Agendamento"}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
