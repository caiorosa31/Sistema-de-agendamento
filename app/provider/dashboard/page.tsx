import { redirect } from "next/navigation";
import Link from "next/link";
import { Package, Calendar, TrendingUp, Plus, ChevronRight, Edit, Users } from "lucide-react";
import { getSession } from "@/lib/session";
import { db } from "@/lib/db";

const STATUS_LABELS: Record<string, string> = {
  PENDING: "Aguardando pag.",
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
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

export default async function ProviderDashboardPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const services = await db.service.findMany({
    where: { providerId: session.userId },
    orderBy: { createdAt: "desc" },
  });

  const bookings = await db.booking.findMany({
    where: { service: { providerId: session.userId } },
    include: {
      service: true,
      client: { select: { id: true, name: true, email: true } },
      payment: true,
    },
    orderBy: { date: "asc" },
  });

  const activeServices = services.filter((s) => s.isActive).length;
  const upcomingBookings = bookings.filter(
    (b) => b.status === "PENDING" || b.status === "CONFIRMED"
  );
  const revenue = bookings
    .filter((b) => b.payment?.status === "PAID")
    .reduce((acc, b) => acc + b.service.price, 0);

  return (
    <div className="max-w-5xl space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Olá, {session.name.split(" ")[0]}!
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Gerencie seus serviços e acompanhe seus agendamentos.
          </p>
        </div>
        <Link
          href="/provider/services/new"
          className="flex items-center gap-2 bg-indigo-700 hover:bg-indigo-800 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors"
        >
          <Plus className="w-4 h-4" />
          Novo Serviço
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-4">
          <div className="w-11 h-11 bg-indigo-100 rounded-xl flex items-center justify-center">
            <Package className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{activeServices}</p>
            <p className="text-xs text-gray-500">Serviços Ativos</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-4">
          <div className="w-11 h-11 bg-blue-100 rounded-xl flex items-center justify-center">
            <Calendar className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{upcomingBookings.length}</p>
            <p className="text-xs text-gray-500">Agend. Próximos</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-4">
          <div className="w-11 h-11 bg-green-100 rounded-xl flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">
              R$ {revenue.toFixed(0)}
            </p>
            <p className="text-xs text-gray-500">Receita Total</p>
          </div>
        </div>
      </div>

      {/* My Services */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">Meus Serviços</h2>
          <Link
            href="/provider/services"
            className="text-sm text-indigo-700 font-medium hover:text-indigo-900 flex items-center gap-1"
          >
            Ver todos <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {services.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center">
            <Package className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">Você ainda não criou nenhum serviço.</p>
            <Link
              href="/provider/services/new"
              className="mt-4 inline-flex items-center gap-1.5 text-sm text-indigo-700 font-medium hover:text-indigo-900"
            >
              Criar primeiro serviço <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {services.slice(0, 4).map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-2xl border border-gray-100 p-5 flex items-start justify-between"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-gray-900 text-sm">{service.title}</p>
                    {!service.isActive && (
                      <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                        Inativo
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500">{service.category}</p>
                  <p className="text-sm font-bold text-indigo-700">
                    R$ {service.price.toFixed(2).replace(".", ",")}{" "}
                    <span className="font-normal text-gray-400">{service.unit}</span>
                  </p>
                </div>
                <Link
                  href={`/provider/services/${service.id}/edit`}
                  className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent Bookings */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">Agendamentos Recentes</h2>
          <Link
            href="/provider/bookings"
            className="text-sm text-indigo-700 font-medium hover:text-indigo-900 flex items-center gap-1"
          >
            Ver todos <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {bookings.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center">
            <Users className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">Nenhum agendamento recebido ainda.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {bookings.slice(0, 5).map((booking) => (
              <div
                key={booking.id}
                className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center justify-between"
              >
                <div className="space-y-1">
                  <p className="font-semibold text-gray-900 text-sm">
                    {booking.client.name}
                  </p>
                  <p className="text-xs text-gray-500">{booking.service.title}</p>
                  <p className="text-xs text-gray-400">{formatDate(booking.date)}</p>
                </div>
                <div className="text-right space-y-1.5">
                  <p className="text-sm font-bold text-gray-900">
                    R$ {booking.service.price.toFixed(2).replace(".", ",")}
                  </p>
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                      STATUS_COLORS[booking.status]
                    }`}
                  >
                    {STATUS_LABELS[booking.status]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
