"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Send, MessageSquare, ChevronRight, Mail, Phone, Clock } from "lucide-react";

const FAQS = [
  "Como cancelar uma reserva?",
  "Formas de pagamento aceitas",
  "Esqueci minha senha",
  "Políticas de reembolso",
];

const SUBJECTS = [
  "Dúvida sobre reserva",
  "Problema com pagamento",
  "Cancelamento de serviço",
  "Reclamação sobre profissional",
  "Outros",
];

const FOOTER_SERVICES = [
  "Limpeza Residencial",
  "Bem-estar & Massagem",
  "Chefs Pessoais",
  "Jardinagem",
  "Assistência Técnica",
];

const FOOTER_COMPANY = [
  "Sobre Nós",
  "Carreiras",
  "Blog",
  "Parceiros",
  "Imprensa",
];

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("Dúvida sobre reserva");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((res) => setTimeout(res, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">

      {/* ── Navbar ── */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center gap-4">
          <Link href="/" className="text-base font-extrabold text-indigo-700 tracking-tight flex-shrink-0">
            SERVICELY
          </Link>
          <div className="flex-1 max-w-md relative">
          </div>
          <nav className="hidden md:flex items-center gap-5 ml-auto text-sm text-gray-600 font-medium">
            <a href="/" className="hover:text-gray-900 transition-colors">Inicio</a>
            <a href="/search" className="hover:text-gray-900 transition-colors">Categorias</a>
          </nav>
          <Link
            href="/login"
            className="flex-shrink-0 bg-indigo-700 hover:bg-indigo-800 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            Entrar
          </Link>
        </div>
      </header>

      {/* ── Page Content ── */}
      <main className="flex-1 bg-gray-50 py-12">
        <div className="max-w-5xl mx-auto px-4">

          {/* Page heading */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Falar com Suporte</h1>
            <p className="text-gray-500 text-sm mt-1">Estamos prontos para ajudar com suas dúvidas e agendamentos.</p>
          </div>

          <div className="flex gap-6 items-start">

            {/* ── Left: Contact form ── */}
            <div className="flex-1 min-w-0 bg-white rounded-2xl border border-gray-200 p-7 shadow-sm">
              {!submitted ? (
                <>
                  <h2 className="text-base font-bold text-gray-900 mb-6">Envie uma mensagem</h2>
                  <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Name + Email */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-medium text-gray-600">Nome Completo</label>
                        <input
                          type="text"
                          required
                          placeholder="Seu nome"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="text-black w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 placeholder-gray-400"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-xs font-medium text-gray-600">E-mail</label>
                        <input
                          type="email"
                          required
                          placeholder="email@exemplo.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="text-black w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 placeholder-gray-400"
                        />
                      </div>
                    </div>

                    {/* Subject */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-medium text-gray-600">Assunto</label>
                      <div className="relative">
                        <select
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          className="text-black w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 appearance-none bg-white"
                        >
                          {SUBJECTS.map((s) => (
                            <option key={s}>{s}</option>
                          ))}
                        </select>
                        <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 rotate-90 pointer-events-none" />
                      </div>
                    </div>

                    {/* Message */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-medium text-gray-600">Mensagem</label>
                      <textarea
                        required
                        rows={5}
                        placeholder="Como podemos ajudar você hoje?"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="text-black w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 placeholder-gray-400 resize-none"
                      />
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-semibold text-sm rounded-xl transition-colors disabled:opacity-70"
                    >
                      {loading ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                          </svg>
                          Enviando...
                        </span>
                      ) : "Enviar Mensagem"}
                    </button>
                  </form>
                </>
              ) : (
                /* Success */
                <div className="text-center py-10 space-y-4">
                  <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                    <Send className="w-6 h-6 text-orange-500" />
                  </div>
                  <h2 className="text-lg font-bold text-gray-900">Mensagem enviada!</h2>
                  <p className="text-gray-500 text-sm max-w-xs mx-auto">
                    Recebemos sua mensagem e responderemos em breve no e-mail{" "}
                    <span className="font-medium text-gray-700">{email}</span>.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setName(""); setEmail(""); setMessage(""); }}
                    className="text-sm text-orange-500 hover:text-orange-700 font-medium transition-colors"
                  >
                    Enviar outra mensagem
                  </button>
                </div>
              )}
            </div>

            {/* ── Right: Chat + FAQ ── */}
            <div className="w-72 flex-shrink-0 space-y-5">

              {/* Live chat card */}
              <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm space-y-4">
                <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900">Chat em Tempo Real</h3>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    Fale com um de nossos atendentes agora mesmo.{" "}
                    <span className="text-green-500 font-medium">Tempo de espera: ~2 min</span>
                  </p>
                </div>
                <button className="w-full py-2.5 bg-gray-900 hover:bg-gray-700 text-white text-sm font-semibold rounded-xl transition-colors flex items-center justify-center gap-2">
                  → Iniciar Chat
                </button>
              </div>

              {/* FAQ */}
              <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm space-y-1">
                <h3 className="text-sm font-bold text-gray-900 mb-3">Dúvidas Frequentes</h3>
                {FAQS.map((faq, i) => (
                  <button
                    key={faq}
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between py-3 border-b border-gray-100 last:border-0 text-left gap-2 group"
                  >
                    <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
                      {faq}
                    </span>
                    <ChevronRight
                      className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform ${
                        openFaq === i ? "rotate-90" : ""
                      }`}
                    />
                  </button>
                ))}
                <button className="pt-3 text-xs text-orange-500 hover:text-orange-700 font-medium transition-colors w-full text-left">
                  Ver Central de Ajuda completa
                </button>
              </div>

              {/* Contact info */}
              <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-orange-500 flex-shrink-0" />
                  <span className="text-sm text-gray-700">ajuda@servicely.com.br</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-orange-500 flex-shrink-0" />
                  <span className="text-sm text-gray-700">0800 123 4567</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-orange-500 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Seg–Sex, 08:00–20:00</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-gray-100 py-14 bg-white">
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
