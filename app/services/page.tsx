"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Clock, ChevronRight, Package } from "lucide-react";

const CATEGORIES = ["Todos", "Limpeza", "Bem-estar", "Gastronomia", "Jardinagem", "Manutenção", "Outros"];

interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  unit: string;
  category: string;
  image: string | null;
  duration: number;
  provider: { id: string; name: string; avatar: string | null };
}

interface SessionUser {
  name: string;
  role: string;
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todos");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [user, setUser] = useState<SessionUser | null | undefined>(undefined);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => setUser(data?.user ?? null))
      .catch(() => setUser(null));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (debouncedSearch) params.set("search", debouncedSearch);
    if (category !== "Todos") params.set("category", category);

    setLoading(true);
    fetch(`/api/services?${params}`)
      .then((r) => r.json())
      .then((data) => setServices(data.services || []))
      .finally(() => setLoading(false));
  }, [debouncedSearch, category]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-extrabold text-indigo-700 tracking-tight">
            SERVICELY
          </Link>
          <div className="flex items-center gap-3">
            {user === undefined ? null : user ? (
              <Link
                href={user.role === "PROVIDER" ? "/provider/dashboard" : "/dashboard"}
                className="bg-indigo-700 hover:bg-indigo-800 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
              >
                Meu Painel
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                >
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

      <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">
        {/* Page title */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Explorar Serviços</h1>
          <p className="text-gray-500 mt-1">
            Encontre profissionais verificados para o que você precisa.
          </p>
        </div>

        {/* Search + filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar serviços..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            />
          </div>
        </div>

        {/* Category tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                category === cat
                  ? "bg-indigo-700 text-white"
                  : "bg-white border border-gray-200 text-gray-600 hover:border-indigo-300 hover:text-indigo-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-100" />
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-gray-100 rounded w-3/4" />
                  <div className="h-3 bg-gray-100 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : services.length === 0 ? (
          <div className="text-center py-20">
            <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Nenhum serviço encontrado.</p>
            {(search || category !== "Todos") && (
              <button
                onClick={() => { setSearch(""); setCategory("Todos"); }}
                className="mt-3 text-sm text-indigo-700 font-medium hover:text-indigo-900"
              >
                Limpar filtros
              </button>
            )}
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-500">
              {services.length} serviço{services.length !== 1 ? "s" : ""} encontrado{services.length !== 1 ? "s" : ""}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <Link
                  key={service.id}
                  href={`/services/${service.id}`}
                  className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md hover:border-indigo-100 transition-all group"
                >
                  <div className="h-48 overflow-hidden bg-indigo-50">
                    {service.image ? (
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Package className="w-12 h-12 text-indigo-200" />
                      </div>
                    )}
                  </div>
                  <div className="p-5 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-bold text-gray-900 text-sm group-hover:text-indigo-700 transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-xs text-gray-400 mt-0.5">{service.provider.name}</p>
                      </div>
                      <span className="text-indigo-700 font-bold text-sm whitespace-nowrap">
                        R$ {service.price.toFixed(2).replace(".", ",")}
                        <span className="font-normal text-gray-400 text-xs"> {service.unit}</span>
                      </span>
                    </div>
                    <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">
                      {service.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <Clock className="w-3 h-3" />
                        {service.duration} min
                      </div>
                      <span className="text-xs text-indigo-700 font-medium flex items-center gap-0.5">
                        Ver detalhes <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
