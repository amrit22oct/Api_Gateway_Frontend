import React from "react";
import { Sidebar } from "../pages";
import { logout } from "../api/auth.api";




const DashboardLayout = ({ children, onLogout }) => {
  return (
    // 1. Root container locked to exact screen height with viewport overflow disabled
    <div className="flex h-screen w-screen overflow-hidden bg-zinc-950">
      
      {/* 2. Sidebar locked from shrinking */}
      <Sidebar className="shrink-0" onLogout={onLogout} />

      {/* 3. Main content area handles its OWN vertical scrolling */}
      <main className="flex-1 overflow-y-auto p-6 text-zinc-100">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;