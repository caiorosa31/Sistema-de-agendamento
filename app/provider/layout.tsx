import { redirect } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Package, Calendar, User } from "lucide-react";
import { getSession } from "@/lib/session";
import { LogoutButton } from "@/app/components/LogoutButton";

export default async function ProviderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) redirect("/login");
  if (session.role !== "PROVIDER") redirect("/dashboard");

  const navItems = [
    { href: "/provider/dashboard", label: "Início", icon: LayoutDashboard },
    { href: "/provider/services", label: "Meus Serviços", icon: Package },
    { href: "/provider/bookings", label: "Agendamentos", icon: Calendar },
  ];

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col fixed h-full z-10">
        <div className="p-6 border-b border-gray-100">
          <Link href="/" className="text-xl font-extrabold text-indigo-700 tracking-tight">
            SERVICELY
          </Link>
          <p className="text-xs text-gray-400 mt-0.5 font-medium">Painel do Prestador</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-lg transition-colors"
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100 space-y-2">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
              <User className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-800 truncate">{session.name}</p>
              <p className="text-xs text-gray-400 truncate">{session.email}</p>
            </div>
          </div>
          <LogoutButton />
        </div>
      </aside>

      {/* Main content */}
      <main className="ml-64 flex-1 p-8">{children}</main>
    </div>
  );
}
