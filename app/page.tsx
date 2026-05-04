"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight, Send } from "lucide-react";

// ─── Data ───────────────────────────────────────────────────────────────────

const STEPS = [
  {
    number: "01",
    title: "Escolha o Serviço",
    description:
      "Navegue pela nossa lista curada de serviços profissionais, de limpeza profunda a massoterapia especializada.",
  },
  {
    number: "02",
    title: "Escolha o Horário",
    description:
      "Selecione a data e o horário que melhor se adaptam à sua agenda. Nossa disponibilidade em tempo real é instantânea.",
  },
  {
    number: "03",
    title: "Relaxe e Aproveite",
    description:
      "Um profissional certificado chega à sua porta. Gerencie tudo através do nosso painel simples.",
  },
];

const SERVICES = [
  {
    title: "Limpeza Residencial Premium",
    price: "R$49",
    unit: "/hr",
    description: "Limpeza profunda especializada, incluindo todos os cômodos da sua casa.",
    image: "https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?w=600&q=80",
  },
  {
    title: "Massagem Deep Tissue",
    price: "R$85",
    unit: "/hr",
    description: "Terapeutas certificados para relaxamento de qualidade de spa na sua casa.",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80",
  },
  {
    title: "Serviço de Chef Pessoal",
    price: "R$120",
    unit: "/refeição",
    description: "Preparação de refeições gourmet personalizadas no conforto da sua cozinha.",
    image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=600&q=80",
  },
  {
    title: "Jardinagem Profissional",
    price: "R$65",
    unit: "/hr",
    description: "Cuidados completos para deixar seu jardim sempre bonito e bem cuidado.",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80",
  },
  {
    title: "Assistência Técnica",
    price: "R$90",
    unit: "/hr",
    description: "Reparos elétricos, hidráulicos e gerais com profissionais qualificados.",
    image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=600&q=80",
  },
];

