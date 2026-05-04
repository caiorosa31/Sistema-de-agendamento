import { redirect } from "next/navigation";
import Link from "next/link";
import { Calendar, ChevronRight } from "lucide-react";
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

export default async function BookingsPage() {
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

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Meus Agendamentos</h1>
        <p className="text-gray-500 text-sm mt-1">
          Todos os seus agendamentos em um só lugar.
        </p>
      </div>

      {bookings.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center">
          <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Você ainda não tem agendamentos.</p>
          <Link
            href="/services"
            className="mt-4 inline-flex items-center gap-1.5 text-sm text-indigo-700 font-medium hover:text-indigo-900"
          >
            Explorar serviços <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {bookings.map((booking) => (
            <Link
              key={booking.id}
              href={`/bookings/${booking.id}`}
              className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center justify-between hover:border-indigo-200 hover:shadow-sm transition-all group"
            >
              <div className="space-y-1">
                <p className="font-semibold text-gray-900 text-sm group-hover:text-indigo-700 transition-colors">
                  {booking.service.title}
                </p>
                <p className="text-xs text-gray-500">{booking.service.provider.name}</p>
                <p className="text-xs text-gray-400">{formatDate(booking.date)}</p>
                <p className="text-xs text-gray-400">{booking.address}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
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
                {booking.status === "PENDING" && (
                  <span className="text-xs bg-indigo-600 text-white font-semibold px-3 py-1.5 rounded-full">
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
  );
}
