"use client";

import { useState } from "react";
import Link from "next/link";
import { SERVICES } from "@/lib/services-data";
import { Search, Heart, Star, ChevronDown, Send } from "lucide-react";

// ─── Data ───────────────────────────────────────────────────────────────────

const CATEGORIES = [
  { id: "design", label: "Design & Criativo" },
  { id: "dev", label: "Desenvolvimento & TI" },
  { id: "marketing", label: "Marketing Digital" },
  { id: "escrita", label: "Escrita & Tradução" },
];

const SORT_OPTIONS = ["Recomendados", "Menor Preço", "Maior Preço", "Mais Avaliados", "Mais Recentes"];

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

// ─── Component ──────────────────────────────────────────────────────────────

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>(["dev"]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minRating, setMinRating] = useState<number | null>(4);
  const [onlineOnly, setOnlineOnly] = useState(false);
  const [sortBy, setSortBy] = useState("Recomendados");
  const [sortOpen, setSortOpen] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [newsletterEmail, setNewsletterEmail] = useState("");

  const toggleCategory = (id: string) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const toggleFavorite = (e: React.MouseEvent, id: number) => {
    e.preventDefault(); // evita navegar ao clicar no coração
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const resetFilters = () => {
    setSelectedCategories([]);
    setMinPrice("");
    setMaxPrice("");
    setMinRating(null);
    setOnlineOnly(false);
  };

  const filtered = SERVICES.filter((s) => {
    if (selectedCategories.length > 0 && !selectedCategories.includes(s.category)) return false;
    if (minPrice && s.price < Number(minPrice)) return false;
    if (maxPrice && s.price > Number(maxPrice)) return false;
    if (minRating && s.rating < minRating) return false;
    if (onlineOnly && !s.available) return false;
    if (searchQuery && !s.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const TOTAL_PAGES = 5;

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
              className="text-black w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-gray-50 placeholder-gray-400"
            />
          </div>
          <nav className="hidden md:flex items-center gap-5 ml-auto text-sm text-gray-600 font-medium">
            <a href="/" className="hover:text-gray-900 transition-colors">Inicio</a>
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

      <div className="flex-1 max-w-7xl mx-auto w-full px-4 py-8 flex gap-8">

        {/* ── Sidebar Filters ── */}
        <aside className="hidden md:block w-52 flex-shrink-0 space-y-7">

          {/* Category */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Categoria</h3>
            <div className="space-y-2.5">
              {CATEGORIES.map((cat) => (
                <label key={cat.id} className="flex items-center gap-2.5 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat.id)}
                    onChange={() => toggleCategory(cat.id)}
                    className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                  />
                  <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                    {cat.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Price range */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Faixa de Preço</h3>
            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="$ Min"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="text-black w-full px-2.5 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder-gray-400"
              />
              <input
                type="number"
                placeholder="$ Max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="text-black w-full px-2.5 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder-gray-400"
              />
            </div>
          </div>

          {/* Min rating */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Avaliação Mín.</h3>
            <div className="space-y-2">
              {[4.5, 4.0].map((rating) => (
                <label key={rating} className="flex items-center gap-2.5 cursor-pointer group">
                  <input
                    type="radio"
                    name="rating"
                    checked={minRating === rating}
                    onChange={() => setMinRating(rating)}
                    className="w-4 h-4 border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                  />
                  <span className="flex items-center gap-1 text-sm text-gray-600">
                    {rating}+
                    <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Availability */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Disponibilidade</h3>
            <label className="flex items-center gap-3 cursor-pointer">
              <div
                onClick={() => setOnlineOnly((v) => !v)}
                className={`relative w-10 h-5 rounded-full transition-colors ${
                  onlineOnly ? "bg-indigo-600" : "bg-gray-200"
                }`}
              >
                <span
                  className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${
                    onlineOnly ? "translate-x-5" : "translate-x-0.5"
                  }`}
                />
              </div>
              <span className="text-sm text-gray-600">Online Agora</span>
            </label>
          </div>

          {/* Reset */}
          <button
            onClick={resetFilters}
            className="w-full py-2 border border-gray-300 rounded-lg text-sm text-gray-600 font-medium hover:border-gray-400 hover:text-gray-900 transition-colors"
          >
            Redefinir Filtros
          </button>
        </aside>

        {/* ── Main Content ── */}
        <main className="flex-1 min-w-0 space-y-6">

          {/* Results header */}
          <div className="flex items-center justify-between">
            <h1 className="text-base font-bold text-gray-900">
              {filtered.length} Resultados Encontrados
            </h1>
            <div className="relative">
              <button
                onClick={() => setSortOpen((v) => !v)}
                className="flex items-center gap-2 text-sm text-gray-700 border border-gray-200 rounded-lg px-3 py-2 hover:border-gray-300 transition-colors"
              >
                <span className="text-gray-500 text-xs">Ordenar por:</span>
                <span className="font-medium">{sortBy}</span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>
              {sortOpen && (
                <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg py-1 z-10 min-w-44">
                  {SORT_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => { setSortBy(opt); setSortOpen(false); }}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                        sortBy === opt
                          ? "text-indigo-700 font-medium bg-indigo-50"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.length > 0 ? filtered.map((service) => (
              // ✅ Card inteiro é um link para a página de detalhe
              <Link
                key={service.id}
                href={`/search/${service.id}`}
                className="rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow group block"
              >
                {/* Image */}
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <button
                    onClick={(e) => toggleFavorite(e, service.id)}
                    className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors shadow-sm"
                  >
                    <Heart
                      className={`w-4 h-4 transition-colors ${
                        favorites.includes(service.id)
                          ? "fill-red-500 text-red-500"
                          : "text-gray-500"
                      }`}
                    />
                  </button>
                </div>

                {/* Body */}
                <div className="p-4 space-y-2.5">
                  {/* Seller + badge */}
                  <div className="flex items-center gap-2">
                    <img
                      src={service.sellerAvatar}
                      alt={service.seller}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span className="text-xs text-gray-600 font-medium">{service.seller}</span>
                    {service.badge && (
                      <span className={`ml-auto text-xs font-semibold px-2 py-0.5 rounded-full ${service.badgeColor}`}>
                        {service.badge}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-sm font-semibold text-gray-900 leading-snug line-clamp-2">
                    {service.title}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-bold text-gray-800">{service.rating.toFixed(1)}</span>
                    <span className="text-xs text-gray-400">({service.reviews.toLocaleString()})</span>
                  </div>

                  {/* Price */}
                  <div className="pt-1 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs text-gray-400 uppercase tracking-wide">A partir de</span>
                    <span className="text-base font-bold text-gray-900">
                      ${service.price.toLocaleString()}
                    </span>
                  </div>
                </div>
              </Link>
            )) : (
              <div className="col-span-3 py-20 text-center text-gray-400 text-sm">
                Nenhum serviço encontrado com os filtros selecionados.
              </div>
            )}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-1 pt-4">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-40 transition-colors"
            >
              Anterior
            </button>
            {Array.from({ length: TOTAL_PAGES }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                  currentPage === i + 1
                    ? "bg-indigo-700 text-white"
                    : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(TOTAL_PAGES, p + 1))}
              disabled={currentPage === TOTAL_PAGES}
              className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-40 transition-colors"
            >
              Próxima
            </button>
          </div>
        </main>
      </div>

      {/* ── Footer ── */}
      <footer className="border-t border-gray-100 py-14">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-3">
            <span className="text-xl font-extrabold text-indigo-700 tracking-tight">SERVICELY</span>
            <p className="text-gray-500 text-sm leading-relaxed">
              Assine nossa newsletter para ofertas exclusivas.
            </p>
          </div>
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
