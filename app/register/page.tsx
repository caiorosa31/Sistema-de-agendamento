"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function RegisterPage() {
  const [agreed, setAgreed] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) return alert("Você precisa aceitar os termos.");
    console.log("Form submitted:", form);
  };

  return (
    <div className="min-h-screen flex">
      {/* ── Left panel ── */}
      <div
        className="hidden lg:flex lg:w-[52%] relative flex-col justify-between p-12 overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #1a2a6e 0%, #2d3a8c 40%, #3b4fcf 70%, #5b6be8 100%)",
        }}
      >
        {/* subtle light-ray overlay */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 80% at 30% 20%, rgba(255,255,255,0.08) 0%, transparent 70%)",
          }}
        />

        {/* Logo */}
        <div className="relative z-10">
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13 2L4.5 13.5H11.5L11 22L19.5 10.5H12.5L13 2Z"
                fill="#3B4FCF"
                stroke="#3B4FCF"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Headline */}
        <div className="relative z-10 mt-auto mb-auto">
          <h1 className="text-white text-4xl font-bold leading-tight max-w-xs">
            Eleve seu negócio com serviços profissionais.
          </h1>
          <p className="text-blue-200 mt-4 text-base leading-relaxed max-w-sm">
            Junte-se a milhares de clientes que confiam em nossa plataforma para
            uma gestão de serviços contínua e consultoria especializada.
          </p>
        </div>

        {/* Testimonial */}
        <div className="relative z-10">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 max-w-sm">
            <p className="text-white/90 text-sm leading-relaxed">
              &ldquo;A plataforma mais fácil que já usei para gerenciar meus
              relacionamentos profissionais com clientes. Altamente
              recomendada.&rdquo;
            </p>
            <div className="flex items-center gap-3 mt-4">
              <div className="w-10 h-10 rounded-full bg-blue-300 overflow-hidden flex-shrink-0">
                {/* Placeholder avatar — swap with <Image> if you have the asset */}
                <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="20" cy="20" r="20" fill="#93A8F4" />
                  <circle cx="20" cy="16" r="6" fill="#fff" />
                  <ellipse cx="20" cy="34" rx="10" ry="7" fill="#fff" />
                </svg>
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Sarah Jenkins</p>
                <p className="text-blue-200 text-xs">Diretora Criativa, ArtFlow</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Right panel ── */}
      <div className="flex-1 flex flex-col justify-center items-center px-8 py-12 bg-white">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-gray-900">Criar conta</h2>
          <p className="text-gray-500 mt-2 mb-8">
            Preencha os dados abaixo para começar sua jornada.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Nome Completo
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Seu nome completo"
                required
                className="w-full border text-black border-gray-300 rounded-lg px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Endereço de E-mail
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="nome@empresa.com"
                required
                className="w-full border text-black border-gray-300 rounded-lg px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Senha
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Mínimo 8 caracteres"
                minLength={8}
                required
                className="w-full border text-black border-gray-300 rounded-lg px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            {/* Terms */}
            <div className="flex items-start gap-3">
              <input
                id="terms"
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
              <label htmlFor="terms" className="text-sm text-gray-600 cursor-pointer">
                Eu concordo com os{" "}
                <Link href="/termos" className="text-blue-600 hover:underline">
                  Termos de Serviço
                </Link>{" "}
                e{" "}
                <Link href="/privacidade" className="text-blue-600 hover:underline">
                  Política de Privacidade
                </Link>
                .
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-700 hover:bg-blue-800 active:bg-blue-900 text-white font-semibold py-3.5 rounded-lg transition-colors text-sm"
            >
              Criar conta
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Já tem uma conta?{" "}
            <Link href="/login" className="text-blue-600 font-medium hover:underline">
              Entre
            </Link>
          </p>

          {/* Footer links */}
          <div className="flex justify-center gap-6 mt-10 text-xs text-gray-400">
            <Link href="/privacidade" className="hover:text-gray-600 transition-colors">
              Política de Privacidade
            </Link>
            <Link href="/termos" className="hover:text-gray-600 transition-colors">
              Termos de Serviço
            </Link>
            <Link href="/ajuda" className="hover:text-gray-600 transition-colors">
              Central de Ajuda
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
