import { redirect } from "next/navigation";
import Link from "next/link";
import { Plus, Edit, Package } from "lucide-react";
import { getSession } from "@/lib/session";
import { db } from "@/lib/db";
import { DeleteServiceButton } from "./DeleteServiceButton";

export default async function ProviderServicesPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const services = await db.service.findMany({
    where: { providerId: session.userId },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Meus Serviços</h1>
          <p className="text-gray-500 text-sm mt-1">
            Gerencie os serviços que você oferece.
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

      {services.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center">
          <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 mb-4">Você ainda não criou nenhum serviço.</p>
          <Link
            href="/provider/services/new"
            className="inline-flex items-center gap-2 bg-indigo-700 hover:bg-indigo-800 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
          >
            <Plus className="w-4 h-4" />
            Criar meu primeiro serviço
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                {service.image ? (
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-xl bg-indigo-50 flex items-center justify-center flex-shrink-0">
                    <Package className="w-6 h-6 text-indigo-300" />
                  </div>
                )}
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-gray-900">{service.title}</p>
                    {!service.isActive && (
                      <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                        Inativo
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500">{service.category} · {service.duration} min</p>
                  <p className="text-sm font-bold text-indigo-700">
                    R$ {service.price.toFixed(2).replace(".", ",")}{" "}
                    <span className="font-normal text-gray-400 text-xs">{service.unit}</span>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href={`/provider/services/${service.id}/edit`}
                  className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-indigo-700 hover:bg-indigo-50 px-3 py-2 rounded-lg transition-colors"
                >
                  <Edit className="w-4 h-4" />
                  Editar
                </Link>
                <DeleteServiceButton serviceId={service.id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