const TESTIMONIALS = [
  {
    text: "A melhor plataforma de serviços residenciais que já usei. A qualidade dos profissionais é incomparável.",
    name: "Sarah Jenkins",
    role: "Proprietária Verificada",
    avatar: "https://i.pravatar.cc/48?img=47",
  },
  {
    text: "Agendar é incrivelmente fácil. Uso semanalmente para limpeza e mensalmente para bem-estar. Simplesmente mudou minha vida.",
    name: "Marcus Chen",
    role: "Cliente Verificado",
    avatar: "https://i.pravatar.cc/48?img=12",
  },
  {
    text: "A atenção aos detalhes é notável. Desde a interface do aplicativo até a entrega do serviço, tudo é premium.",
    name: "Elena Rodriguez",
    role: "Cliente Verificada",
    avatar: "https://i.pravatar.cc/48?img=32",
  },
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

// ─── Component ──────────────────────────────────────────────────────────────

export default function HomePage() {
  const [serviceIndex, setServiceIndex] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [newsletterEmail, setNewsletterEmail] = useState("");

  const visibleServices = SERVICES.slice(serviceIndex, serviceIndex + 3);
  const canPrevService = serviceIndex > 0;
  const canNextService = serviceIndex + 3 < SERVICES.length;

  const canPrevTestimonial = testimonialIndex > 0;
  const canNextTestimonial = testimonialIndex + 3 < TESTIMONIALS.length;

  return (
    <div className="min-h-screen bg-white font-sans">

      {/* ── Navbar ── */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-extrabold text-indigo-700 tracking-tight">
            SERVICELY
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm text-gray-600 font-medium">
            <a href="#como-funciona" className="hover:text-gray-900 transition-colors">Como Funciona</a>
            <a href="/search" className="hover:text-gray-900 transition-colors">Serviços</a>
            <a href="#depoimentos" className="hover:text-gray-900 transition-colors">Depoimentos</a>
          </nav>
          <Link
            href="/register"
            className="bg-indigo-700 hover:bg-indigo-800 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
          >
            Começar Agora
          </Link>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-24 flex items-center justify-between gap-12">
        <div className="max-w-lg space-y-7">
          <h1 className="text-6xl font-extrabold text-gray-900 leading-tight">
            Seu tempo é valioso.{" "}
            <span className="text-indigo-700">Agende melhor.</span>
          </h1>
          <p className="text-gray-500 text-lg leading-relaxed">
            A plataforma completa para agendar serviços de bem-estar residencial e
            limpeza profissional com especialistas certificados.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/register"
              className="bg-indigo-700 hover:bg-indigo-800 text-white font-semibold px-6 py-3.5 rounded-xl transition-colors"
            >
              Agende seu Serviço
            </Link>
            <Link
              href="/search"
              className="border border-gray-300 hover:border-gray-400 text-gray-800 font-semibold px-6 py-3.5 rounded-xl transition-colors"
            >
              Ver Todos os Serviços
            </Link>
          </div>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block" />
              Profissionais Verificados
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-green-400 inline-block" />
              Serviços Segurados
            </span>
          </div>
        </div>

        {/* Hero illustration placeholder */}
        <div className="hidden lg:block flex-1 max-w-lg">
          <div className="w-full h-80 rounded-3xl bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=700&q=80"
              alt="Home service"
              className="w-full h-full object-cover rounded-3xl opacity-80"
            />
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section id="como-funciona" className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-gray-900">Agendamento em 3 passos simples</h2>
            <div className="w-14 h-1 bg-indigo-700 rounded-full mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {STEPS.map((step) => (
              <div key={step.number} className="flex flex-col items-center text-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-white border border-gray-200 shadow-sm flex items-center justify-center">
                  <span className="text-2xl font-extrabold text-indigo-700">{step.number}</span>
                </div>
                <div className="w-px h-6 bg-gray-200" />
                <h3 className="text-lg font-bold text-gray-900">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed max-w-xs">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section id="servicos" className="py-20 max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-10">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-gray-900">Nossos Serviços em Destaque</h2>
            <p className="text-gray-500 text-sm max-w-sm">
              Soluções premium entregues por profissionais de alta qualidade na sua região.
            </p>
          </div>
          <button className="hidden md:flex items-center gap-1 text-sm text-indigo-700 font-semibold hover:text-indigo-900 transition-colors">
            Ver todas as categorias <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {visibleServices.map((service) => (
            <div
              key={service.title}
              className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow group cursor-pointer"
            >
              <div className="h-52 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-5 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-base font-bold text-gray-900">{service.title}</h3>
                  <span className="text-indigo-700 font-bold text-sm whitespace-nowrap">
                    {service.price}<span className="font-normal text-gray-500">{service.unit}</span>
                  </span>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">{service.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel controls */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={() => setServiceIndex((i) => Math.max(0, i - 1))}
            disabled={!canPrevService}
            className="w-9 h-9 rounded-full bg-gray-800 text-white flex items-center justify-center disabled:opacity-30 hover:bg-gray-700 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-sm text-gray-500 font-medium">
            {serviceIndex / 1 + 1} / {SERVICES.length}
          </span>
          <button
            onClick={() => setServiceIndex((i) => Math.min(SERVICES.length - 3, i + 1))}
            disabled={!canNextService}
            className="w-9 h-9 rounded-full bg-gray-800 text-white flex items-center justify-center disabled:opacity-30 hover:bg-gray-700 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section id="depoimentos" className="bg-indigo-700 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14 space-y-3">
            <h2 className="text-4xl font-bold text-white">O que nossos clientes dizem</h2>
            <p className="text-indigo-300 text-sm">Confiado por mais de 10.000 residências em todo o país.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.slice(testimonialIndex, testimonialIndex + 3).map((t) => (
              <div
                key={t.name}
                className="bg-indigo-600/60 border border-indigo-500/40 rounded-2xl p-7 space-y-5"
              >
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">★</span>
                  ))}
                </div>
                <p className="text-white text-sm leading-relaxed">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-300 overflow-hidden flex-shrink-0">
                    <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">{t.name}</p>
                    <p className="text-indigo-300 text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Carousel controls */}
          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              onClick={() => setTestimonialIndex((i) => Math.max(0, i - 3))}
              disabled={!canPrevTestimonial}
              className="w-9 h-9 rounded-full bg-white/20 text-white flex items-center justify-center disabled:opacity-30 hover:bg-white/30 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-indigo-200 text-sm font-medium">
              {testimonialIndex / 3 + 1} / {Math.ceil(TESTIMONIALS.length / 3)}
            </span>
            <button
              onClick={() => setTestimonialIndex((i) => Math.min(TESTIMONIALS.length - 3, i + 3))}
              disabled={!canNextTestimonial}
              className="w-9 h-9 rounded-full bg-white/20 text-white flex items-center justify-center disabled:opacity-30 hover:bg-white/30 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="py-16 max-w-7xl mx-auto px-6">
        <div className="bg-[#0d1b3e] rounded-3xl px-12 py-16 text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold text-white">Pronto para simplificar sua vida?</h2>
            <p className="text-gray-400 text-base max-w-lg mx-auto leading-relaxed">
              Junte-se a milhares de outras pessoas que encontraram uma maneira melhor de
              gerenciar seus serviços domésticos e de bem-estar.
            </p>
          </div>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link
              href="/register"
              className="bg-white text-gray-900 font-semibold px-8 py-3.5 rounded-xl hover:bg-gray-100 transition-colors"
            >
              Começar Agora
            </Link>
            <Link
              href="/support"
              className="border border-white/30 text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-white/10 transition-colors"
            >
              Falar com o Suporte
            </Link>
          </div>
        </div>
      </section>

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
