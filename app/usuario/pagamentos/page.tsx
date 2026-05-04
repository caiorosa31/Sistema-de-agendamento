"use client";

import { useState } from "react";
import Link from "next/link";
import { Bell, User, CreditCard, MapPin, LogOut, Plus, Trash2, ShieldCheck } from "lucide-react";

const NAV_LINKS = [
  { label: "Informações do Perfil", icon: User, href: "/usuario/perfil", active: false },
  { label: "Métodos de Pagamento", icon: CreditCard, href: "/usuario/pagamentos", active: true },
  { label: "Gerenciar Endereços", icon: MapPin, href: "/usuario/enderecos", active: false },
];

const CARD_BRANDS: Record<string, string> = {
  "4": "Visa",
  "5": "Mastercard",
};

function cardBrand(number: string) {
  return CARD_BRANDS[number[0]] ?? "Cartão";
}

interface Card {
  id: number;
  number: string;
  name: string;
  expiry: string;
  isDefault: boolean;
}

export default function PaymentsPage() {
  const [cards, setCards] = useState<Card[]>([
    { id: 1, number: "4111 **** **** 1111", name: "Alex Johnson", expiry: "12/26", isDefault: true },
    { id: 2, number: "5500 **** **** 4444", name: "Alex Johnson", expiry: "08/25", isDefault: false },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [newNumber, setNewNumber] = useState("");
  const [newName, setNewName] = useState("");
  const [newExpiry, setNewExpiry] = useState("");
  const [newCvv, setNewCvv] = useState("");

  const removeCard = (id: number) => setCards((c) => c.filter((x) => x.id !== id));

  const setDefault = (id: number) =>
    setCards((c) => c.map((x) => ({ ...x, isDefault: x.id === id })));

  const addCard = (e: React.FormEvent) => {
    e.preventDefault();
    const masked = newNumber.slice(0, 4) + " **** **** " + newNumber.slice(-4);
    setCards((c) => [...c, { id: Date.now(), number: masked, name: newName, expiry: newExpiry, isDefault: false }]);
    setShowForm(false);
    setNewNumber(""); setNewName(""); setNewExpiry(""); setNewCvv("");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-indigo-700 rounded-md flex items-center justify-center text-white text-xs font-bold">S</div>
            <span className="text-base font-extrabold text-gray-900 tracking-tight">SERVICELY</span>
          </Link>
          <div className="flex items-center gap-4">
            <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
              <Bell className="w-5 h-5 text-gray-600" />
            </button>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">Alex Johnson</span>
              <img src="https://i.pravatar.cc/32?img=11" alt="Alex" className="w-8 h-8 rounded-full object-cover" />
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-8">
        <div className="mb-6">
          <h1 className="text-xl font-bold text-gray-900">Painel da Conta</h1>
          <p className="text-sm text-gray-500 mt-0.5">Gerencie seus agendamentos, especialistas salvos e preferências pessoais.</p>
        </div>

        <div className="flex gap-6 items-start">
          {/* Sidebar */}
          <div className="w-56 flex-shrink-0 bg-white rounded-2xl border border-gray-200 p-4 shadow-sm space-y-1">
            <Link href="/usuario" className="flex items-center gap-2 px-2 py-2 text-sm text-gray-500 hover:text-gray-700 transition-colors">
              ← Voltar ao Painel
            </Link>
            <div className="border-t border-gray-100 pt-2 mt-1 space-y-1">
              {NAV_LINKS.map(({ label, icon: Icon, href, active }) => (
                <Link key={label} href={href}
                  className={`flex items-center gap-3 py-2.5 px-2 rounded-xl transition-colors ${active ? "bg-indigo-50 text-indigo-700" : "hover:bg-gray-50 text-gray-600"}`}
                >
                  <Icon className={`w-4 h-4 ${active ? "text-indigo-600" : "text-gray-400"}`} />
                  <span className="text-sm font-medium">{label}</span>
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

          {/* Content */}
          <div className="flex-1 min-w-0 space-y-5">
            <div className="bg-white rounded-2xl border border-gray-200 p-7 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-base font-bold text-gray-900">Métodos de Pagamento</h2>
                <button
                  onClick={() => setShowForm((v) => !v)}
                  className="flex items-center gap-1.5 text-xs font-semibold text-indigo-700 hover:text-indigo-900 border border-indigo-200 hover:border-indigo-400 px-3 py-1.5 rounded-lg transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" /> Adicionar Cartão
                </button>
              </div>

              {/* Cards list */}
              <div className="space-y-3">
                {cards.map((card) => (
                  <div key={card.id} className={`flex items-center gap-4 p-4 rounded-xl border transition-colors ${card.isDefault ? "border-indigo-200 bg-indigo-50/40" : "border-gray-100 bg-gray-50"}`}>
                    <div className="w-12 h-8 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-lg flex items-center justify-center flex-shrink-0">
                      <CreditCard className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-800">{cardBrand(card.number)} {card.number}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{card.name} · Expira {card.expiry}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {card.isDefault ? (
                        <span className="text-xs font-semibold text-indigo-600 bg-indigo-100 px-2.5 py-0.5 rounded-full">Padrão</span>
                      ) : (
                        <button onClick={() => setDefault(card.id)} className="text-xs text-gray-400 hover:text-indigo-600 font-medium transition-colors">
                          Definir padrão
                        </button>
                      )}
                      <button onClick={() => removeCard(card.id)} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-red-50 transition-colors group">
                        <Trash2 className="w-3.5 h-3.5 text-gray-300 group-hover:text-red-400 transition-colors" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add card form */}
              {showForm && (
                <form onSubmit={addCard} className="mt-5 pt-5 border-t border-gray-100 space-y-4">
                  <h3 className="text-sm font-bold text-gray-800">Novo Cartão</h3>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium text-gray-600">Número do Cartão</label>
                    <input required type="text" placeholder="0000 0000 0000 0000" maxLength={19}
                      value={newNumber} onChange={(e) => setNewNumber(e.target.value)}
                      className="text-black w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder-gray-300"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium text-gray-600">Nome no Cartão</label>
                    <input required type="text" placeholder="Como aparece no cartão"
                      value={newName} onChange={(e) => setNewName(e.target.value)}
                      className="text-black w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder-gray-300"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-medium text-gray-600">Validade</label>
                      <input required type="text" placeholder="MM/AA" maxLength={5}
                        value={newExpiry} onChange={(e) => setNewExpiry(e.target.value)}
                        className="text-black w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder-gray-300"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-xs font-medium text-gray-600">CVV</label>
                      <input required type="text" placeholder="000" maxLength={4}
                        value={newCvv} onChange={(e) => setNewCvv(e.target.value)}
                        className="text-black w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder-gray-300"
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-3 pt-1">
                    <button type="submit" className="px-5 py-2.5 bg-indigo-700 hover:bg-indigo-800 text-white text-sm font-semibold rounded-xl transition-colors">
                      Adicionar Cartão
                    </button>
                    <button type="button" onClick={() => setShowForm(false)} className="px-5 py-2.5 border border-gray-200 text-gray-600 text-sm font-medium rounded-xl hover:border-gray-300 transition-colors">
                      Cancelar
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Security notice */}
            <div className="flex items-start gap-3 bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
              <ShieldCheck className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-gray-800">Seus dados estão seguros</p>
                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                  As informações do cartão são criptografadas e armazenadas com segurança. Nunca armazenamos o número completo ou o CVV.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
