import React from "react";
import { Filter, ArrowUpDown } from "lucide-react";

const statusOptions = [
  { value: "all", label: "All Status" },
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Approved" },
  { value: "rejected", label: "Rejected" },
];

const jerseySizeOptions = [
  { value: "all", label: "All Sizes" },
  { value: "S", label: "S" },
  { value: "M", label: "M" },
  { value: "L", label: "L" },
  { value: "XL", label: "XL" },
  { value: "XXL", label: "XXL" },
  { value: "XXXL", label: "XXXL" },
];

const adminMarkOptions = [
  { value: "all", label: "All Marks" },
  { value: "", label: "No Mark" },
  { value: "Verified", label: "Verified" },
  { value: "Payment Verified", label: "Payment Verified" },
  { value: "Jersey Confirmed", label: "Jersey Confirmed" },
  { value: "Documents Checked", label: "Documents Checked" },
  { value: "VIP", label: "VIP" },
  { value: "Needs Review", label: "Needs Review" },
];

const sortOptions = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "name", label: "Player Name" },
  { value: "jersey", label: "Jersey Number" },
  { value: "status", label: "Status" },
];

export default function Filters({
  customTeams = [],
  statusFilter,
  onStatusChange,
  jerseySizeFilter,
  onJerseySizeChange,
  adminMarkFilter,
  onAdminMarkChange,
  teamFilter,
  onTeamChange,
  sortBy,
  onSortChange,
}) {
  const dynamicTeamOptions = [
    { value: "all", label: "All Teams" },
    { value: "Unassigned", label: "Unassigned" },
    ...customTeams.map(t => ({ value: t, label: t }))
  ];

  const selectClass =
    "rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:outline-none focus:border-blue-500 hover:border-slate-300 transition-colors appearance-none cursor-pointer min-w-[120px]";

  return (
    <div className="flex flex-wrap gap-2 sm:gap-3 items-center">
      <div className="flex items-center gap-1.5 text-sm text-slate-500">
        <Filter className="w-4 h-4" />
        <span className="hidden sm:inline font-medium">Filters:</span>
      </div>

      <select
        value={statusFilter}
        onChange={(e) => onStatusChange(e.target.value)}
        className={selectClass}
      >
        {statusOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      <select
        value={jerseySizeFilter}
        onChange={(e) => onJerseySizeChange(e.target.value)}
        className={selectClass}
      >
        {jerseySizeOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      <select
        value={teamFilter}
        onChange={(e) => onTeamChange(e.target.value)}
        className={selectClass}
      >
        {dynamicTeamOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      <select
        value={adminMarkFilter}
        onChange={(e) => onAdminMarkChange(e.target.value)}
        className={selectClass}
      >
        {adminMarkOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      <div className="flex items-center gap-1.5 ml-auto">
        <ArrowUpDown className="w-4 h-4 text-slate-400" />
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className={selectClass}
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
