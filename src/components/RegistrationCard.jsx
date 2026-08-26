import React from "react";
import { Phone, MapPin, Hash, Calendar } from "lucide-react";
import { StatusBadge, AdminMarkBadge } from "./ui/Badge";

export default function RegistrationCard({ registration, onClick }) {
  const date = registration.createdAt
    ? new Date(registration.createdAt).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "N/A";

  return (
    <div
      onClick={() => onClick(registration)}
      className="bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer active:scale-[0.99] overflow-hidden"
    >
      <div className="flex gap-3 p-4">
        {/* Photo */}
        <div className="flex-shrink-0">
          <img
            src={registration.playerPhotoUrl}
            alt={registration.playerName}
            className="w-14 h-14 rounded-xl object-cover bg-slate-100"
            loading="lazy"
          />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="font-semibold text-slate-900 truncate flex items-center gap-2">
                {registration.playerName}
                <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-medium tracking-wide uppercase">
                  {registration.role || "N/A"}
                </span>
              </h3>
              <p className="text-xs text-slate-500 font-mono mt-0.5">
                {registration.registrationId}
              </p>
            </div>
            <StatusBadge status={registration.status} />
          </div>

          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <Phone className="w-3 h-3" />
              {registration.phoneNumber}
            </span>
            <span className="flex items-center gap-1">
              <Hash className="w-3 h-3" />
              #{registration.jerseyNumber} • {registration.jerseySize}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {date}
            </span>
          </div>

          {registration.adminMark && (
            <div className="mt-2">
              <AdminMarkBadge mark={registration.adminMark} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
