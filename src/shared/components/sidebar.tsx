"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Kanban,
  Users,
  Bot,
  LogOut,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLogout } from "@/modules/auth/hooks";
import { useAuthStore } from "@/store/auth.store";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Kanban", href: "/kanban", icon: Kanban },
  { label: "Leads", href: "/leads", icon: Users },
  { label: "IA Chat", href: "/chat", icon: Bot },
];

export const Sidebar = () => {
  const pathname = usePathname();
  const { mutate: logout } = useLogout();
  const user = useAuthStore((s) => s.user);

  return (
    <>
      <aside className="hidden lg:flex fixed left-0 top-0 h-full w-60 bg-sidebar border-r border-border flex-col z-40">
        <div className="p-6 border-b border-border">
          <h1 className="text-primary font-bold text-lg leading-none">
            SI CRM
          </h1>
          <p className="text-text-muted text-xs uppercase tracking-widest mt-0.5">
            Elite Reality Group
          </p>
        </div>

        <nav className="flex-1 p-3 flex flex-col gap-1">
          {navItems.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition",
                pathname === href
                  ? "bg-primary text-white"
                  : "text-text-muted hover:bg-primary-light hover:text-primary",
              )}
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          ))}
        </nav>

        <div className="p-3 border-t border-border flex flex-col gap-1">
          <Link
            href="/profile"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-text-muted hover:bg-primary-light hover:text-primary transition"
          >
            <User className="w-4 h-4" />
            Perfil
          </Link>
          <button
            onClick={() => logout()}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-text-muted hover:bg-danger-light hover:text-danger transition w-full"
          >
            <LogOut className="w-4 h-4" />
            Sair
          </button>
        </div>
      </aside>

      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-sidebar border-t border-border z-40">
        <div className="flex items-center justify-around px-2 py-2">
          {navItems.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-2 rounded-lg text-xs font-medium transition",
                pathname === href
                  ? "text-primary"
                  : "text-text-muted hover:text-primary",
              )}
            >
              <Icon
                className={cn("w-5 h-5", pathname === href && "stroke-[2.5px]")}
              />
              {label}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
};
