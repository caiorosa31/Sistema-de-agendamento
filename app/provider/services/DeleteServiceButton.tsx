"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

export function DeleteServiceButton({ serviceId }: { serviceId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Tem certeza que deseja excluir este serviço? Esta ação não pode ser desfeita.")) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/services/${serviceId}`, { method: "DELETE" });
      if (res.ok) {
        router.refresh();
      } else {
        const data = await res.json();
        alert(data.error || "Erro ao excluir serviço");
      }
    } catch {
      alert("Erro de conexão");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg transition-colors disabled:opacity-50"
    >
      <Trash2 className="w-4 h-4" />
      {loading ? "..." : "Excluir"}
    </button>
  );
}
