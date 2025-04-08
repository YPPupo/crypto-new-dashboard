"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiHome,
  FiTrendingUp,
  FiBriefcase,
  FiFileText,
  FiSettings,
} from "react-icons/fi";

const Sidebar = () => {
  const pathname = usePathname();

  const NavItem = ({
    icon: Icon,
    label,
    href,
    isActive,
  }: {
    icon: React.ElementType;
    label: string;
    href: string;
    isActive: boolean;
  }) => (
    <li className="mb-2">
      <Link
        href={href}
        className={`flex items-center p-3 rounded-lg transition-colors ${
          isActive
            ? "bg-indigo-600 text-white"
            : "hover:bg-gray-700 text-gray-300"
        }`}
      >
        <Icon className="w-5 h-5 mr-3" />
        <span className="text-sm font-medium">{label}</span>
      </Link>
    </li>
  );

  return (
    <aside className="w-64 h-screen bg-gray-900 border-r border-gray-700 p-6 fixed left-0 top-0">
      <h1 className="text-xl font-bold mb-8 text-gray-100 flex items-center">
        <span className="text-2xl mr-2">🚀</span>
        Crypto Dashboard
      </h1>

      <nav role="navigation" aria-label="Main navigation">
        <ul>
          <NavItem
            icon={FiHome}
            label="Dashboard"
            href="/"
            isActive={pathname === "/"}
          />
          <NavItem
            icon={FiTrendingUp}
            label="Mercado"
            href="/market"
            isActive={pathname === "/market"}
          />
          <NavItem
            icon={FiBriefcase}
            label="Portafolio"
            href="/portfolio"
            isActive={pathname === "/portfolio"}
          />
          <NavItem
            icon={FiFileText}
            label="Noticias"
            href="/news"
            isActive={pathname === "/news"}
          />
          <NavItem
            icon={FiSettings}
            label="Configuración"
            href="/settings"
            isActive={pathname === "/settings"}
          />
        </ul>
      </nav>

      {/* Footer del Sidebar */}
      <div className="absolute bottom-6 left-6 right-6">
        <div className="border-t border-gray-700 pt-4">
          <p className="text-xs text-gray-400">v2.1.0 • Crypto Analytics</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
