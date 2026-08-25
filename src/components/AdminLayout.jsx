import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import { Trophy, LogOut, Users, Settings } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

export default function AdminLayout() {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Top Header */}
      <header className="bg-slate-900 border-b border-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                <Trophy className="w-6 h-6 text-emerald-500" />
              </div>
              <h1 className="text-xl font-bold tracking-tight">DMCC Admin</h1>
            </div>
            
            <button
              onClick={logout}
              className="flex items-center gap-2 px-4 py-2 hover:bg-slate-800 rounded-xl transition-colors text-slate-300 hover:text-white font-medium text-sm"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `flex items-center gap-2 py-4 px-1 border-b-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "border-emerald-500 text-emerald-600"
                    : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                }`
              }
            >
              <Users className="w-4 h-4" />
              Registrations
            </NavLink>
            <NavLink
              to="/teams"
              className={({ isActive }) =>
                `flex items-center gap-2 py-4 px-1 border-b-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "border-emerald-500 text-emerald-600"
                    : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                }`
              }
            >
              <Settings className="w-4 h-4" />
              Teams & Analytics
            </NavLink>
          </nav>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 w-full">
        <Outlet />
      </div>
    </div>
  );
}
