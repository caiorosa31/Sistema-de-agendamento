"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Search, Star, Clock, RefreshCw, Check, Shield, ChevronRight, Send } from "lucide-react";
import { SERVICES } from "@/lib/services-data";

const FOOTER_SERVICES = [
  "Limpeza Residencial",
  "Bem-estar & Massagem",
  "Chefs Pessoais",
  "Jardinagem",
  "Assistência Técnica",
];

const FOOTER_COMPANY = [
  "Limpeza Residencial",
  "Bem-estar & Massagem",
  "Chefs Pessoais",
  "Sobre Nós",
  "Carreiras",
];

export default function ServiceDetailPage() {
  const params = useParams();
  const service = SERVICES.find((s) => s.id === Number(params.id)) ?? SERVICES[3];
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [activeTab, setActiveTab] = useState<"standard" | "premium">("standard");
  const [activeThumb, setActiveThumb] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const pkg = service.packages[activeTab];

  return (
    <div className="min-h-screen bg-white flex flex-col">

      {/* ── Navbar ── */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center gap-4">
          <Link href="/" className="text-base font-extrabold text-indigo-700 tracking-tight flex-shrink-0">
            SERVICELY
          </Link>
          <div className="flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Procurar serviços..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-gray-50 placeholder-gray-400"
            />
          </div>
          <nav className="hidden md:flex items-center gap-5 ml-auto text-sm text-gray-600 font-medium">
            <a href="/" className="hover:text-gray-900 transition-colors">Inicio</a>
            <a href="/search" className="hover:text-gray-900 transition-colors">Serviços</a>
            <a href="/support" className="hover:text-gray-900 transition-colors">Suporte</a>
          </nav>
          <Link
            href="/login"
            className="flex-shrink-0 bg-indigo-700 hover:bg-indigo-800 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            Entrar
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto w-full px-4 py-6 flex-1">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-5">
          <Link href="/" className="hover:text-gray-600 transition-colors">Início</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/search" className="hover:text-gray-600 transition-colors">{service.categoryLabel}</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-gray-600 truncate max-w-xs">{service.title.split(" ").slice(0, 5).join(" ")}</span>
        </nav>

        <div className="flex gap-10 items-start">

          {/* ── Left Column ── */}
          <div className="flex-1 min-w-0 space-y-8">

            {/* Title + seller */}
            <div className="space-y-4">
              <h1 className="text-2xl font-bold text-gray-900 leading-snug">{service.title}</h1>

              <div className="flex items-center gap-3 flex-wrap">
                <img
                  src={service.sellerAvatar}
                  alt={service.seller}
                  className="w-9 h-9 rounded-full object-cover"
                />
                <span className="text-sm font-semibold text-gray-800">{service.seller}</span>
                {service.badge && (
                  <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${service.badgeColor}`}>
                    {service.badge}
                  </span>
                )}
                <div className="flex items-center gap-1 text-sm">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-bold text-gray-800">{service.rating.toFixed(1)}</span>
                  <span className="text-gray-400">({service.reviews} avaliações)</span>
                </div>
                <span className="text-gray-300">|</span>
                <span className="text-xs text-gray-500">{service.ordersInQueue} pedidos em fila</span>
              </div>
            </div>

            {/* Image gallery */}
            <div className="space-y-3">
              <div className="rounded-2xl overflow-hidden bg-gray-100 h-72 w-full">
                <img
                  src={service.thumbnails[activeThumb].replace("w=200", "w=800")}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex gap-2">
                {service.thumbnails.map((thumb, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveThumb(i)}
                    className={`w-20 h-14 rounded-xl overflow-hidden border-2 transition-colors ${
                      activeThumb === i ? "border-indigo-600" : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <img src={thumb} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* About */}
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-gray-900">Sobre este serviço</h2>
              {service.description.split("\n").map((line, i) =>
                line.trim() === "" ? null : (
                  <p key={i} className="text-sm text-gray-600 leading-relaxed">{line}</p>
                )
              )}
              <ul className="space-y-2 mt-2">
                {service.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <p className="text-sm text-gray-600 leading-relaxed">{service.closing}</p>
            </div>

            {/* Seller info */}
            <div className="border border-gray-200 rounded-2xl p-6 space-y-5">
              <h2 className="text-base font-bold text-gray-900">Sobre o Vendedor</h2>
              <div className="flex items-start gap-4">
                <img
                  src={service.sellerAvatar}
                  alt={service.seller}
                  className="w-14 h-14 rounded-full object-cover flex-shrink-0"
                />
                <div className="space-y-1">
                  <p className="font-semibold text-gray-900">{service.seller}</p>
                  <p className="text-sm text-gray-500">{service.sellerBio}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">Membro desde</p>
                  <p className="font-medium text-gray-700">{service.sellerSince}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">Tempo médio de resposta</p>
                  <p className="font-medium text-gray-700">{service.sellerResponseTime}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">Última entrega</p>
                  <p className="font-medium text-gray-700">{service.sellerLastDelivery}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">Localização</p>
                  <p className="font-medium text-gray-700">{service.sellerLocation}</p>
                </div>
              </div>

              <button className="px-5 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:border-gray-400 hover:text-gray-900 transition-colors">
                Fale comigo
              </button>
            </div>

            {/* Reviews */}
            <div className="space-y-5 pb-10">
              <div className="flex items-center gap-3">
                <h2 className="text-base font-bold text-gray-900">Avaliações</h2>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-bold text-gray-800">{service.rating.toFixed(1)}</span>
                  <span className="text-sm text-gray-400">({service.reviews} total)</span>
                </div>
              </div>

              <div className="space-y-6">
                {service.testimonials.map((t) => (
                  <div key={t.name} className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold flex-shrink-0">
                        {t.initials}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{t.name}</p>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: t.rating }).map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          ))}
                          <span className="text-xs text-gray-400 ml-1">{t.time}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed pl-12">{t.text}</p>
                  </div>
                ))}
              </div>

              <button className="text-sm text-indigo-700 font-medium hover:text-indigo-900 transition-colors">
                Ver todas as avaliações
              </button>
            </div>
          </div>

          {/* ── Right Sidebar ── */}
          <div className="hidden lg:block w-80 flex-shrink-0 sticky top-20">
            <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm">

              {/* Tabs */}
              <div className="grid grid-cols-2 border-b border-gray-200">
                {(["standard", "premium"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-3 text-sm font-semibold transition-colors ${
                      activeTab === tab
                        ? "text-gray-900 border-b-2 border-indigo-700"
                        : "text-gray-400 hover:text-gray-600"
                    }`}
                  >
                    {tab === "standard" ? "Padrão" : "Premium"}
                  </button>
                ))}
              </div>

              <div className="p-5 space-y-5">
                {/* Package header */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-bold text-gray-900">{pkg.label}</p>
                    <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                      Design de alta fidelidade para até {activeTab === "standard" ? "5 telas" : "telas ilimitadas"},
                      protótipo interativo e arquivos fonte.
                    </p>
                  </div>
                  <span className="text-2xl font-extrabold text-gray-900 flex-shrink-0">
                    ${pkg.price}
                  </span>
                </div>

                {/* Meta */}
                <div className="flex items-center gap-4 text-xs text-gray-600">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-gray-400" />
                    Entrega em {pkg.delivery} dias
                  </span>
                  <span className="flex items-center gap-1.5">
                    <RefreshCw className="w-3.5 h-3.5 text-gray-400" />
                    {pkg.revisions} revisões incluídas
                  </span>
                </div>

                {/* Features */}
                <ul className="space-y-2">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
                      <Check className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link href={`/search/${service.id}/reservar?pkg=${activeTab}`}>
                  <button className="cursor-pointer w-full py-3 bg-indigo-700 hover:bg-indigo-800 text-white font-semibold text-sm rounded-xl transition-colors flex items-center justify-center gap-2">
                    Continuar (${pkg.price}) →
                  </button>
                </Link>

                <button className="w-full py-2.5 text-sm text-gray-700 font-medium hover:text-gray-900 transition-colors border border-gray-200 rounded-xl hover:border-gray-300">
                  Contatar Vendedor
                </button>

                {/* Secure */}
                <div className="flex items-center justify-center gap-1.5 text-xs text-gray-400">
                  <Shield className="w-3.5 h-3.5" />
                  Pagamento Seguro
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Footer ── */}
      <footer className="border-t border-gray-100 py-14">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-3">
            <span className="text-xl font-extrabold text-indigo-700 tracking-tight">SERVICELY</span>
            <p className="text-gray-500 text-sm leading-relaxed">
              Assine nossa newsletter para ofertas exclusivas.
            </p>
          </div>

          {/* Services */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-gray-900">Serviços</h4>
            <ul className="space-y-2">
              {FOOTER_SERVICES.map((s) => (
                <li key={s}>
                  <a href="#" className="text-sm text-gray-500 hover:text-gray-800 transition-colors">{s}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-gray-900">Empresa</h4>
            <ul className="space-y-2">
              {FOOTER_COMPANY.map((s) => (
                <li key={s}>
                  <a href="#" className="text-sm text-gray-500 hover:text-gray-800 transition-colors">{s}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-gray-900">Fique Atualizado</h4>
            <p className="text-gray-500 text-sm">Assine nossa newsletter para ofertas exclusivas.</p>
            <div className="flex items-center gap-2">
              <input
                type="email"
                placeholder="Endereço de e-mail"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400"
              />
              <button className="w-10 h-10 flex-shrink-0 bg-indigo-700 hover:bg-indigo-800 text-white rounded-xl flex items-center justify-center transition-colors">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 mt-10 pt-6 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>© 2026 Servicely. Todos os direitos reservados.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-gray-600 transition-colors">Política de Privacidade</a>
            <a href="#" className="hover:text-gray-600 transition-colors">Termos de Serviço</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
