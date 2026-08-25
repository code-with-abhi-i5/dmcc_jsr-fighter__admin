import React, { useState, useEffect, useCallback } from "react";
import { fetchAllRegistrations } from "../services/registrations";
import { fetchTeams, saveTeams } from "../services/teamService";
import AnalyticsPanel from "../components/AnalyticsPanel";
import toast from "react-hot-toast";
import { Plus, Trash2, Loader2, Save } from "lucide-react";

export default function TeamsPage() {
  const [registrations, setRegistrations] = useState([]);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  // Manage Teams State
  const [newTeamName, setNewTeamName] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [regData, teamsData] = await Promise.all([
        fetchAllRegistrations(),
        fetchTeams()
      ]);
      setRegistrations(regData);
      setTeams(teamsData);
    } catch (error) {
      console.error("Failed to load data:", error);
      toast.error("Failed to load data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleAddTeam = (e) => {
    e.preventDefault();
    const trimmed = newTeamName.trim();
    if (!trimmed) return;
    
    if (teams.some(t => t.toLowerCase() === trimmed.toLowerCase())) {
      toast.error("Team name already exists!");
      return;
    }

    setTeams([...teams, trimmed]);
    setNewTeamName("");
  };

  const handleDeleteTeam = (teamToDelete) => {
    if (!window.confirm(`Are you sure you want to delete "${teamToDelete}"?`)) return;
    setTeams(teams.filter(t => t !== teamToDelete));
  };

  const handleSaveTeams = async () => {
    setIsSaving(true);
    try {
      await saveTeams(teams);
      toast.success("Teams configuration saved successfully!");
    } catch (error) {
      toast.error("Failed to save teams.");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
          <p className="text-slate-500 font-medium">Loading teams and analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8 animate-fade-in">
      
      {/* Analytics Charts */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Analytics Overview</h2>
        <p className="text-slate-500 mb-6">Real-time statistics based on approved players.</p>
        <AnalyticsPanel registrations={registrations} customTeams={teams} />
      </section>

      <hr className="border-slate-200" />

      {/* Manage Teams Section */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Manage Teams</h2>
            <p className="text-slate-500 mt-1 text-sm">Add or remove teams. Don't forget to save changes.</p>
          </div>
          <button
            onClick={handleSaveTeams}
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold transition-colors disabled:opacity-50 shadow-sm"
          >
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save Configuration
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Add Team Form */}
          <div className="lg:col-span-1">
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
              <h3 className="font-semibold text-slate-800 mb-4">Add New Team</h3>
              <form onSubmit={handleAddTeam} className="flex flex-col gap-3">
                <input
                  type="text"
                  placeholder="E.g., Mumbai Indians"
                  value={newTeamName}
                  onChange={(e) => setNewTeamName(e.target.value)}
                  className="w-full border border-slate-200 bg-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />
                <button
                  type="submit"
                  disabled={!newTeamName.trim()}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Team
                </button>
              </form>
            </div>
          </div>

          {/* Teams List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="px-5 py-3 border-b border-slate-100 bg-slate-50">
                <h3 className="font-semibold text-slate-800">Current Teams ({teams.length})</h3>
              </div>
              <div className="p-5">
                {teams.length === 0 ? (
                  <p className="text-sm text-slate-500 text-center py-8">No teams added yet.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {teams.map((team, index) => (
                      <div key={index} className="flex items-center justify-between bg-white border border-slate-200 p-3 rounded-xl hover:border-slate-300 transition-colors group">
                        <span className="font-semibold text-slate-700">{team}</span>
                        <button
                          onClick={() => handleDeleteTeam(team)}
                          className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors opacity-100 sm:opacity-0 group-hover:opacity-100 focus:opacity-100"
                          title="Delete Team"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </section>

      <hr className="border-slate-200" />

      {/* Team Rosters Section */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-900">Team Rosters</h2>
          <p className="text-slate-500 mt-1 text-sm">Players currently assigned to each team.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {["Unassigned", ...teams].map(teamName => {
            const teamPlayers = registrations.filter(
              r => r.status === "approved" && !r.isDeleted && (r.team || "Unassigned") === teamName
            );

            return (
              <div key={teamName} className="bg-slate-50 border border-slate-200 rounded-xl overflow-hidden flex flex-col">
                <div className={`px-4 py-3 border-b flex justify-between items-center ${teamName === "Unassigned" ? "bg-slate-100 border-slate-200" : "bg-emerald-50 border-emerald-100"}`}>
                  <h3 className={`font-bold ${teamName === "Unassigned" ? "text-slate-600" : "text-emerald-800"}`}>
                    {teamName}
                  </h3>
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${teamName === "Unassigned" ? "bg-slate-200 text-slate-700" : "bg-emerald-200 text-emerald-800"}`}>
                    {teamPlayers.length} Players
                  </span>
                </div>
                <div className="p-4 flex-1 max-h-[300px] overflow-y-auto custom-scrollbar">
                  {teamPlayers.length === 0 ? (
                    <p className="text-sm text-slate-400 italic text-center py-4">No players assigned</p>
                  ) : (
                    <ul className="space-y-2">
                      {teamPlayers.map(player => (
                        <li key={player.id} className="flex justify-between items-center bg-white p-2 rounded-lg border border-slate-100 shadow-sm">
                          <span className="text-sm font-semibold text-slate-700 truncate mr-2" title={player.playerName}>
                            {player.playerName}
                          </span>
                          <span className="text-xs font-mono bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">
                            {player.registrationId}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

    </main>
  );
}
