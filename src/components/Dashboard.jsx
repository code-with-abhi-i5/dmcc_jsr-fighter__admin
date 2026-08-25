import React from "react";
import { Users, Clock, CheckCircle, XCircle } from "lucide-react";

const cards = [
  {
    label: "Total",
    key: "total",
    icon: Users,
    color: "from-blue-500 to-blue-600",
    bg: "bg-blue-50",
    text: "text-blue-700",
    iconColor: "text-blue-500",
  },
  {
    label: "Pending",
    key: "pending",
    icon: Clock,
    color: "from-amber-500 to-amber-600",
    bg: "bg-amber-50",
    text: "text-amber-700",
    iconColor: "text-amber-500",
  },
  {
    label: "Approved",
    key: "approved",
    icon: CheckCircle,
    color: "from-emerald-500 to-emerald-600",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    iconColor: "text-emerald-500",
  },
  {
    label: "Rejected",
    key: "rejected",
    icon: XCircle,
    color: "from-rose-500 to-rose-600",
    bg: "bg-rose-50",
    text: "text-rose-700",
    iconColor: "text-rose-500",
  },
];

export default function Dashboard({ counts, activeFilter, onCardClick }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        const filterValue = card.key === "total" ? "all" : card.key;
        const isActive = activeFilter === filterValue;
        
        return (
          <button
            key={card.key}
            onClick={() => onCardClick(filterValue)}
            className={`
              relative flex flex-col items-start text-left bg-white rounded-2xl border p-4 sm:p-5 shadow-sm transition-all duration-200 overflow-hidden
              ${isActive ? `border-${card.iconColor.split('-')[1]}-500 ring-2 ring-${card.iconColor.split('-')[1]}-500/20` : 'border-slate-200 hover:border-slate-300 hover:shadow-md'}
            `}
          >
            {isActive && (
              <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-[0.03] pointer-events-none`} />
            )}
            <div className="flex items-center justify-between w-full mb-4">
              <div className={`p-2.5 rounded-xl ${card.bg}`}>
                <Icon className={`w-5 h-5 ${card.iconColor}`} />
              </div>
            </div>
            <p className="text-3xl font-bold text-slate-900 tracking-tight">
              {counts[card.key] ?? 0}
            </p>
            <p className="text-sm text-slate-500 mt-1 font-semibold">
              {card.label}
            </p>
          </button>
        );
      })}
    </div>
  );
}
