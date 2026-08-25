import React, { useState } from "react";
import { Tag, Check } from "lucide-react";

const presetMarks = [
  "Verified",
  "Payment Verified",
  "Jersey Confirmed",
  "Documents Checked",
  "VIP",
  "Needs Review",
];

export default function AdminMarkEditor({ currentMark, onSave, saving }) {
  const [selectedMark, setSelectedMark] = useState(currentMark || "");
  const [customMark, setCustomMark] = useState("");
  const [showCustom, setShowCustom] = useState(false);

  const handlePresetClick = (mark) => {
    if (selectedMark === mark) {
      setSelectedMark("");
    } else {
      setSelectedMark(mark);
      setShowCustom(false);
      setCustomMark("");
    }
  };

  const handleCustomSave = () => {
    if (customMark.trim()) {
      setSelectedMark(customMark.trim());
      setShowCustom(false);
    }
  };

  const handleSave = () => {
    onSave(selectedMark);
  };

  const hasChanged = selectedMark !== (currentMark || "");

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
        <Tag className="w-4 h-4" />
        Admin Mark
      </div>

      {/* Preset marks */}
      <div className="flex flex-wrap gap-2">
        {presetMarks.map((mark) => (
          <button
            key={mark}
            type="button"
            onClick={() => handlePresetClick(mark)}
            className={`
              inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium
              transition-all duration-150 border
              ${
                selectedMark === mark
                  ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                  : "bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:bg-blue-50"
              }
            `}
          >
            {selectedMark === mark && <Check className="w-3 h-3" />}
            {mark}
          </button>
        ))}
        <button
          type="button"
          onClick={() => setShowCustom(!showCustom)}
          className={`
            inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium
            transition-all duration-150 border
            ${
              showCustom
                ? "bg-slate-700 text-white border-slate-700"
                : "bg-white text-slate-500 border-dashed border-slate-300 hover:border-slate-400"
            }
          `}
        >
          + Custom
        </button>
      </div>

      {/* Custom mark input */}
      {showCustom && (
        <div className="flex gap-2 animate-fade-in">
          <input
            type="text"
            value={customMark}
            onChange={(e) => setCustomMark(e.target.value)}
            placeholder="Enter custom mark..."
            maxLength={50}
            className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
          />
          <button
            type="button"
            onClick={handleCustomSave}
            disabled={!customMark.trim()}
            className="px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Set
          </button>
        </div>
      )}

      {/* Clear mark */}
      {selectedMark && (
        <button
          type="button"
          onClick={() => setSelectedMark("")}
          className="text-xs text-slate-500 hover:text-slate-700 underline"
        >
          Clear mark
        </button>
      )}

      {/* Save button */}
      {hasChanged && (
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="w-full py-2 bg-slate-800 text-white text-sm font-medium rounded-lg hover:bg-slate-900 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
        >
          {saving ? (
            <>
              <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Saving...
            </>
          ) : (
            <>
              <Check className="w-4 h-4" />
              Save Mark
            </>
          )}
        </button>
      )}
    </div>
  );
}
