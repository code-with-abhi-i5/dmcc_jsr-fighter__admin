import React, { useMemo } from "react";
import { Shirt, Users } from "lucide-react";

export default function AnalyticsPanel({ registrations, customTeams = [] }) {
  // Only calculate sizes for approved players
  const stats = useMemo(() => {
    const approved = registrations.filter(r => r.status === "approved" && !r.isDeleted);
    
    const sizes = { M: 0, L: 0, XL: 0, XXL: 0, XXXL: 0 };
    
    // Initialize teams dynamically
    const teams = { Unassigned: 0 };
    customTeams.forEach(t => { teams[t] = 0; });

    approved.forEach(r => {
      // Tally sizes
      if (r.jerseySize && sizes[r.jerseySize] !== undefined) {
        sizes[r.jerseySize]++;
      }
      
      // Tally teams
      const t = r.team || "Unassigned";
      if (teams[t] !== undefined) {
        teams[t]++;
      }
    });

    return { sizes, teams, totalApproved: approved.length };
  }, [registrations, customTeams]);

  const maxSize = Math.max(...Object.values(stats.sizes), 1);
  const maxTeam = Math.max(...Object.values(stats.teams), 1);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-6 mb-6">
      {/* Jersey Size Analytics */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-blue-100 p-2 rounded-lg">
            <Shirt className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800">Jersey Sizes Needed</h3>
            <p className="text-xs text-slate-500 font-medium">For Approved Players ({stats.totalApproved})</p>
          </div>
        </div>

        <div className="space-y-4">
          {Object.entries(stats.sizes).map(([size, count]) => {
            const percentage = Math.round((count / maxSize) * 100);
            return (
              <div key={size} className="flex items-center gap-3">
                <div className="w-10 text-sm font-bold text-slate-700 text-right">{size}</div>
                <div className="flex-1 bg-slate-100 rounded-full h-4 overflow-hidden relative">
                  <div 
                    className="absolute top-0 left-0 h-full bg-blue-500 rounded-full transition-all duration-700" 
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <div className="w-8 text-sm font-medium text-slate-600">{count}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Team Distribution */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-purple-100 p-2 rounded-lg">
            <Users className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800">Team Distribution</h3>
            <p className="text-xs text-slate-500 font-medium">Approved Players Assigned to Teams</p>
          </div>
        </div>

        <div className="space-y-3 max-h-[220px] overflow-y-auto pr-2 custom-scrollbar">
          {Object.entries(stats.teams).map(([team, count]) => {
            const percentage = Math.round((count / maxTeam) * 100);
            const isUnassigned = team === "Unassigned";
            return (
              <div key={team} className="flex flex-col gap-1">
                <div className="flex justify-between items-end">
                  <span className={`text-sm font-bold ${isUnassigned ? "text-slate-400" : "text-slate-700"}`}>{team}</span>
                  <span className="text-xs font-semibold text-slate-500">{count} players</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden relative">
                  <div 
                    className={`absolute top-0 left-0 h-full rounded-full transition-all duration-700 ${isUnassigned ? "bg-slate-300" : "bg-purple-500"}`} 
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
