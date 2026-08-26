import React from "react";
import { Users, Activity } from "lucide-react";

export default function RoleStats({ registrations }) {
  // Only count non-deleted, active registrations (or approved ones, but let's count all non-deleted ones to see total registered)
  const activeRegs = registrations.filter(r => !r.isDeleted);
  
  const batsmen = activeRegs.filter(r => r.role === "Batsman").length;
  const bowlers = activeRegs.filter(r => r.role === "Bowler").length;
  const allRounders = activeRegs.filter(r => r.role === "All Rounder").length;
  
  // If some didn't specify role (from old data)
  const notSpecified = activeRegs.length - (batsmen + bowlers + allRounders);

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-indigo-100 p-2.5 rounded-xl">
          <Activity className="w-5 h-5 text-indigo-600" />
        </div>
        <div>
          <h3 className="font-bold text-slate-800 text-lg">Player Roles Overview</h3>
          <p className="text-xs text-slate-500 font-medium">Distribution of registered players</p>
        </div>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
        <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow">
          <span className="text-2xl font-bold text-slate-700">{batsmen}</span>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Batsmen</span>
        </div>
        
        <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow">
          <span className="text-2xl font-bold text-slate-700">{bowlers}</span>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Bowlers</span>
        </div>
        
        <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow">
          <span className="text-2xl font-bold text-slate-700">{allRounders}</span>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1 text-center leading-tight">All Rounders</span>
        </div>
        
        <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow col-span-3 sm:col-span-1">
          <span className="text-2xl font-bold text-slate-400">{notSpecified}</span>
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-1 text-center leading-tight">Not Specified</span>
        </div>
      </div>
    </div>
  );
}
