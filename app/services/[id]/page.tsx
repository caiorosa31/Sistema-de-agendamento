import { notFound } from "next/navigation";
import Link from "next/link";
import { Clock, User, Tag, ArrowLeft } from "lucide-react";
import { db } from "@/lib/db";
import { getSession } from "@/lib/session";
import { BookingForm } from "./BookingForm";

type Params = { params: Promise<{ id: string }> };

export default async function ServiceDetailPage({ params }: Params) {
  const { id } = await params;

  const service = await db.service.findUnique({
    where: { id, isActive: true },
    include: {
      provider: { select: { id: true, name: true, bio: true, avatar: true } },
    },
  });

  if (!service) notFound();

  const session = await getSession();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-extrabold text-indigo-700 tracking-tight">
            SERVICELY
          </Link>
          <div className="flex items-center gap-3">
            {session ? (
              <Link
                href={session.role === "PROVIDER" ? "/provider/dashboard" : "/dashboard"}
                className="text-sm font-medium text-gray-600 hover:text-indigo-700 transition-colors"
              >
                Painel
              </Link>
            ) : (
              <>
                <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-gray-900">
                  Entrar
                </Link>
                <Link
                  href="/register"
                  className="bg-indigo-700 hover:bg-indigo-800 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
                >
                  Cadastrar
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <Link
          href="/services"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar aos serviços
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Service info */}
          <div className="space-y-6">
            {service.image ? (
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-64 object-cover rounded-2xl"
              />
            ) : (
              <div className="w-full h-64 bg-indigo-50 rounded-2xl flex items-center justify-center">
                <span className="text-indigo-200 text-6xl font-bold">
                  {service.title[0]}
                </span>
              </div>
            )}

            <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
              <div>
                <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
                  {service.category}
                </span>
                <h1 className="text-2xl font-bold text-gray-900 mt-3">{service.title}</h1>
                <p className="text-gray-500 text-sm mt-2 leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center">
                    <Clock className="w-4 h-4 text-indigo-600" />
                  </div>
                  <span>{service.duration} min</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center">
                    <Tag className="w-4 h-4 text-indigo-600" />
                  </div>
                  <span className="font-bold text-indigo-700 text-lg">
                    R$ {service.price.toFixed(2).replace(".", ",")}
                    <span className="font-normal text-gray-400 text-sm"> {service.unit}</span>
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-2">Prestador</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                    {service.provider.avatar ? (
                      <img
                        src={service.provider.avatar}
                        alt={service.provider.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <User className="w-5 h-5 text-indigo-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{service.provider.name}</p>
                    {service.provider.bio && (
                      <p className="text-xs text-gray-400">{service.provider.bio}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Booking section */}
          <div>
            <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-24">
              <h2 className="text-lg font-bold text-gray-900 mb-5">Agendar este Serviço</h2>

              {!session ? (
                <div className="text-center space-y-4 py-4">
                  <p className="text-gray-500 text-sm">
                    Faça login para agendar este serviço.
                  </p>
                  <Link
                    href={`/login?from=/services/${service.id}`}
                    className="block w-full bg-indigo-700 hover:bg-indigo-800 text-white font-semibold py-3 rounded-xl transition-colors text-sm text-center"
                  >
                    Entrar para Agendar
                  </Link>
                  <Link
                    href="/register"
                    className="block w-full border border-indigo-700 text-indigo-700 font-semibold py-3 rounded-xl hover:bg-indigo-50 transition-colors text-sm text-center"
                  >
                    Criar Conta
                  </Link>
                </div>
              ) : session.role === "PROVIDER" ? (
                <div className="text-center py-4">
                  <p className="text-gray-500 text-sm">
                    Prestadores não podem agendar serviços.
                  </p>
                </div>
              ) : (
                <BookingForm
                  serviceId={service.id}
                  servicePrice={service.price}
                  servicePriceUnit={service.unit}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
