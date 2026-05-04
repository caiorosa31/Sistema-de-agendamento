"use client";

import Link from "next/link";
import { useState } from "react";
import { use } from "react";
import {
  Bell, Building2, Calendar, Clock, ChevronRight,
  MessageCircle, HelpCircle, CheckCircle2, Star,
  RefreshCw, Home, CreditCard, XCircle, AlertCircle, Send,
} from "lucide-react";

// ── Mock database — em produção, viria de uma API/banco ───────────────────────
const APPOINTMENTS: Record<string, {
  id: string;
  title: string;
  provider: string;
  date: string;
  time: string;
  status: "Confirmado" | "Concluído" | "Cancelado";
  subtotal: number;
  taxes: number;
  paymentLast4: string;
  instructions: string;
}> = {
  "upcoming-1": {
    id: "upcoming-1",
    title: "Limpeza Profunda Residencial",
    provider: "Sparkle Services",
    date: "24 de Out, 2023",
    time: "09:00 AM",
    status: "Confirmado",
    subtotal: 250,
    taxes: 15,
    paymentLast4: "4242",
    instructions: '"Por favor, foque na limpeza pesada das janelas da sala e na organização da cozinha. Favor não entrar no quarto dos fundos."',
  },
  "past-1": {
    id: "past-1",
    title: "Reparo de Ar Condicionado",
    provider: "CoolTech Serviços",
    date: "12 de Set, 2023",
    time: "10:00 AM",
    status: "Concluído",
    subtotal: 180,
    taxes: 10,
    paymentLast4: "1234",
    instructions: '"Verificar o ar do quarto principal e da sala."',
  },
  "past-2": {
    id: "past-2",
    title: "Corte de Grama",
    provider: "GreenCare",
    date: "28 de Ago, 2023",
    time: "08:00 AM",
    status: "Concluído",
    subtotal: 80,
    taxes: 5,
    paymentLast4: "5678",
    instructions: '"Cortar apenas o jardim da frente."',
  },
};

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

const STEPS = ["Confirmado", "Em Caminho", "Concluído"];

// ── Status helpers ────────────────────────────────────────────────────────────
function getStepIndex(status: string) {
  if (status === "Confirmado") return 0;
  if (status === "Em Caminho") return 1;
  if (status === "Concluído") return 2;
  return 0;
}

