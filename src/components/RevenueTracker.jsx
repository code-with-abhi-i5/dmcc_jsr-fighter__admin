import React from "react";
import { Wallet, IndianRupee, TrendingUp } from "lucide-react";

export default function RevenueTracker({ counts, feePerPlayer = 200 }) {
  const approvedCount = counts.approved || 0;
  const totalRevenue = approvedCount * feePerPlayer;

  return (
    <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-5 shadow-sm text-white overflow-hidden relative">
      {/* Decorative background circle */}
      <div className="absolute -right-6 -top-12 opacity-10 pointer-events-none">
        <Wallet className="w-48 h-48" />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-emerald-50 font-medium text-sm">Finance & Revenue Tracker</h3>
            <p className="text-2xl sm:text-3xl font-bold tracking-tight mt-1 flex items-center">
              <IndianRupee className="w-6 h-6 sm:w-7 sm:h-7 mr-1 opacity-80" />
              {totalRevenue.toLocaleString("en-IN")}
            </p>
          </div>
        </div>

        <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm border border-white/20 flex-1 md:max-w-xs text-sm">
          <p className="font-semibold mb-1">Calculation Details:</p>
          <div className="flex justify-between items-center text-emerald-50">
            <span>Approved Players:</span>
            <span className="font-bold text-white">{approvedCount}</span>
          </div>
          <div className="flex justify-between items-center text-emerald-50 mt-1">
            <span>Entry Fee:</span>
            <span className="font-bold text-white">₹{feePerPlayer}</span>
          </div>
          <div className="w-full h-px bg-white/20 my-2"></div>
          <div className="flex justify-between items-center">
            <span>Total Collected:</span>
            <span className="font-bold text-white text-base">₹{totalRevenue.toLocaleString("en-IN")}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
