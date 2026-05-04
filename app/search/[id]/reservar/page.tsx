"use client";

import { useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, Calendar, Clock, Shield, Briefcase } from "lucide-react";
import { SERVICES } from "@/lib/services-data";

// ── Horários disponíveis ──────────────────────────────────────────────────────
const TIME_SLOTS = ["09:00 AM", "10:00 AM", "11:00 AM", "01:00 PM", "02:00 PM", "03:00 PM"];

// ── Dias sem disponibilidade ─────────────────────────────────────────────────
const UNAVAILABLE_DAYS = [2, 7, 15, 22, 28];

const WEEKDAYS = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"];
const MONTHS = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

export default function BookingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();

  const service = SERVICES.find((s) => s.id === Number(id)) ?? SERVICES[0];
  const pkg = service.packages["standard"]; // pacote base para o preço
  const SERVICE = {
    title: service.title,
    subtitle: `${pkg.delivery} dias • ${pkg.label}`,
    price: pkg.price,
    tax: 0,
    description: service.description?.split("\n")[0] ?? "",
  };

  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
    setSelectedDay(null);
  };

  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
    setSelectedDay(null);
  };

  const isPast = (day: number) => {
    const d = new Date(viewYear, viewMonth, day);
    const t = new Date(); t.setHours(0, 0, 0, 0);
    return d < t;
  };

  const isUnavailable = (day: number) => UNAVAILABLE_DAYS.includes(day);

  const selectedDate = selectedDay
    ? new Date(viewYear, viewMonth, selectedDay).toLocaleDateString("pt-BR", {
        weekday: "long", day: "numeric", month: "long", year: "numeric",
      })
    : null;

  const canConfirm = selectedDay !== null && selectedTime !== null;
  const total = SERVICE.price + SERVICE.tax;

  const handleConfirm = () => {
    if (!canConfirm) return;
    router.push(`/usuario/agendamentos/upcoming-1`);
  };

  // Build calendar grid
  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* ── Navbar ── */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center gap-4">
          <Link href="/" className="text-base font-extrabold text-indigo-700 tracking-tight">
            SERVICELY
          </Link>
          <nav className="hidden md:flex items-center gap-5 ml-auto text-sm text-gray-600 font-medium">
            <Link href="/" className="hover:text-gray-900 transition-colors">Início</Link>
            <Link href="/search" className="hover:text-gray-900 transition-colors">Serviços</Link>
            <Link href="/support" className="hover:text-gray-900 transition-colors">Suporte</Link>
          </nav>
          <Link
            href="/login"
            className="flex-shrink-0 bg-indigo-700 hover:bg-indigo-800 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            Entrar
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8 space-y-5">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-gray-400">
          <Link href="/" className="hover:text-gray-600 transition-colors">Início</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href={`/services/${id}`} className="hover:text-gray-600 transition-colors">Serviço</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-gray-600">Confirmar Agendamento</span>
        </nav>

        {/* ── Service summary card ── */}
        <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm flex items-start gap-4">
          <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center flex-shrink-0">
            <Briefcase className="w-5 h-5 text-indigo-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-gray-900">{SERVICE.title}</p>
            <p className="text-xs text-gray-500 mt-0.5">{SERVICE.subtitle}</p>
            <p className="text-sm font-semibold text-gray-800 mt-1">
              R$ {SERVICE.price.toFixed(2)}
            </p>
          </div>
          <p className="text-xs text-gray-400 max-w-[200px] hidden sm:block leading-relaxed">
            {SERVICE.description}
          </p>
        </div>

        <div className="flex gap-5 items-start flex-wrap lg:flex-nowrap">

          {/* ── Left: Calendar + Time ── */}
          <div className="flex-1 min-w-0 space-y-5">

            {/* Calendar */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-sm font-bold text-gray-900">Selecionar Data</h2>
                <div className="flex items-center gap-3">
                  <button
                    onClick={prevMonth}
                    className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4 text-gray-500" />
                  </button>
                  <span className="text-sm font-semibold text-gray-700 min-w-[120px] text-center">
                    {MONTHS[viewMonth]} {viewYear}
                  </span>
                  <button
                    onClick={nextMonth}
                    className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <ChevronRight className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              </div>

              {/* Weekday headers */}
              <div className="grid grid-cols-7 mb-2">
                {WEEKDAYS.map((d) => (
                  <div key={d} className="text-center text-xs font-semibold text-gray-400 py-1">
                    {d}
                  </div>
                ))}
              </div>

              {/* Days grid */}
              <div className="grid grid-cols-7 gap-y-1">
                {cells.map((day, i) => {
                  if (!day) return <div key={`empty-${i}`} />;
                  const past = isPast(day);
                  const unavailable = isUnavailable(day);
                  const disabled = past || unavailable;
                  const selected = selectedDay === day;

                  return (
                    <button
                      key={day}
                      disabled={disabled}
                      onClick={() => setSelectedDay(day)}
                      className={`
                        w-full aspect-square flex items-center justify-center rounded-full text-sm font-medium transition-all
                        ${disabled ? "text-gray-300 cursor-not-allowed" : "hover:bg-indigo-50 cursor-pointer"}
                        ${selected ? "bg-indigo-700 text-white hover:bg-indigo-700 shadow-sm" : "text-gray-700"}
                      `}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time slots */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
              <h2 className="text-sm font-bold text-gray-900 mb-4">Selecionar Horário</h2>
              {selectedDay ? (
                <div className="grid grid-cols-3 gap-2">
                  {TIME_SLOTS.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setSelectedTime(slot)}
                      className={`
                        py-2.5 rounded-xl text-sm font-medium border transition-all
                        ${selectedTime === slot
                          ? "bg-indigo-700 text-white border-indigo-700 shadow-sm"
                          : "bg-white text-gray-700 border-gray-200 hover:border-indigo-300 hover:text-indigo-700"
                        }
                      `}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-400 text-center py-4">
                  Selecione uma data para ver os horários disponíveis.
                </p>
              )}
            </div>
          </div>

          {/* ── Right: Booking summary ── */}
          <div className="w-72 flex-shrink-0 space-y-4">
            <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm space-y-4">
              <h2 className="text-sm font-bold text-gray-900">Resumo da Reserva</h2>

              {/* Date */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0 border border-gray-100">
                  <Calendar className="w-4 h-4 text-gray-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">Data</p>
                  <p className="text-sm font-semibold text-gray-800 capitalize mt-0.5">
                    {selectedDate ?? (
                      <span className="text-gray-300 font-normal">Nenhuma data selecionada</span>
                    )}
                  </p>
                </div>
              </div>

              {/* Time */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0 border border-gray-100">
                  <Clock className="w-4 h-4 text-gray-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">Horário</p>
                  <p className="text-sm font-semibold text-gray-800 mt-0.5">
                    {selectedTime ?? (
                      <span className="text-gray-300 font-normal">Nenhum horário selecionado</span>
                    )}
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-100 pt-3 space-y-2 text-sm">
                <div className="flex justify-between text-gray-500">
                  <span>Taxa de Serviço</span>
                  <span>R$ {SERVICE.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Imposto (0%)</span>
                  <span>R$ {SERVICE.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-gray-900 pt-1 border-t border-gray-100">
                  <span>Total</span>
                  <span>R$ {total.toFixed(2)}</span>
                </div>
              </div>

              {/* Confirm button */}
              <button
                onClick={handleConfirm}
                disabled={!canConfirm}
                className={`
                  w-full py-3 rounded-xl font-semibold text-sm transition-all
                  ${canConfirm
                    ? "bg-indigo-700 hover:bg-indigo-800 text-white shadow-sm"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }
                `}
              >
                Confirmar Reserva
              </button>

              <div className="flex items-center justify-center gap-1.5 text-xs text-gray-400">
                <Shield className="w-3.5 h-3.5" />
                Nenhuma cobrança será feita até a confirmação
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-gray-100 py-5 mt-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-gray-400">
          <p>© 2023 SERVICELY. Todos os direitos reservados.</p>
          <div className="flex gap-4">
            <Link href="/privacidade" className="hover:text-gray-600 transition-colors">Política de Privacidade</Link>
            <Link href="/termos" className="hover:text-gray-600 transition-colors">Termos de Serviço</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
