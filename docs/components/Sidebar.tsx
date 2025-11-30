"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { name: "Introduction", href: "/" },
  { name: "Installation", href: "/installation" },
  { name: "Getting Started", href: "/usage" },
  { name: "API Reference", href: "/api" },
  { name: "Examples", href: "/examples" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:block w-64 border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 overflow-y-auto">
      <div className="px-6 py-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-8">Atron.js</h2>
        <nav className="space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`block px-4 py-2 text-sm rounded-md transition-colors ${
                  isActive
                    ? "bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 font-medium"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
