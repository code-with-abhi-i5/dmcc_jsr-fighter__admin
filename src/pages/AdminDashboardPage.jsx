import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Trophy, LogOut, RefreshCw, Download } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../contexts/AuthContext";
import { fetchAllRegistrations } from "../services/registrations";
import { exportToCSV } from "../utils/exportUtils";
import { fetchTeams } from "../services/teamService";
import Dashboard from "../components/Dashboard";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";
import RegistrationList from "../components/RegistrationList";
import RegistrationDetail from "../components/RegistrationDetail";

export default function AdminDashboardPage() {
  const { user } = useAuth();

  // Data
  const [registrations, setRegistrations] = useState([]);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  // UI state
  const [selectedRegistration, setSelectedRegistration] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [jerseySizeFilter, setJerseySizeFilter] = useState("all");
  const [adminMarkFilter, setAdminMarkFilter] = useState("all");
  const [teamFilter, setTeamFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  // Load registrations and teams
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
      toast.error("Failed to load data. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Dashboard counts
  const counts = useMemo(() => {
    const active = registrations.filter(r => !r.isDeleted);
    const total = active.length;
    const pending = active.filter((r) => r.status === "pending").length;
    const approved = active.filter((r) => r.status === "approved").length;
    const rejected = active.filter((r) => r.status === "rejected").length;
    return { total, pending, approved, rejected };
  }, [registrations]);

  // Filter + search + sort
  const filteredRegistrations = useMemo(() => {
    // Exclude soft-deleted items
    let result = registrations.filter(r => !r.isDeleted);

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (r) =>
          r.playerName?.toLowerCase().includes(q) ||
          r.phoneNumber?.includes(q) ||
          r.registrationId?.toLowerCase().includes(q) ||
          String(r.jerseyNumber)?.includes(q) ||
          r.utr?.toLowerCase().includes(q)
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      result = result.filter((r) => r.status === statusFilter);
    }

    // Jersey size filter
    if (jerseySizeFilter !== "all") {
      result = result.filter((r) => r.jerseySize === jerseySizeFilter);
    }

    // Team filter
    if (teamFilter !== "all") {
      result = result.filter((r) => (r.team || "Unassigned") === teamFilter);
    }

    // Admin mark filter
    if (adminMarkFilter !== "all") {
      result = result.filter((r) => (r.adminMark || "") === adminMarkFilter);
    }

    // Sort
    switch (sortBy) {
      case "oldest":
        result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case "name":
        result.sort((a, b) =>
          (a.playerName || "").localeCompare(b.playerName || "")
        );
        break;
      case "jersey":
        result.sort((a, b) => (a.jerseyNumber || 0) - (b.jerseyNumber || 0));
        break;
      case "status":
        result.sort((a, b) =>
          (a.status || "").localeCompare(b.status || "")
        );
        break;
      case "newest":
      default:
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
    }

    return result;
  }, [registrations, searchQuery, statusFilter, jerseySizeFilter, adminMarkFilter, teamFilter, sortBy]);

  // Handle inline updates from detail modal
  const handleUpdate = (docId, updates) => {
    setRegistrations((prev) =>
      prev.map((r) => (r.id === docId ? { ...r, ...updates } : r))
    );
    // Also update the selected registration if open
    if (selectedRegistration?.id === docId) {
      setSelectedRegistration((prev) => ({ ...prev, ...updates }));
    }
  };

  const handleDelete = (docId) => {
    setRegistrations((prev) => prev.filter((r) => r.id !== docId));
    if (selectedRegistration?.id === docId) {
      setSelectedRegistration(null);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Failed to log out");
    }
  };

  return (
    <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full animate-fade-in">
      <div className="space-y-6">
        <Dashboard 
          counts={counts} 
          activeFilter={statusFilter}
          onCardClick={setStatusFilter}
        />
        
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm space-y-4">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <div className="flex-1 w-full max-w-md">
                <SearchBar
                  value={searchQuery}
                  onChange={setSearchQuery}
                  placeholder="Search by ID, Name or Phone..."
                />
              </div>
              <div className="flex items-center gap-3 self-end md:self-auto">
                <button
                  onClick={() => exportToCSV(filteredRegistrations)}
                  disabled={filteredRegistrations.length === 0}
                  className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold transition-colors disabled:opacity-50"
                  title="Export to Excel/CSV"
                >
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">Export</span>
                </button>
                <button
                  onClick={loadData}
                  disabled={loading}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-medium transition-colors disabled:opacity-50"
                  title="Refresh Data"
                >
                  <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                  <span className="hidden sm:inline">Refresh</span>
                </button>
              </div>
            </div>

            <Filters
              customTeams={teams}
              statusFilter={statusFilter}
              onStatusChange={setStatusFilter}
              jerseySizeFilter={jerseySizeFilter}
              onJerseySizeChange={setJerseySizeFilter}
              adminMarkFilter={adminMarkFilter}
              onAdminMarkChange={setAdminMarkFilter}
              teamFilter={teamFilter}
              onTeamChange={setTeamFilter}
              sortBy={sortBy}
              onSortChange={setSortBy}
            />
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden min-h-[400px]">
            {loading && registrations.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-slate-400">
                <RefreshCw className="w-8 h-8 animate-spin mb-4 text-emerald-500" />
                <p>Loading registrations...</p>
              </div>
            ) : filteredRegistrations.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-slate-400">
                <p>No registrations found matching your filters.</p>
              </div>
            ) : (
              <RegistrationList
                registrations={filteredRegistrations}
                onSelect={setSelectedRegistration}
              />
            )}
          </div>
        </div>
      {/* Detail Modal */}
      {selectedRegistration && (
        <RegistrationDetail
          registration={selectedRegistration}
          customTeams={teams}
          onClose={() => setSelectedRegistration(null)}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
