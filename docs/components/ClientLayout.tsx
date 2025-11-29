"use client";

import Sidebar from "./Sidebar";
import MobileSidebar from "./MobileSidebar";
import ThemeToggle from "./ThemeToggle";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex h-screen">
        {/* Desktop Sidebar */}
        <Sidebar />

        {/* Mobile Sidebar */}
        <MobileSidebar />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </div>
        </main>
      </div>

      {/* Theme Toggle Button */}
      <ThemeToggle />
    </>
  );
}
