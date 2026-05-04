"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const CATEGORIES = ["Limpeza", "Bem-estar", "Gastronomia", "Jardinagem", "Manutenção", "Outros"];
const UNITS = ["/hr", "/sessão", "/refeição", "/visita", "/m²", "/dia"];

export default function NewServicePage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    unit: "/hr",
    category: "Limpeza",
    image: "",
    duration: "60",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          price: Number(form.price),
          duration: Number(form.duration),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Erro ao criar serviço");
        return;
      }

      router.push("/provider/services");
      router.refresh();
    } catch {
      setError("Erro de conexão. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <Link
          href="/provider/services"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar aos Serviços
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Criar Novo Serviço</h1>
        <p className="text-gray-500 text-sm mt-1">
          Preencha as informações do serviço que você oferece.
        </p>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-gray-700">
            Nome do Serviço <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="title"
            required
            value={form.title}
            onChange={handleChange}
            placeholder="Ex: Limpeza Residencial Completa"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-gray-700">
            Descrição <span className="text-red-500">*</span>
          </label>
          <textarea
            name="description"
            required
            value={form.description}
            onChange={handleChange}
            placeholder="Descreva o serviço em detalhes: o que está incluído, como funciona, etc."
            rows={4}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700">
              Preço (R$) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="price"
              required
              min="1"
              step="0.01"
              value={form.price}
              onChange={handleChange}
              placeholder="0,00"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700">
              Unidade <span className="text-red-500">*</span>
            </label>
            <select
              name="unit"
              value={form.unit}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            >
              {UNITS.map((u) => (
                <option key={u} value={u}>
                  {u}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700">
              Categoria <span className="text-red-500">*</span>
            </label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700">
              Duração (minutos) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="duration"
              required
              min="15"
              step="15"
              value={form.duration}
              onChange={handleChange}
              placeholder="60"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-gray-700">
            URL da Imagem{" "}
            <span className="text-gray-400 font-normal">(opcional)</span>
          </label>
          <input
            type="url"
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="https://..."
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {form.image && (
            <img
              src={form.image}
              alt="Preview"
              className="mt-2 w-full h-40 object-cover rounded-xl border border-gray-100"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          )}
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-indigo-700 hover:bg-indigo-800 text-white font-semibold py-3.5 rounded-xl transition-colors text-sm disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? "Criando..." : "Criar Serviço"}
          </button>
          <Link
            href="/provider/services"
            className="flex-1 border border-gray-300 text-gray-700 font-semibold py-3.5 rounded-xl hover:bg-gray-50 transition-colors text-sm text-center"
          >
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
}
