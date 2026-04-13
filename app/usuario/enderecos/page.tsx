"use client";

import { useState } from "react";
import Link from "next/link";
import { Bell, User, CreditCard, MapPin, LogOut, Plus, Trash2, Pencil, Home, Briefcase } from "lucide-react";

const NAV_LINKS = [
  { label: "Informações do Perfil", icon: User, href: "/usuario/perfil", active: false },
  { label: "Métodos de Pagamento", icon: CreditCard, href: "/usuario/pagamentos", active: false },
  { label: "Gerenciar Endereços", icon: MapPin, href: "/usuario/enderecos", active: true },
];

interface Address {
  id: number;
  label: string;
  type: "casa" | "trabalho" | "outro";
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  zip: string;
  isDefault: boolean;
}

const EMPTY: Omit<Address, "id" | "isDefault"> = {
  label: "", type: "casa", street: "", number: "", complement: "",
  neighborhood: "", city: "", state: "", zip: "",
};

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>([
    { id: 1, label: "Casa", type: "casa", street: "Rua das Flores", number: "123", complement: "Apto 4B", neighborhood: "Jardim Primavera", city: "São Paulo", state: "SP", zip: "01310-100", isDefault: true },
    { id: 2, label: "Trabalho", type: "trabalho", street: "Av. Paulista", number: "1000", complement: "Sala 502", neighborhood: "Bela Vista", city: "São Paulo", state: "SP", zip: "01310-200", isDefault: false },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState({ ...EMPTY });
  const [saved, setSaved] = useState(false);

  const openNew = () => { setEditId(null); setForm({ ...EMPTY }); setShowForm(true); };

  const openEdit = (addr: Address) => {
    const { id, isDefault, ...rest } = addr;
    setEditId(id); setForm(rest); setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editId) {
      setAddresses((a) => a.map((x) => x.id === editId ? { ...x, ...form } : x));
    } else {
      setAddresses((a) => [...a, { id: Date.now(), ...form, isDefault: a.length === 0 }]);
    }
    setShowForm(false); setEditId(null); setForm({ ...EMPTY });
    setSaved(true); setTimeout(() => setSaved(false), 3000);
  };

  const remove = (id: number) => setAddresses((a) => a.filter((x) => x.id !== id));
  const setDefault = (id: number) => setAddresses((a) => a.map((x) => ({ ...x, isDefault: x.id === id })));

  const TypeIcon = ({ type }: { type: Address["type"] }) =>
    type === "casa" ? <Home className="w-4 h-4 text-indigo-500" /> :
    type === "trabalho" ? <Briefcase className="w-4 h-4 text-indigo-500" /> :
    <MapPin className="w-4 h-4 text-indigo-500" />;

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
                <div>
                  <h2 className="text-base font-bold text-gray-900">Gerenciar Endereços</h2>
                  <p className="text-xs text-gray-400 mt-0.5">Endereços salvos para agendamentos mais rápidos.</p>
                </div>
                <button onClick={openNew}
                  className="flex items-center gap-1.5 text-xs font-semibold text-indigo-700 hover:text-indigo-900 border border-indigo-200 hover:border-indigo-400 px-3 py-1.5 rounded-lg transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" /> Novo Endereço
                </button>
              </div>

              {/* Address list */}
              <div className="space-y-3">
                {addresses.map((addr) => (
                  <div key={addr.id} className={`flex items-start gap-4 p-4 rounded-xl border transition-colors ${addr.isDefault ? "border-indigo-200 bg-indigo-50/40" : "border-gray-100 bg-gray-50"}`}>
                    <div className="w-9 h-9 bg-white border border-gray-200 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                      <TypeIcon type={addr.type} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-gray-800">{addr.label}</p>
                        {addr.isDefault && (
                          <span className="text-xs font-semibold text-indigo-600 bg-indigo-100 px-2 py-0.5 rounded-full">Padrão</span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {addr.street}, {addr.number}{addr.complement ? `, ${addr.complement}` : ""}
                      </p>
                      <p className="text-xs text-gray-400">
                        {addr.neighborhood} · {addr.city}/{addr.state} · CEP {addr.zip}
                      </p>
                      {!addr.isDefault && (
                        <button onClick={() => setDefault(addr.id)} className="text-xs text-indigo-600 hover:text-indigo-800 font-medium mt-1 transition-colors">
                          Definir como padrão
                        </button>
                      )}
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <button onClick={() => openEdit(addr)} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-indigo-50 transition-colors group">
                        <Pencil className="w-3.5 h-3.5 text-gray-300 group-hover:text-indigo-500 transition-colors" />
                      </button>
                      <button onClick={() => remove(addr.id)} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-red-50 transition-colors group">
                        <Trash2 className="w-3.5 h-3.5 text-gray-300 group-hover:text-red-400 transition-colors" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add / Edit form */}
              {showForm && (
                <form onSubmit={handleSubmit} className="mt-6 pt-6 border-t border-gray-100 space-y-4">
                  <h3 className="text-sm font-bold text-gray-800">{editId ? "Editar Endereço" : "Novo Endereço"}</h3>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-medium text-gray-600">Apelido</label>
                      <input required placeholder="Ex: Casa, Trabalho..." value={form.label}
                        onChange={(e) => setForm((f) => ({ ...f, label: e.target.value }))}
                        className="text-black w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder-gray-300"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-xs font-medium text-gray-600">Tipo</label>
                      <select value={form.type} onChange={(e) => setForm((f) => ({ ...f, type: e.target.value as Address["type"] }))}
                        className="text-black w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white"
                      >
                        <option value="casa">Casa</option>
                        <option value="trabalho">Trabalho</option>
                        <option value="outro">Outro</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-xs font-medium text-gray-600">CEP</label>
                      <input required placeholder="00000-000" maxLength={9} value={form.zip}
                        onChange={(e) => setForm((f) => ({ ...f, zip: e.target.value }))}
                        className="text-black w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder-gray-300"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-xs font-medium text-gray-600">Rua / Avenida</label>
                      <input required placeholder="Nome da rua" value={form.street}
                        onChange={(e) => setForm((f) => ({ ...f, street: e.target.value }))}
                        className="text-black w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder-gray-300"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-xs font-medium text-gray-600">Número</label>
                      <input required placeholder="123" value={form.number}
                        onChange={(e) => setForm((f) => ({ ...f, number: e.target.value }))}
                        className="text-black w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder-gray-300"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-xs font-medium text-gray-600">Complemento</label>
                      <input placeholder="Apto, sala, bloco..." value={form.complement}
                        onChange={(e) => setForm((f) => ({ ...f, complement: e.target.value }))}
                        className="text-black w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder-gray-300"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-xs font-medium text-gray-600">Bairro</label>
                      <input required placeholder="Bairro" value={form.neighborhood}
                        onChange={(e) => setForm((f) => ({ ...f, neighborhood: e.target.value }))}
                        className="text-black w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder-gray-300"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-xs font-medium text-gray-600">Cidade</label>
                      <input required placeholder="Cidade" value={form.city}
                        onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
                        className="text-black w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder-gray-300"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-xs font-medium text-gray-600">Estado</label>
                      <input required placeholder="SP" maxLength={2} value={form.state}
                        onChange={(e) => setForm((f) => ({ ...f, state: e.target.value.toUpperCase() }))}
                        className="text-black w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder-gray-300"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-1">
                    <button type="submit" className="px-5 py-2.5 bg-indigo-700 hover:bg-indigo-800 text-white text-sm font-semibold rounded-xl transition-colors">
                      {editId ? "Salvar Alterações" : "Adicionar Endereço"}
                    </button>
                    <button type="button" onClick={() => { setShowForm(false); setEditId(null); }}
                      className="px-5 py-2.5 border border-gray-200 text-gray-600 text-sm font-medium rounded-xl hover:border-gray-300 transition-colors"
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              )}

              {saved && (
                <p className="text-xs text-green-600 font-medium mt-4">✓ Endereço salvo com sucesso!</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
