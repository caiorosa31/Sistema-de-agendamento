import { redirect } from "next/navigation";
import Link from "next/link";
import { Calendar, Clock, CheckCircle, Search, ChevronRight } from "lucide-react";
import { getSession } from "@/lib/session";
import { db } from "@/lib/db";

const STATUS_LABELS: Record<string, string> = {
  PENDING: "Aguardando pagamento",
  CONFIRMED: "Confirmado",
  CANCELLED: "Cancelado",
  COMPLETED: "Concluído",
};

const STATUS_COLORS: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-700",
  CONFIRMED: "bg-green-100 text-green-700",
  CANCELLED: "bg-red-100 text-red-600",
  COMPLETED: "bg-gray-100 text-gray-600",
};

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const bookings = await db.booking.findMany({
    where: { clientId: session.userId },
    include: {
      service: {
        include: { provider: { select: { id: true, name: true } } },
      },
      payment: true,
    },
    orderBy: { date: "asc" },
  });

  const upcoming = bookings.filter(
    (b) => b.status === "PENDING" || b.status === "CONFIRMED"
  );
  const past = bookings.filter(
    (b) => b.status === "CANCELLED" || b.status === "COMPLETED"
  );

  return (
    <div className="max-w-4xl space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Olá, {session.name.split(" ")[0]}!
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Bem-vindo ao seu painel. Aqui você gerencia seus agendamentos.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-4">
          <div className="w-11 h-11 bg-indigo-100 rounded-xl flex items-center justify-center">
            <Calendar className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{bookings.length}</p>
            <p className="text-xs text-gray-500">Total de Agendamentos</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-4">
          <div className="w-11 h-11 bg-blue-100 rounded-xl flex items-center justify-center">
            <Clock className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{upcoming.length}</p>
            <p className="text-xs text-gray-500">Próximos</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-4">
          <div className="w-11 h-11 bg-green-100 rounded-xl flex items-center justify-center">
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">
              {bookings.filter((b) => b.status === "COMPLETED").length}
            </p>
            <p className="text-xs text-gray-500">Concluídos</p>
          </div>
        </div>
      </div>

      {/* Quick action */}
      <div className="bg-indigo-700 rounded-2xl p-6 flex items-center justify-between">
        <div>
          <h3 className="text-white font-semibold">Procurando um serviço?</h3>
          <p className="text-indigo-300 text-sm mt-0.5">
            Explore nossos prestadores verificados
          </p>
        </div>
        <Link
          href="/services"
          className="flex items-center gap-2 bg-white text-indigo-700 font-semibold text-sm px-4 py-2.5 rounded-xl hover:bg-indigo-50 transition-colors"
        >
          <Search className="w-4 h-4" />
          Explorar Serviços
        </Link>
      </div>

      {/* Upcoming bookings */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">Próximos Agendamentos</h2>
          <Link
            href="/dashboard/bookings"
            className="text-sm text-indigo-700 font-medium hover:text-indigo-900 flex items-center gap-1"
          >
            Ver todos <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {upcoming.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center">
            <Calendar className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">Nenhum agendamento próximo.</p>
            <Link
              href="/services"
              className="mt-4 inline-flex items-center gap-1.5 text-sm text-indigo-700 font-medium hover:text-indigo-900"
            >
              Agendar agora <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {upcoming.slice(0, 5).map((booking) => (
              <Link
                key={booking.id}
                href={`/bookings/${booking.id}`}
                className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center justify-between hover:border-indigo-200 hover:shadow-sm transition-all group"
              >
                <div className="space-y-1">
                  <p className="font-semibold text-gray-900 text-sm group-hover:text-indigo-700 transition-colors">
                    {booking.service.title}
                  </p>
                  <p className="text-xs text-gray-500">
                    {booking.service.provider.name}
                  </p>
                  <p className="text-xs text-gray-400">{formatDate(booking.date)}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                      STATUS_COLORS[booking.status]
                    }`}
                  >
                    {STATUS_LABELS[booking.status]}
                  </span>
                  {booking.status === "PENDING" && (
                    <span className="text-xs bg-indigo-600 text-white font-semibold px-3 py-1 rounded-full">
                      Pagar
                    </span>
                  )}
                  <ChevronRight className="w-4 h-4 text-gray-300" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Past bookings */}
      {past.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4">Histórico</h2>
          <div className="space-y-3">
            {past.slice(0, 3).map((booking) => (
              <Link
                key={booking.id}
                href={`/bookings/${booking.id}`}
                className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center justify-between hover:border-gray-200 transition-all opacity-70 hover:opacity-100"
              >
                <div className="space-y-1">
                  <p className="font-semibold text-gray-900 text-sm">
                    {booking.service.title}
                  </p>
                  <p className="text-xs text-gray-400">{formatDate(booking.date)}</p>
                </div>
                <span
                  className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                    STATUS_COLORS[booking.status]
                  }`}
                >
                  {STATUS_LABELS[booking.status]}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
