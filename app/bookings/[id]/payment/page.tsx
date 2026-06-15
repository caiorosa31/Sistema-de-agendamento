"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { CreditCard, ArrowLeft, CheckCircle2, Lock, ShieldCheck } from "lucide-react";

interface Booking {
  id: string;
  date: string;
  address: string;
  service: { title: string; price: number; unit: string; provider: { name: string } };
  payment: { status: string } | null;
  status: string;
}

function formatDate(dateStr: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(dateStr));
}

function formatCardNumber(value: string) {
  return value
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(\d{4})/g, "$1 ")
    .trim();
}

function formatExpiry(value: string) {
  return value
    .replace(/\D/g, "")
    .slice(0, 4)
    .replace(/(\d{2})(\d)/, "$1/$2");
}

export default function PaymentPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [method, setMethod] = useState<"card" | "pix">("card");
  const [paying, setPaying] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [card, setCard] = useState({ name: "", number: "", expiry: "", cvv: "" });

  useEffect(() => {
    fetch(`/api/bookings/${id}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.booking) {
          if (data.booking.payment?.status === "PAID") {
            router.replace(`/bookings/${id}`);
            return;
          }
          setBooking(data.booking);
        } else {
          setError(data.error || "Agendamento não encontrado");
        }
      })
      .catch(() => setError("Erro ao carregar"))
      .finally(() => setLoading(false));
  }, [id, router]);

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    if (method === "card") {
      if (!card.name || card.number.replace(/\s/g, "").length < 16 || !card.expiry || card.cvv.length < 3) {
        setError("Preencha todos os dados do cartão corretamente.");
        return;
      }
    }

    setPaying(true);
    setError("");

    try {
      const res = await fetch(`/api/bookings/${id}/payment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ method }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Erro ao processar pagamento");
        return;
      }

      setSuccess(true);
    } catch {
      setError("Erro de conexão. Tente novamente.");
    } finally {
      setPaying(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-indigo-700 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (error && !booking) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-4">
        <p className="text-red-600">{error}</p>
        <Link href="/dashboard" className="text-indigo-700 font-medium hover:underline">
          Voltar ao painel
        </Link>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-emerald-50 flex flex-col items-center justify-center px-6">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-lg p-10 max-w-md w-full text-center space-y-6">
          <div className="relative inline-flex mx-auto">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-emerald-500" />
            </div>
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-900">Pagamento Confirmado!</h1>
            <p className="text-gray-500 text-sm mt-2">
              Seu agendamento foi confirmado. O prestador será notificado em breve.
            </p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-5 text-left space-y-3 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Serviço</span>
              <span className="font-semibold text-gray-900">{booking?.service.title}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Data</span>
              <span className="font-semibold text-gray-900">{booking ? formatDate(booking.date) : ""}</span>
            </div>
            <div className="pt-3 border-t border-gray-200 flex justify-between items-center">
              <span className="text-gray-500">Total pago</span>
              <span className="text-lg font-bold text-indigo-700">
                R$ {booking?.service.price.toFixed(2).replace(".", ",")}
              </span>
            </div>
          </div>

          <Link
            href="/dashboard"
            className="block w-full bg-indigo-700 hover:bg-indigo-800 text-white font-semibold py-4 rounded-xl transition-colors text-sm shadow-sm shadow-indigo-200"
          >
            Ir ao Painel
          </Link>
        </div>
      </div>
    );
  }

  if (!booking) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-extrabold text-indigo-700 tracking-tight">
            SERVICELY
          </Link>
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            Pagamento seguro
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-6 py-8 space-y-6">
        <Link
          href={`/bookings/${id}`}
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar ao agendamento
        </Link>

        <h1 className="text-2xl font-bold text-gray-900">Pagamento</h1>

        {error && (
          <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Order summary */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="h-1.5 bg-gradient-to-r from-indigo-500 to-indigo-700" />
          <div className="p-6 space-y-3">
            <h2 className="font-bold text-gray-900 text-sm uppercase tracking-wide text-gray-500">Resumo do Pedido</h2>
            <div className="space-y-2.5 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Serviço</span>
                <span className="font-semibold text-gray-900">{booking.service.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Prestador</span>
                <span className="text-gray-700">{booking.service.provider.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Data</span>
                <span className="text-gray-700">{formatDate(booking.date)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Local</span>
                <span className="text-gray-700 text-right max-w-[200px] truncate">{booking.address}</span>
              </div>
            </div>
            <div className="pt-3 border-t border-gray-100 flex justify-between items-center">
              <span className="font-bold text-gray-900">Total</span>
              <span className="text-2xl font-bold text-indigo-700">
                R$ {booking.service.price.toFixed(2).replace(".", ",")}
              </span>
            </div>
          </div>
        </div>

        {/* Payment method */}
        <div className="space-y-4">
          <h2 className="font-bold text-gray-900">Método de Pagamento</h2>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setMethod("card")}
              className={`py-4 rounded-2xl border-2 text-sm font-semibold transition-all flex flex-col items-center gap-2 ${
                method === "card"
                  ? "border-indigo-600 bg-indigo-50 text-indigo-700 shadow-sm shadow-indigo-100"
                  : "border-gray-200 text-gray-500 bg-white hover:border-gray-300"
              }`}
            >
              <CreditCard className={`w-5 h-5 ${method === "card" ? "text-indigo-600" : "text-gray-400"}`} />
              Cartão de Crédito
            </button>
            <button
              type="button"
              onClick={() => setMethod("pix")}
              className={`py-4 rounded-2xl border-2 text-sm font-semibold transition-all flex flex-col items-center gap-2 ${
                method === "pix"
                  ? "border-emerald-500 bg-emerald-50 text-emerald-700 shadow-sm shadow-emerald-100"
                  : "border-gray-200 text-gray-500 bg-white hover:border-gray-300"
              }`}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={method === "pix" ? "text-emerald-600" : "text-gray-400"}
              >
                <path d="M10 2L18 10L10 18L2 10L10 2Z" fill="currentColor" />
              </svg>
              PIX
            </button>
          </div>

          <form onSubmit={handlePay} className="space-y-4">
            {method === "card" ? (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Dados do Cartão</span>
                  <div className="flex gap-1.5">
                    <div className="w-7 h-5 bg-indigo-100 rounded text-indigo-700 text-[9px] font-bold flex items-center justify-center">VISA</div>
                    <div className="w-7 h-5 bg-red-50 rounded text-red-600 text-[9px] font-bold flex items-center justify-center">MC</div>
                    <div className="w-7 h-5 bg-blue-50 rounded text-blue-600 text-[9px] font-bold flex items-center justify-center">ELO</div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Nome no Cartão
                  </label>
                  <input
                    type="text"
                    placeholder="Como aparece no cartão"
                    value={card.name}
                    onChange={(e) => setCard({ ...card, name: e.target.value.toUpperCase() })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Número do Cartão
                  </label>
                  <input
                    type="text"
                    placeholder="0000 0000 0000 0000"
                    value={card.number}
                    onChange={(e) => setCard({ ...card, number: formatCardNumber(e.target.value) })}
                    maxLength={19}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition font-mono tracking-wider"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      Validade
                    </label>
                    <input
                      type="text"
                      placeholder="MM/AA"
                      value={card.expiry}
                      onChange={(e) => setCard({ ...card, expiry: formatExpiry(e.target.value) })}
                      maxLength={5}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide">CVV</label>
                    <input
                      type="text"
                      placeholder="•••"
                      value={card.cvv}
                      onChange={(e) => setCard({ ...card, cvv: e.target.value.replace(/\D/g, "").slice(0, 4) })}
                      maxLength={4}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center space-y-5">
                <div className="w-36 h-36 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl mx-auto flex items-center justify-center border border-emerald-100">
                  <div className="grid grid-cols-5 gap-1">
                    {Array.from({ length: 25 }).map((_, i) => (
                      <div
                        key={i}
                        className="w-2.5 h-2.5 rounded-sm"
                        style={{ backgroundColor: [0,1,2,3,4,5,6,7,8,9,12,15,17,19,20,22,24].includes(i) ? "#059669" : "transparent" }}
                      />
                    ))}
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Chave PIX</p>
                  <p className="text-sm text-gray-800 font-mono font-semibold">servicely@pagamento.com</p>
                </div>
                <div className="inline-flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-3 py-1.5 font-medium">
                  <svg width="10" height="10" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 2L18 10L10 18L2 10L10 2Z" fill="currentColor" />
                  </svg>
                  Pagamento instantâneo via PIX
                </div>
                <p className="text-xs text-gray-400">
                  Após realizar a transferência, clique em &ldquo;Confirmar Pagamento&rdquo;
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={paying}
              className={`w-full font-semibold py-4 rounded-xl transition-all text-sm disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm ${
                method === "pix"
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-200"
                  : "bg-indigo-700 hover:bg-indigo-800 text-white shadow-indigo-200"
              }`}
            >
              {paying ? (
                <>
                  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Processando...
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  Confirmar Pagamento — R$ {booking.service.price.toFixed(2).replace(".", ",")}
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-gray-400 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-gray-400" />
          Seus dados estão protegidos com criptografia SSL
        </p>
      </div>
    </div>
  );
}
