"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [agreed, setAgreed] = useState(false);
  const [role, setRole] = useState<"CLIENT" | "PROVIDER">("CLIENT");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      setError("Você precisa aceitar os termos de uso.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, role }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Erro ao criar conta");
        return;
      }

      router.push(role === "PROVIDER" ? "/provider/dashboard" : "/dashboard");
    } catch {
      setError("Erro de conexão. Tente novamente.");
    } finally {
      setLoading(false);
    }
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
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 80% at 30% 20%, rgba(255,255,255,0.08) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10">
          <Link href="/" className="text-xl font-extrabold text-white tracking-tight">
            SERVICELY
          </Link>
        </div>

        <div className="relative z-10 mt-auto mb-auto">
          <h1 className="text-white text-4xl font-bold leading-tight max-w-xs">
            Eleve seu negócio com serviços profissionais.
          </h1>
          <p className="text-blue-200 mt-4 text-base leading-relaxed max-w-sm">
            Junte-se a milhares de pessoas que confiam em nossa plataforma para
            uma gestão de serviços contínua.
          </p>
        </div>

        <div className="relative z-10">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 max-w-sm">
            <p className="text-white/90 text-sm leading-relaxed">
              &ldquo;A plataforma mais fácil que já usei para gerenciar meus
              relacionamentos profissionais com clientes. Altamente
              recomendada.&rdquo;
            </p>
            <div className="flex items-center gap-3 mt-4">
              <div className="w-10 h-10 rounded-full bg-blue-300 overflow-hidden flex-shrink-0">
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
          <p className="text-gray-500 mt-2 mb-6">
            Preencha os dados abaixo para começar sua jornada.
          </p>

          {/* Role selector */}
          <div className="flex gap-3 mb-6">
            <button
              type="button"
              onClick={() => setRole("CLIENT")}
              className={`flex-1 py-3 rounded-xl border-2 text-sm font-semibold transition-colors ${
                role === "CLIENT"
                  ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                  : "border-gray-200 text-gray-600 hover:border-gray-300"
              }`}
            >
              Sou Cliente
            </button>
            <button
              type="button"
              onClick={() => setRole("PROVIDER")}
              className={`flex-1 py-3 rounded-xl border-2 text-sm font-semibold transition-colors ${
                role === "PROVIDER"
                  ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                  : "border-gray-200 text-gray-600 hover:border-gray-300"
              }`}
            >
              Sou Prestador
            </button>
          </div>

          {role === "PROVIDER" && (
            <div className="mb-5 p-3 bg-indigo-50 border border-indigo-100 rounded-xl text-sm text-indigo-700">
              Como prestador você poderá criar e gerenciar seus serviços.
            </div>
          )}

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
              {error}
            </div>
          )}

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
                className="w-full border text-black border-gray-300 rounded-lg px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
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
                placeholder="nome@email.com"
                required
                className="w-full border text-black border-gray-300 rounded-lg px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
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
                className="w-full border text-black border-gray-300 rounded-lg px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              />
            </div>

            <div className="flex items-start gap-3">
              <input
                id="terms"
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
              />
              <label htmlFor="terms" className="text-sm text-gray-600 cursor-pointer">
                Eu concordo com os{" "}
                <Link href="/termos" className="text-indigo-600 hover:underline">
                  Termos de Serviço
                </Link>{" "}
                e{" "}
                <Link href="/privacidade" className="text-indigo-600 hover:underline">
                  Política de Privacidade
                </Link>
                .
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-700 hover:bg-indigo-800 active:bg-indigo-900 text-white font-semibold py-3.5 rounded-lg transition-colors text-sm disabled:opacity-70 disabled:cursor-not-allowed"
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
                  Criando conta...
                </span>
              ) : (
                "Criar conta"
              )}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Já tem uma conta?{" "}
            <Link href="/login" className="text-indigo-600 font-medium hover:underline">
              Entre aqui
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
