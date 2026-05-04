import { redirect } from "next/navigation";
import { Calendar, Users } from "lucide-react";
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

export default async function ProviderBookingsPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const bookings = await db.booking.findMany({
    where: { service: { providerId: session.userId } },
    include: {
      service: true,
      client: { select: { id: true, name: true, email: true, phone: true } },
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
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Agendamentos</h1>
        <p className="text-gray-500 text-sm mt-1">
          Todos os agendamentos dos seus serviços.
        </p>
      </div>

      {bookings.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center">
          <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Nenhum agendamento recebido ainda.</p>
          <p className="text-sm text-gray-400 mt-1">
            Os agendamentos aparecerão aqui quando clientes agendarem seus serviços.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Próximos ({upcoming.length})
            </h2>
            {upcoming.length === 0 ? (
              <p className="text-gray-400 text-sm">Nenhum agendamento próximo.</p>
            ) : (
              <div className="space-y-3">
                {upcoming.map((booking) => (
                  <div
                    key={booking.id}
                    className="bg-white rounded-2xl border border-gray-100 p-5"
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <p className="font-semibold text-gray-900">
                          {booking.client.name}
                        </p>
                        <p className="text-xs text-gray-500">{booking.client.email}</p>
                        {booking.client.phone && (
                          <p className="text-xs text-gray-500">{booking.client.phone}</p>
                        )}
                      </div>
                      <span
                        className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                          STATUS_COLORS[booking.status]
                        }`}
                      >
                        {STATUS_LABELS[booking.status]}
                      </span>
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-50 flex items-center justify-between text-sm">
                      <div className="space-y-0.5">
                        <p className="text-gray-700 font-medium">{booking.service.title}</p>
                        <p className="text-xs text-gray-400 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatDate(booking.date)}
                        </p>
                        <p className="text-xs text-gray-400">{booking.address}</p>
                      </div>
                      <p className="font-bold text-indigo-700">
                        R$ {booking.service.price.toFixed(2).replace(".", ",")}
                      </p>
                    </div>
                    {booking.notes && (
                      <p className="mt-2 text-xs text-gray-500 bg-gray-50 rounded-lg px-3 py-2">
                        Obs: {booking.notes}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>

          {past.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Histórico ({past.length})
              </h2>
              <div className="space-y-3 opacity-70">
                {past.map((booking) => (
                  <div
                    key={booking.id}
                    className="bg-white rounded-2xl border border-gray-100 p-5"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold text-gray-900">{booking.client.name}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{booking.service.title}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{formatDate(booking.date)}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-gray-700">
                          R$ {booking.service.price.toFixed(2).replace(".", ",")}
                        </p>
                        <span
                          className={`text-xs font-medium px-2.5 py-1 rounded-full mt-1 inline-block ${
                            STATUS_COLORS[booking.status]
                          }`}
                        >
                          {STATUS_LABELS[booking.status]}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
