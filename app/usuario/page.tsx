"use client";

import Link from "next/link";
import { useState } from "react";
import { Bell, Building2, Calendar, Clock, ChevronRight, Heart, User, CreditCard, MapPin, LogOut, Send } from "lucide-react";

const UPCOMING = [
  {
    id: "upcoming-1",
    title: "Limpeza Profunda Residencial",
    provider: "Sparkle Services",
    date: "Out 24, 2023",
    time: "09:00 AM",
    status: "Confirmado",
  },
];

const PAST = [
  { id: "past-1", title: "Reparo de Ar Condicionado", date: "12 de Set, 2023", status: "Concluído" },
  { id: "past-2", title: "Corte de Grama", date: "28 de Ago, 2023", status: "Concluído" },
];

const SAVED = [
  { id: 1, name: "Sarah Jenkins", role: "Especialista em Hidráulica", rating: 4.9, reviews: 49, avatar: "https://i.pravatar.cc/48?img=47" },
  { id: 2, name: "Mike Thompson", role: "Eletricista", rating: 4.2, reviews: 624, avatar: "https://i.pravatar.cc/48?img=13" },
];

const ACCOUNT_LINKS = [
  { label: "Informações do Perfil", icon: User, href: "/usuario/perfil" },
  { label: "Métodos de Pagamento", icon: CreditCard, href: "/usuario/pagamentos" },
  { label: "Gerenciar Endereços", icon: MapPin, href: "/usuario/enderecos" },
];

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

export default function UserDashboard() {
const [newsletterEmail, setNewsletterEmail] = useState("");
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* ── Navbar ── */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-indigo-700 rounded-md flex items-center justify-center text-white text-xs font-bold">S</div>
            <span className="text-base font-extrabold text-gray-900 tracking-tight">SERVICELY</span>
          </Link>
          <div className="flex items-center gap-4">
            <nav className="hidden md:flex items-center gap-5 ml-auto text-sm text-gray-600 font-medium">
            <a href="/" className="hover:text-gray-900 transition-colors">Inicio</a>
            <a href="/search" className="hover:text-gray-900 transition-colors">Serviços</a>
            <a href="/support" className="hover:text-gray-900 transition-colors">Suporte</a>
          </nav>
            <button className="relative w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
              <Bell className="w-5 h-5 text-gray-600" />
            </button>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">Alex Johnson</span>
              <img src="https://i.pravatar.cc/32?img=11" alt="Alex" className="w-8 h-8 rounded-full object-cover" />
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-8 space-y-2">
        <div className="mb-6">
          <h1 className="text-xl font-bold text-gray-900">Painel da Conta</h1>
          <p className="text-sm text-gray-500 mt-0.5">Gerencie seus agendamentos, especialistas salvos e preferências pessoais.</p>
        </div>

        <div className="flex gap-6 items-start">

          {/* ── Left column ── */}
          <div className="flex-1 min-w-0 space-y-5">

            {/* Upcoming */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold text-gray-900">Próximos Agendamentos</h2>
                <button className="text-xs text-indigo-600 hover:text-indigo-800 font-medium transition-colors">Ver Tudo</button>
              </div>

              {UPCOMING.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
                  <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900">{item.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">Agendado com {item.provider}</p>
                    <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-400">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{item.date}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{item.time}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {/* Reagendar → leva para a página do agendamento */}
                    <Link
                      href={`/usuario/agendamentos/${item.id}`}
                      className="px-3 py-1.5 text-xs font-medium border border-gray-200 rounded-lg text-gray-600 hover:border-gray-300 transition-colors"
                    >
                      Reagendar
                    </Link>
                    {/* Detalhes → também leva para a mesma página */}
                    <Link
                      href={`/usuario/agendamentos/${item.id}`}
                      className="px-3 py-1.5 text-xs font-medium bg-indigo-700 text-white rounded-lg hover:bg-indigo-800 transition-colors"
                    >
                      Detalhes
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Past */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
              <h2 className="text-sm font-bold text-gray-900 mb-4">Agendamentos Passados</h2>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-xs text-gray-400 uppercase tracking-wider border-b border-gray-100">
                    <th className="text-left pb-3 font-medium">Serviço</th>
                    <th className="text-left pb-3 font-medium">Data</th>
                    <th className="text-left pb-3 font-medium">Status</th>
                    <th className="text-left pb-3 font-medium">Ação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {PAST.map((item) => (
                    <tr key={item.id} className="text-gray-700">
                      <td className="py-3.5 font-medium text-gray-800">{item.title}</td>
                      <td className="py-3.5 text-gray-500 text-xs">{item.date}</td>
                      <td className="py-3.5">
                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                          {item.status}
                        </span>
                      </td>
                      <td className="py-3.5">
                        {/* Reagendar → leva para a página do agendamento pelo id correto */}
                        <Link
                          href={`/usuario/agendamentos/${item.id}`}
                          className="text-xs text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
                        >
                          Reagendar
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ── Right column ── */}
          <div className="w-64 flex-shrink-0 space-y-5">

            {/* Saved pros */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm space-y-4">
              <h2 className="text-sm font-bold text-gray-900">Profissionais Salvos</h2>
              {SAVED.map((pro) => (
                <div key={pro.id} className="flex items-center gap-3">
                  <img src={pro.avatar} alt={pro.name} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 truncate">{pro.name}</p>
                    <p className="text-xs text-gray-400 truncate">{pro.role}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} className={`text-xs ${i < Math.floor(pro.rating) ? "text-yellow-400" : "text-gray-200"}`}>★</span>
                      ))}
                      <span className="text-xs text-gray-400">({pro.reviews})</span>
                    </div>
                  </div>
                  <button className="w-7 h-7 flex items-center justify-center flex-shrink-0">
                    <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                  </button>
                </div>
              ))}
            </div>

            {/* Account settings */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm space-y-1">
              <h2 className="text-sm font-bold text-gray-900 mb-3">Configurações da Conta</h2>
              {ACCOUNT_LINKS.map(({ label, icon: Icon, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="flex items-center gap-3 py-2.5 px-2 rounded-xl hover:bg-gray-50 transition-colors group"
                >
                  <Icon className="w-4 h-4 text-gray-400 group-hover:text-indigo-600 transition-colors" />
                  <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">{label}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-300 ml-auto group-hover:text-gray-400 transition-colors" />
                </Link>
              ))}
              <Link
                href="/"
                className="flex items-center gap-3 py-2.5 px-2 rounded-xl hover:bg-red-50 transition-colors group w-full mt-1"
              >
                <LogOut className="w-4 h-4 text-red-400" />
                <span className="text-sm text-red-500 font-medium">Sair</span>
              </Link>
            </div>

          </div>
        </div>
      </main>
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
