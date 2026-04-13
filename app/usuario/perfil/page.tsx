"use client";

import { useState } from "react";
import Link from "next/link";
import { Bell, ChevronRight, User, CreditCard, MapPin, LogOut, Camera } from "lucide-react";

const NAV_LINKS = [
  { label: "Informações do Perfil", icon: User, href: "/usuario/perfil", active: true },
  { label: "Métodos de Pagamento", icon: CreditCard, href: "/usuario/pagamentos", active: false },
  { label: "Gerenciar Endereços", icon: MapPin, href: "/usuario/enderecos", active: false },
];

export default function ProfilePage() {
  const [name, setName] = useState("Alex Johnson");
  const [email, setEmail] = useState("alex@email.com");
  const [phone, setPhone] = useState("(11) 99999-0000");
  const [bio, setBio] = useState("");
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
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
                <Link
                  key={label}
                  href={href}
                  className={`flex items-center gap-3 py-2.5 px-2 rounded-xl transition-colors group ${
                    active ? "bg-indigo-50 text-indigo-700" : "hover:bg-gray-50 text-gray-600"
                  }`}
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
          <div className="flex-1 min-w-0 bg-white rounded-2xl border border-gray-200 p-7 shadow-sm">
            <h2 className="text-base font-bold text-gray-900 mb-6">Informações do Perfil</h2>

            {/* Avatar */}
            <div className="flex items-center gap-5 mb-8">
              <div className="relative">
                <img
                  src="https://i.pravatar.cc/80?img=11"
                  alt="Avatar"
                  className="w-20 h-20 rounded-full object-cover border-2 border-gray-100"
                />
                <button className="absolute bottom-0 right-0 w-7 h-7 bg-indigo-700 hover:bg-indigo-800 text-white rounded-full flex items-center justify-center shadow transition-colors">
                  <Camera className="w-3.5 h-3.5" />
                </button>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">{name}</p>
                <p className="text-xs text-gray-400 mt-0.5">JPG, GIF ou PNG. Máximo 2MB.</p>
                <button className="mt-2 text-xs text-indigo-600 hover:text-indigo-800 font-medium transition-colors">
                  Alterar foto
                </button>
              </div>
            </div>

            <form onSubmit={handleSave} className="space-y-5">
              <div className="grid grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-gray-600">Nome Completo</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="text-black w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-gray-600">E-mail</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="text-black w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-gray-600">Telefone</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="text-black w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-gray-600">CPF</label>
                  <input
                    type="text"
                    placeholder="000.000.000-00"
                    className="text-black w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder-gray-300"
                  />
                  <p className="text-xs text-gray-400">Usado apenas para verificação</p>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-gray-600">Bio (opcional)</label>
                <textarea
                  rows={3}
                  placeholder="Conte um pouco sobre você..."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="text-black w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder-gray-300 resize-none"
                />
              </div>

              <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                <p className={`text-xs font-medium transition-opacity ${saved ? "text-green-600 opacity-100" : "opacity-0"}`}>
                  ✓ Alterações salvas com sucesso!
                </p>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2.5 bg-indigo-700 hover:bg-indigo-800 text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-70 ml-auto"
                >
                  {loading ? "Salvando..." : "Salvar Alterações"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
