"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Zap } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    // Simulate API call
    await new Promise((res) => setTimeout(res, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex">
      {/* ── Left Panel ── */}
      <div className="hidden lg:flex lg:w-[52%] relative overflow-hidden flex-col justify-between p-12">
        {/* Background image + overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a2a6c]/90 via-[#2d3a8c]/80 to-[#3b1f6e]/85" />

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full justify-between">
          {/* Logo */}
          <div>
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
              <Zap className="w-6 h-6 text-indigo-600" fill="currentColor" />
            </div>
          </div>

          {/* Headline */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-white leading-tight">
                Eleve seu negócio com
                <br />
                serviços profissionais.
              </h1>
              <p className="text-indigo-200 text-base leading-relaxed max-w-sm mt-4">
                Junte-se a milhares de clientes que confiam em nossa plataforma
                para uma gestão de serviços contínua e consultoria
                especializada.
              </p>
            </div>

            {/* Testimonial card */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 max-w-sm">
              <p className="text-white/90 text-sm leading-relaxed italic">
                "A plataforma mais fácil que já usei para gerenciar meus
                relacionamentos profissionais com clientes. Altamente
                recomendada."
              </p>
              <div className="flex items-center gap-3 mt-4">
                <div className="w-10 h-10 rounded-full bg-indigo-300 flex items-center justify-center overflow-hidden flex-shrink-0">
                  <img
                    src="https://i.pravatar.cc/40?img=47"
                    alt="Sarah Jenkins"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">
                    Sarah Jenkins
                  </p>
                  <p className="text-indigo-300 text-xs">
                    Diretora Criativa, ArtFlow
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Right Panel ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 py-16 bg-white">
        <div className="w-full max-w-md space-y-8">
          {!submitted ? (
            <>
              {/* Heading */}
              <div className="space-y-2">
                <h2 className="text-3xl font-bold text-gray-900">
                  Esqueceu sua senha?
                </h2>
                <p className="text-gray-500 text-sm">
                  Insira seu e-mail para receber um link de recuperação
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1.5">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Endereço de E-mail
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nome@empresa.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-indigo-700 hover:bg-indigo-800 active:bg-indigo-900 text-white font-semibold rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed text-sm"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg
                        className="animate-spin h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8H4z"
                        />
                      </svg>
                      Enviando...
                    </span>
                  ) : (
                    "Enviar link"
                  )}
                </button>
              </form>

              {/* Back to login */}
              <div className="text-center">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-1.5 text-sm text-indigo-700 hover:text-indigo-900 font-medium transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Voltar para o login
                </Link>
              </div>
            </>
          ) : (
            /* Success state */
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto">
                <svg
                  className="w-8 h-8 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                E-mail enviado!
              </h2>
              <p className="text-gray-500 text-sm max-w-xs mx-auto">
                Verifique sua caixa de entrada em{" "}
                <span className="font-medium text-gray-700">{email}</span> e
                siga as instruções para redefinir sua senha.
              </p>
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 text-sm text-indigo-700 hover:text-indigo-900 font-medium transition-colors mt-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar para o login
              </Link>
            </div>
          )}

          {/* Footer links */}
          <div className="pt-8 border-t border-gray-100 flex items-center justify-center gap-4 text-xs text-gray-400">
            <Link href="/privacy" className="hover:text-gray-600 transition-colors">
              Política de Privacidade
            </Link>
            <span>·</span>
            <Link href="/terms" className="hover:text-gray-600 transition-colors">
              Termos de Serviço
            </Link>
            <span>·</span>
            <Link href="/help" className="hover:text-gray-600 transition-colors">
              Central de Ajuda
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
