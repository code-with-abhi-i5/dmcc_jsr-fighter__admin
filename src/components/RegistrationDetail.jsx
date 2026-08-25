import React, { useState } from "react";
import {
  X,
  Phone,
  MapPin,
  Hash,
  Calendar,
  CreditCard,
  Shirt,
  CheckCircle,
  XCircle,
  Clock,
  Loader2,
  Trash2,
} from "lucide-react";
import { StatusBadge, AdminMarkBadge } from "./ui/Badge";
import AdminMarkEditor from "./AdminMarkEditor";
import AdminPlayerCard from "./AdminPlayerCard";
import {
  updateRegistrationStatus,
  updateAdminMark,
  deleteRegistration,
  updatePlayerTeam,
} from "../services/registrations";
import toast from "react-hot-toast";

export default function RegistrationDetail({ registration, customTeams = [], onClose, onUpdate, onDelete }) {
  const [status, setStatus] = useState(registration.status);
  const [adminMark, setAdminMark] = useState(registration.adminMark || "");
  const [statusLoading, setStatusLoading] = useState(false);
  const [markSaving, setMarkSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const [team, setTeam] = useState(registration.team || "Unassigned");
  const [teamSaving, setTeamSaving] = useState(false);

  const handleTeamChange = async (e) => {
    const newTeam = e.target.value;
    if (newTeam === team) return;
    setTeamSaving(true);
    try {
      await updatePlayerTeam(registration.id, newTeam);
      setTeam(newTeam);
      onUpdate(registration.id, { team: newTeam });
      toast.success(`Assigned to ${newTeam}`);
    } catch (error) {
      console.error("Team update failed:", error);
      toast.error("Failed to assign team.");
    } finally {
      setTeamSaving(false);
    }
  };

  const date = registration.createdAt
    ? new Date(registration.createdAt).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "N/A";

  const handleStatusChange = async (newStatus) => {
    if (newStatus === status) return;
    setStatusLoading(true);
    try {
      await updateRegistrationStatus(registration.id, newStatus);
      setStatus(newStatus);
      onUpdate(registration.id, { status: newStatus });
      toast.success(`Registration ${newStatus} successfully.`);
    } catch (error) {
      console.error("Status update failed:", error);
      toast.error("Failed to update status. Please try again.");
    } finally {
      setStatusLoading(false);
    }
  };

  const handleMarkSave = async (mark) => {
    setMarkSaving(true);
    try {
      await updateAdminMark(registration.id, mark);
      setAdminMark(mark);
      onUpdate(registration.id, { adminMark: mark });
      toast.success("Admin mark updated successfully.");
    } catch (error) {
      console.error("Mark update failed:", error);
      toast.error("Failed to update admin mark. Please try again.");
    } finally {
      setMarkSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this registration? This cannot be undone.")) return;
    
    setIsDeleting(true);
    try {
      await deleteRegistration(registration.id);
      toast.success("Registration deleted successfully");
      if (onDelete) onDelete(registration.id);
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Failed to delete. Please try again.");
      setIsDeleting(false);
    }
  };

  const statusButtons = [
    {
      label: "Approve",
      value: "approved",
      icon: CheckCircle,
      style: "bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm",
      activeStyle: "bg-emerald-700 ring-2 ring-emerald-300",
    },
    {
      label: "Reject",
      value: "rejected",
      icon: XCircle,
      style: "bg-rose-600 hover:bg-rose-700 text-white shadow-sm",
      activeStyle: "bg-rose-700 ring-2 ring-rose-300",
    },
    {
      label: "Pending",
      value: "pending",
      icon: Clock,
      style: "bg-amber-500 hover:bg-amber-600 text-white shadow-sm",
      activeStyle: "bg-amber-600 ring-2 ring-amber-300",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-slide-up">
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-slate-100 px-5 py-4 flex items-center justify-between z-10 rounded-t-2xl">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Player Details</h2>
            <p className="text-xs text-slate-500 font-mono">
              {registration.registrationId}
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
              title="Delete Registration"
            >
              {isDeleting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Trash2 className="w-5 h-5" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-5 space-y-6">
          {/* Player Photo */}
          <div className="flex justify-center">
            <img
              src={registration.playerPhotoUrl}
              alt={registration.playerName}
              className="w-40 h-40 sm:w-48 sm:h-48 rounded-2xl object-cover bg-slate-100 shadow-lg border-4 border-white"
            />
          </div>

          {/* Player Name */}
          <div className="text-center">
            <h3 className="text-xl font-bold text-slate-900">
              {registration.playerName}
            </h3>
            <div className="flex items-center justify-center gap-2 mt-2">
              <StatusBadge status={status} />
              {adminMark && <AdminMarkBadge mark={adminMark} />}
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <DetailItem
              icon={Phone}
              label="Phone Number"
              value={registration.phoneNumber}
            />
            <DetailItem
              icon={MapPin}
              label="Address"
              value={registration.address}
            />
            <DetailItem
              icon={Shirt}
              label="Jersey Size"
              value={registration.jerseySize}
            />
            <DetailItem
              icon={Hash}
              label="Jersey Number"
              value={`#${registration.jerseyNumber}`}
            />
            <DetailItem
              icon={CreditCard}
              label="UTR / Transaction"
              value={registration.utr}
            />
            <DetailItem
              icon={Calendar}
              label="Registration Date"
              value={date}
            />
          </div>

          {/* Status Actions */}
          <div className="border-t border-slate-100 pt-5">
            <p className="text-sm font-medium text-slate-700 mb-3">
              Update Status
            </p>
            <div className="flex flex-wrap gap-2">
              {statusButtons.map((btn) => {
                const Icon = btn.icon;
                const isActive = status === btn.value;
                return (
                  <button
                    key={btn.value}
                    onClick={() => handleStatusChange(btn.value)}
                    disabled={statusLoading}
                    className={`
                      inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold
                      transition-all duration-150 disabled:opacity-50
                      ${isActive ? btn.activeStyle : btn.style}
                    `}
                  >
                    {statusLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Icon className="w-4 h-4" />
                    )}
                    {btn.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Team Assignment (Only show if approved) */}
          {status === "approved" && (
            <div className="border-t border-slate-100 pt-5">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-medium text-slate-700">
                  Team Assignment
                </p>
                {teamSaving && <Loader2 className="w-4 h-4 animate-spin text-emerald-500" />}
              </div>
              <select
                value={team}
                onChange={handleTeamChange}
                disabled={teamSaving}
                className="w-full sm:w-auto min-w-[200px] border border-slate-200 bg-slate-50 text-slate-800 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 disabled:opacity-50"
              >
                <option value="Unassigned">Unassigned</option>
                {customTeams.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          )}

          {/* Admin Mark */}
          <div className="border-t border-slate-100 pt-5">
            <AdminMarkEditor
              currentMark={adminMark}
              onSave={handleMarkSave}
              saving={markSaving}
            />
          </div>

          {/* Player ID Card Download */}
          <div className="border-t border-slate-100 pt-5">
            <p className="text-sm font-medium text-slate-700 mb-4">
              Player ID Card
            </p>
            <AdminPlayerCard registration={{...registration, status, adminMark}} />
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailItem({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3 bg-slate-50 rounded-xl p-3.5">
      <div className="p-2 bg-white rounded-lg shadow-sm">
        <Icon className="w-4 h-4 text-slate-500" />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-slate-500 font-medium">{label}</p>
        <p className="text-sm font-semibold text-slate-900 mt-0.5 break-words">
          {value}
        </p>
      </div>
    </div>
  );
}
