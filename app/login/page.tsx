"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || null;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Erro ao entrar");
        return;
      }

      const role = data.user?.role;

      if (from) {
        router.push(from);
      } else if (role === "PROVIDER") {
        router.push("/provider/dashboard");
      } else {
        router.push("/dashboard");
      }
    } catch {
      setError("Erro de conexão. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-8">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-gray-900">Bem-vindo de volta</h2>
        <p className="text-gray-500 text-sm">
          Por favor, insira seus dados para acessar sua conta.
        </p>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-1.5">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Endereço de E-mail
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="nome@email.com"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Senha
            </label>
            <Link
              href="/forgot-password"
              className="text-sm text-indigo-700 hover:text-indigo-900 font-medium transition-colors"
            >
              Esqueceu a senha?
            </Link>
          </div>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 pr-11 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
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
              Entrando...
            </span>
          ) : (
            "Entrar"
          )}
        </button>
      </form>

      <p className="text-center text-sm text-gray-500">
        Não tem uma conta?{" "}
        <Link
          href="/register"
          className="text-indigo-700 hover:text-indigo-900 font-medium transition-colors"
        >
          Cadastre-se gratuitamente
        </Link>
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex">
      {/* ── Left Panel ── */}
      <div className="hidden lg:flex lg:w-[52%] relative overflow-hidden flex-col justify-between p-12">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a2a6c]/90 via-[#2d3a8c]/80 to-[#3b1f6e]/85" />

        <div className="relative z-10 flex flex-col h-full justify-between">
          <Link href="/" className="text-xl font-extrabold text-white tracking-tight">
            SERVICELY
          </Link>

          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-white leading-tight">
                Eleve seu negócio com
                <br />
                serviços profissionais.
              </h1>
              <p className="text-indigo-200 text-base leading-relaxed max-w-sm">
                Junte-se a milhares de clientes que confiam em nossa plataforma
                para uma gestão de serviços contínua.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 max-w-sm">
              <p className="text-white/90 text-sm leading-relaxed italic">
                &ldquo;A plataforma mais fácil que já usei para gerenciar meus
                relacionamentos profissionais com clientes. Altamente
                recomendada.&rdquo;
              </p>
              <div className="flex items-center gap-3 mt-4">
                <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-indigo-300">
                  <img
                    src="https://i.pravatar.cc/40?img=47"
                    alt="Sarah Jenkins"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">Sarah Jenkins</p>
                  <p className="text-indigo-300 text-xs">Diretora Criativa, ArtFlow</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Right Panel ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 py-16 bg-white">
        <Suspense fallback={<div className="text-gray-500">Carregando...</div>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
