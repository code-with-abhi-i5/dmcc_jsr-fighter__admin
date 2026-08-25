import React from "react";
import { Search } from "lucide-react";

export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-slate-400" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by name, phone, ID, jersey #, or UTR..."
        className="block w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-2.5 pl-11 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 hover:border-slate-300 transition-colors"
      />
    </div>
  );
}