function StatusBadge({ status }: { status: string }) {
  if (status === "Concluído")
    return (
      <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 border border-green-200 text-green-700 text-sm font-semibold">
        <CheckCircle2 className="w-4 h-4" /> Status: Concluído
      </span>
    );
  if (status === "Cancelado")
    return (
      <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-50 border border-red-200 text-red-600 text-sm font-semibold">
        <XCircle className="w-4 h-4" /> Status: Cancelado
      </span>
    );
  return (
    <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-sm font-semibold">
      <AlertCircle className="w-4 h-4" /> Status: Confirmado
    </span>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function AppointmentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const appointment = APPOINTMENTS[id];

  // Agendamento não encontrado
  if (!appointment) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-4">
        <p className="text-gray-500 text-sm">Agendamento não encontrado.</p>
        <Link href="/usuario" className="text-indigo-600 text-sm font-medium hover:underline">
          ← Voltar para o painel
        </Link>
      </div>
    );
  }

  const total = appointment.subtotal + appointment.taxes;
  const isConcluded = appointment.status === "Concluído";
  const isUpcoming = appointment.status === "Confirmado";
  const currentStep = getStepIndex(appointment.status);
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
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-500">
            <Link href="/" className="hover:text-gray-900 transition-colors">Início</Link>
            <Link href="/usuario" className="text-gray-900 border-b-2 border-indigo-600 pb-0.5">
              Meus Agendamentos
            </Link>
            <Link href="/search" className="hover:text-gray-900 transition-colors">Serviços</Link>
            <Link href="/usuario" className="hover:text-gray-900 transition-colors">Minha conta</Link>
          </nav>
          <div className="flex items-center gap-4">
            <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
              <Bell className="w-5 h-5 text-gray-600" />
            </button>
            <div className="flex items-center gap-2">
              <span className="hidden sm:block text-sm font-medium text-gray-700">Alex Johnson</span>
              <img src="https://i.pravatar.cc/32?img=11" alt="Alex" className="w-8 h-8 rounded-full object-cover" />
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-8">

        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-5">
          <Link href="/usuario" className="hover:text-gray-600 transition-colors">Meus Agendamentos</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-gray-500">ID #{appointment.id}</span>
        </div>

        {/* Heading */}
        <div className="flex items-start justify-between mb-6 flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Detalhes do Agendamento</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Gerencie e acompanhe o status do seu serviço solicitado.
            </p>
          </div>
          <StatusBadge status={appointment.status} />
        </div>

        <div className="flex gap-6 items-start flex-wrap lg:flex-nowrap">

          {/* ── Left column ── */}
          <div className="flex-1 min-w-0 space-y-5">

            {/* Progress tracker */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-6">
                Acompanhamento em Tempo Real
              </p>
              <div className="relative flex items-center justify-between">
                {/* Linha base cinza */}
                <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-100 z-0" />
                {/* Linha de progresso */}
                <div
                  className="absolute top-4 left-0 h-0.5 bg-indigo-600 z-0 transition-all duration-500"
                  style={{ width: `${(currentStep / (STEPS.length - 1)) * 100}%` }}
                />
                {STEPS.map((step, i) => {
                  const done = i <= currentStep;
                  return (
                    <div key={step} className="relative z-10 flex flex-col items-center gap-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 text-xs font-bold transition-all ${
                        done
                          ? "bg-indigo-600 border-indigo-600 text-white"
                          : "bg-white border-gray-200 text-gray-300"
                      }`}>
                        {done ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                      </div>
                      <span className={`text-xs font-medium ${done ? "text-indigo-700" : "text-gray-400"}`}>
                        {step}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Informações do serviço */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
              <h2 className="text-sm font-bold text-gray-900 mb-4">Informações do Serviço</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-xs text-gray-400 uppercase tracking-wider font-medium">Serviço</p>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                      <Building2 className="w-4 h-4 text-indigo-600" />
                    </div>
                    <span className="text-sm font-semibold text-gray-800">{appointment.title}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-gray-400 uppercase tracking-wider font-medium">Prestador</p>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Home className="w-4 h-4 text-purple-600" />
                    </div>
                    <span className="text-sm font-semibold text-gray-800">{appointment.provider}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-gray-400 uppercase tracking-wider font-medium">Data</p>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-indigo-400" />
                    <span className="text-sm font-semibold text-gray-800">{appointment.date}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-gray-400 uppercase tracking-wider font-medium">Horário</p>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-indigo-400" />
                    <span className="text-sm font-semibold text-gray-800">{appointment.time}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Condicional: Avaliação (só se concluído) ── */}
            {isConcluded && (
              <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-5">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Star className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-indigo-900">Serviço concluído com sucesso!</p>
                    <p className="text-xs text-indigo-600 mt-0.5">
                      Sua experiência importa. Avalie o profissional e ajude outros clientes.
                    </p>
                    <div className="flex items-center gap-1 mt-3">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button key={s} className="text-2xl text-gray-300 hover:text-yellow-400 transition-colors">★</button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ── Condicional: Aviso (só se ainda vai acontecer) ── */}
            {isUpcoming && (
              <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-amber-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <AlertCircle className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-amber-900">Serviço ainda não realizado</p>
                    <p className="text-xs text-amber-700 mt-0.5">
                      Seu agendamento está confirmado para {appointment.date} às {appointment.time}.
                      Você pode reagendar ou cancelar até 24h antes do serviço.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Instruções */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-bold text-gray-900">Instruções para o Profissional</h2>
                {isUpcoming && (
                  <button className="text-xs text-indigo-600 hover:text-indigo-800 font-medium transition-colors">
                    Editar
                  </button>
                )}
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">{appointment.instructions}</p>
            </div>

            {/* Falar com profissional */}
            <div className="flex justify-center pb-4">
              <button className="flex items-center gap-2 px-6 py-2.5 border-2 border-indigo-600 text-indigo-700 rounded-xl font-semibold text-sm hover:bg-indigo-50 transition-colors">
                <MessageCircle className="w-4 h-4" />
                Falar com Profissional
              </button>
            </div>
          </div>

          {/* ── Right column ── */}
          <div className="w-72 flex-shrink-0 space-y-5">

            {/* Resumo de pagamento */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
              <h2 className="text-sm font-bold text-gray-900 mb-4">Resumo de Pagamento</h2>
              <div className="space-y-2.5 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>R$ {appointment.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Taxas de Serviço</span>
                  <span>R$ {appointment.taxes.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-100 pt-2.5 flex justify-between font-bold text-gray-900">
                  <span>Total</span>
                  <span className="text-indigo-700">R$ {total.toFixed(2)}</span>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2.5 border border-gray-100">
                <CreditCard className="w-4 h-4 text-gray-400" />
                <span className="text-xs text-gray-500">
                  Cartão de Crédito •••• {appointment.paymentLast4}
                </span>
              </div>

              {/* ── Botão Reagendar — sempre visível ── */}
              <Link
                href={`/usuario/agendamentos/${appointment.id}/reagendar`}
                className="mt-4 w-full flex items-center justify-center gap-2 bg-indigo-700 hover:bg-indigo-800 text-white font-semibold py-3 rounded-xl transition-colors text-sm"
              >
                <RefreshCw className="w-4 h-4" />
                Reagendar
              </Link>

              {/* ── Cancelar — só se ainda não foi concluído ── */}
              {isUpcoming ? (
                <button className="mt-2 w-full text-sm font-semibold text-red-500 hover:text-red-700 py-2.5 rounded-xl hover:bg-red-50 transition-colors">
                  Cancelar Agendamento
                </button>
              ) : (
                <p className="text-center text-xs text-gray-400 mt-3">
                  Este agendamento já foi concluído.
                </p>
              )}
            </div>

            {/* Ajuda */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <HelpCircle className="w-4 h-4 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">Precisa de ajuda?</p>
                  <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                    Nossa central de suporte está disponível 24/7 para auxiliar com seu pedido.
                  </p>
                  <Link href="/ajuda" className="inline-block mt-2 text-xs text-indigo-600 hover:text-indigo-800 font-medium transition-colors">
                    Ir para Central de Ajuda →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
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
