import React from "react";
import { StatusBadge, AdminMarkBadge } from "./ui/Badge";
import RegistrationCard from "./RegistrationCard";

export default function RegistrationList({ registrations, onSelect, loading }) {
  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center gap-2 text-slate-500">
          <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Loading registrations...
        </div>
      </div>
    );
  }

  if (registrations.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-xl border border-slate-100">
        <p className="text-slate-500 text-sm">No registrations found</p>
      </div>
    );
  }

  return (
    <>
      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {registrations.map((reg) => (
          <RegistrationCard
            key={reg.id}
            registration={reg}
            onClick={onSelect}
          />
        ))}
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/80">
                <th className="text-left px-4 py-3 font-semibold text-slate-600">Player</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-600">Phone</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-600">Jersey</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-600">UTR</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-600">Reg ID</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-600">Date</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-600">Status</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-600">Mark</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {registrations.map((reg) => {
                const date = reg.createdAt
                  ? new Date(reg.createdAt).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                    })
                  : "N/A";

                return (
                  <tr
                    key={reg.id}
                    onClick={() => onSelect(reg)}
                    className="hover:bg-blue-50/50 cursor-pointer transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={reg.playerPhotoUrl}
                          alt={reg.playerName}
                          className="w-9 h-9 rounded-lg object-cover bg-slate-100"
                          loading="lazy"
                        />
                        <div className="flex flex-col">
                          <span className="font-medium text-slate-900 truncate max-w-[150px]">
                            {reg.playerName}
                          </span>
                          <span className="text-[10px] text-slate-500 font-medium tracking-wide uppercase mt-0.5">
                            {reg.role || "Not Specified"}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{reg.phoneNumber}</td>
                    <td className="px-4 py-3 text-slate-600">
                      #{reg.jerseyNumber} <span className="text-slate-400">•</span> {reg.jerseySize}
                    </td>
                    <td className="px-4 py-3 text-slate-600 truncate max-w-[100px]">{reg.utr}</td>
                    <td className="px-4 py-3 font-mono text-xs text-slate-500">{reg.registrationId}</td>
                    <td className="px-4 py-3 text-slate-500">{date}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={reg.status} />
                    </td>
                    <td className="px-4 py-3">
                      {reg.adminMark ? (
                        <AdminMarkBadge mark={reg.adminMark} />
                      ) : (
                        <span className="text-xs text-slate-400">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
