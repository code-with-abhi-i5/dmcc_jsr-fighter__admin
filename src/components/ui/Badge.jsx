import React from "react";

const statusStyles = {
  pending: "bg-amber-100 text-amber-800 border border-amber-200",
  approved: "bg-emerald-100 text-emerald-800 border border-emerald-200",
  rejected: "bg-rose-100 text-rose-800 border border-rose-200",
};

const markStyles = {
  Verified: "bg-blue-100 text-blue-800",
  "Payment Verified": "bg-emerald-100 text-emerald-800",
  "Jersey Confirmed": "bg-purple-100 text-purple-800",
  "Documents Checked": "bg-teal-100 text-teal-800",
  VIP: "bg-amber-100 text-amber-800",
  "Needs Review": "bg-orange-100 text-orange-800",
};

export function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${statusStyles[status] || statusStyles.pending}`}
    >
      {status}
    </span>
  );
}

export function AdminMarkBadge({ mark }) {
  if (!mark) return null;
  const style = markStyles[mark] || "bg-slate-100 text-slate-700";
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${style}`}
    >
      {mark}
    </span>
  );
}
