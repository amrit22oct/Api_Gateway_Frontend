import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { logout } from "../api/auth.api";

// Helper to recursively check if an item or any nested child is active
const isItemActive = (item, currentPath) => {
  if (item.path && item.path === currentPath) return true;
  if (item.children && item.children.length > 0) {
    return item.children.some((child) => isItemActive(child, currentPath));
  }
  return false;
};

// Recursive Navigation Item
const SidebarItem = ({ item, currentPath, depth = 0 }) => {
  const hasChildren = item.children && item.children.length > 0;
  const isDirectActive = item.path ? currentPath === item.path : false;
  const childIsActive = isItemActive(item, currentPath);

  const [isOpen, setIsOpen] = useState(() => childIsActive);

  // Auto-expand folder when navigating to a child route
  useEffect(() => {
    if (childIsActive) {
      setIsOpen(true);
    }
  }, [currentPath, childIsActive]);

  // Dynamic indentation and tree guide alignment calculation
  const paddingLeft = 12 + depth * 14;
  const lineLeftOffset = 12 + depth * 14 + 7;

  return (
    <div className="w-full select-none">
      {hasChildren ? (
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          style={{ paddingLeft: `${paddingLeft}px` }}
          className={`group flex w-full items-center justify-between rounded-lg py-2 pr-3 text-xs font-medium transition-all duration-150 cursor-pointer ${
            isOpen || childIsActive
              ? "text-zinc-100 bg-white/[0.04]"
              : "text-zinc-400 hover:bg-white/[0.02] hover:text-zinc-200"
          }`}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            {item.icon && (
              <span
                className={`transition-colors duration-150 ${
                  childIsActive ? "text-indigo-400" : "text-zinc-400 group-hover:text-zinc-200"
                }`}
              >
                {item.icon}
              </span>
            )}
            <span className="truncate">{item.title}</span>
          </div>

          <div className="flex items-center gap-2">
            {item.badge && (
              <span className="rounded-full bg-indigo-500/10 px-2 py-0.5 text-[10px] font-semibold text-indigo-400 border border-indigo-500/20">
                {item.badge}
              </span>
            )}
            <svg
              className={`h-3.5 w-3.5 text-zinc-500 transition-transform duration-200 ${
                isOpen ? "rotate-90 text-indigo-400" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </button>
      ) : (
        <Link
          to={item.path || "#"}
          aria-current={isDirectActive ? "page" : undefined}
          style={{ paddingLeft: `${paddingLeft}px` }}
          className={`relative flex items-center justify-between rounded-lg py-2 pr-3 text-xs font-medium transition-all duration-150 ${
            isDirectActive
              ? "bg-gradient-to-r from-indigo-500/15 via-indigo-500/10 to-transparent text-indigo-300 font-semibold border-l-2 border-indigo-500 shadow-sm shadow-indigo-500/10"
              : "text-zinc-400 hover:bg-white/[0.02] hover:text-zinc-200"
          }`}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            {item.icon && (
              <span className={isDirectActive ? "text-indigo-400" : "text-zinc-500"}>
                {item.icon}
              </span>
            )}
            <span className="truncate">{item.title}</span>
          </div>

          {item.badge && (
            <span className="rounded-full bg-zinc-800 px-1.5 py-0.5 text-[10px] font-medium text-zinc-300 border border-white/5">
              {item.badge}
            </span>
          )}
        </Link>
      )}

      {hasChildren && isOpen && (
        <div className="relative mt-0.5 space-y-0.5">
          <span
            style={{ left: `${lineLeftOffset}px` }}
            className="absolute top-0 h-full w-[1px] bg-zinc-800/80 pointer-events-none"
            aria-hidden="true"
          />
          {item.children.map((child, idx) => (
            <SidebarItem
              key={child.id || child.path || `${child.title}-${idx}`}
              item={child}
              currentPath={currentPath}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const DEFAULT_NAV_ITEMS = [
  {
    title: "Overview",
    path: "/dashboard",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    title: "API Gateway",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    badge: "v2.0",
    children: [
      {
        title: "Services Management",
        children: [
          {
            title: "Authentication Engine",
            children: [
              { title: "JWT Tokens", path: "/gateway/services/auth/jwt" },
              { title: "OAuth2 Provider", path: "/gateway/services/auth/oauth" },
              { title: "Session Keys", path: "/gateway/services/auth/sessions" },
            ],
          },
        ],
      },
    ],
  },
  {
    title: "Settings",
    path: "/settings",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];



// Main Sidebar Shell
const Sidebar = ({
  items = DEFAULT_NAV_ITEMS,
  user = JSON.parse(localStorage.getItem("user")) || {
   name: "Dev User",
   email: "admin@devgate.io",
   role: "Admin",
 },
  brand = { name: "DevGate", subtitle: "API Console" },
  onLogout = () => logout(), // Default handler added here
  className = "",
}) => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <aside
      className={`flex h-screen w-64 flex-col border-r border-zinc-800/80 bg-zinc-950 px-3 py-4 text-zinc-200 backdrop-blur-xl ${className}`}
    >
      {/* Brand Header */}
      <div className="mb-5 flex items-center justify-between px-2">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 font-bold text-white shadow-md shadow-indigo-500/20">
            {brand.name[0]}
          </div>
          <div className="min-w-0">
            <h2 className="truncate text-sm font-bold tracking-tight text-white">
              {brand.name}
            </h2>
            <p className="truncate text-[10px] font-medium text-zinc-500">
              {brand.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 space-y-1 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-zinc-800">
        {items.map((item, idx) => (
          <SidebarItem
            key={item.id || item.path || `${item.title}-${idx}`}
            item={item}
            currentPath={currentPath}
          />
        ))}
      </nav>

      {/* User Footer Profile */}
      <div className="mt-auto border-t border-zinc-800/80 pt-3">
        <div className="group flex items-center gap-2 rounded-xl p-2 transition-colors hover:bg-white/[0.03]">
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 text-xs font-bold text-white shadow-sm">
              {user.name.charAt(0)}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold text-zinc-200">
                {user.name}
              </p>
              <p className="truncate text-[10px] text-zinc-500">{user.email}</p>
            </div>
          </div>

          {onLogout && (
            <button
              type="button"
              onClick={onLogout}
              title="Sign Out"
              aria-label="Sign Out"
              className="shrink-0 rounded-lg p-1.5 text-zinc-400 hover:bg-red-500/10 hover:text-red-400 transition-colors cursor-pointer"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;