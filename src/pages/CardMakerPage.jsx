import React, { useState, useRef, useCallback, useEffect } from "react";
import { Download, Upload, ImagePlus, Trash2, Loader2, Save } from "lucide-react";
import { toPng } from "html-to-image";
import toast from "react-hot-toast";
import { fetchTeams } from "../services/teamService";
import { saveTeamCard } from "../services/cardService";
import { compressImageToBase64 } from "../utils/imageUtils";
import TeamCard from "../components/TeamCard";

function PhotoUploader({ label, photo, onPhotoChange, onRemove }) {
  const inputRef = useRef(null);

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-slate-700">{label}</label>
      {photo ? (
        <div className="relative group w-28 h-28">
          <img
            src={photo}
            alt={label}
            className="w-full h-full rounded-xl object-cover border-2 border-slate-200"
          />
          <button
            onClick={onRemove}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
          >
            <Trash2 className="w-3 h-3" />
          </button>
        </div>
      ) : (
        <button
          onClick={() => inputRef.current?.click()}
          className="w-28 h-28 rounded-xl border-2 border-dashed border-slate-300 hover:border-emerald-500 flex flex-col items-center justify-center gap-1 text-slate-400 hover:text-emerald-500 transition-colors bg-slate-50"
        >
          <ImagePlus className="w-6 h-6" />
          <span className="text-[10px] font-medium">Upload</span>
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            const url = URL.createObjectURL(file);
            onPhotoChange(url);
          }
          e.target.value = "";
        }}
      />
    </div>
  );
}

export default function CardMakerPage() {
  const cardRef = useRef(null);
  const [downloading, setDownloading] = useState(false);

  const [teamName, setTeamName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [ownerPhoto, setOwnerPhoto] = useState("");
  const [player1Name, setPlayer1Name] = useState("");
  const [player1Photo, setPlayer1Photo] = useState("");
  const [player2Name, setPlayer2Name] = useState("");
  const [player2Photo, setPlayer2Photo] = useState("");
  const [teamLogo, setTeamLogo] = useState("");

  const [teams, setTeams] = useState([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadTeams = async () => {
      const fetchedTeams = await fetchTeams();
      setTeams(fetchedTeams);
      if (fetchedTeams.length > 0 && !teamName) {
        setTeamName(fetchedTeams[0]);
      }
    };
    loadTeams();
  }, []);

  const handleDownload = useCallback(async () => {
    if (!cardRef.current) return;
    if (!teamName.trim()) {
      toast.error("Please select a team.");
      return;
    }
    setDownloading(true);
    const toastId = toast.loading("Generating card...");
    try {
      const dataUrl = await toPng(cardRef.current, {
        pixelRatio: 3,
        backgroundColor: null,
      });
      const link = document.createElement("a");
      link.download = `${teamName.trim()}_Team_Card.png`;
      link.href = dataUrl;
      link.click();
      toast.success("Card downloaded!", { id: toastId });
    } catch (err) {
      console.error("Download failed:", err);
      toast.error("Download failed. Please try again.", { id: toastId });
    } finally {
      setDownloading(false);
    }
  }, [teamName]);

  const handleSaveCard = useCallback(async () => {
    if (!teamName.trim()) {
      toast.error("Please select a team.");
      return;
    }
    setSaving(true);
    const toastId = toast.loading("Saving card details...");
    try {
      // Compress all images to tiny base64 strings
      const compressedOwner = await compressImageToBase64(ownerPhoto, 200);
      const compressedP1 = await compressImageToBase64(player1Photo, 200);
      const compressedP2 = await compressImageToBase64(player2Photo, 200);
      const compressedLogo = await compressImageToBase64(teamLogo, 200);

      const cardData = {
        teamName,
        ownerName,
        ownerPhoto: compressedOwner,
        player1Name,
        player1Photo: compressedP1,
        player2Name,
        player2Photo: compressedP2,
        teamLogo: compressedLogo,
      };

      await saveTeamCard(teamName, cardData);
      toast.success("Card data saved successfully!", { id: toastId });
    } catch (err) {
      console.error("Save failed:", err);
      toast.error(`Save failed: ${err.message}`, { id: toastId });
    } finally {
      setSaving(false);
    }
  }, [teamName, ownerName, ownerPhoto, player1Name, player1Photo, player2Name, player2Photo, teamLogo]);
  const handleReset = () => {
    setTeamName(teams.length > 0 ? teams[0] : "");
    setOwnerName("");
    setOwnerPhoto("");
    setPlayer1Name("");
    setPlayer1Photo("");
    setPlayer2Name("");
    setPlayer2Photo("");
    setTeamLogo("");
  };

  return (
    <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Team Card Maker</h1>
        <p className="text-sm text-slate-500 mt-1">
          Create beautiful team cards with owner & icon players. Fill the form and download!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* LEFT: Form */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Team Name *</label>
            {teams.length === 0 ? (
              <p className="text-sm text-slate-500 italic">No teams available. Add teams in Manage Teams first.</p>
            ) : (
              <select
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 font-bold uppercase tracking-wide bg-white"
              >
                <option value="" disabled>Select a Team</option>
                {teams.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            )}
          </div>

          <div className="border-t border-slate-100 pt-5">
            <h3 className="text-sm font-bold text-slate-800 mb-3">🏏 Team Logo</h3>
            <PhotoUploader
              label="Upload team logo (shown in center)"
              photo={teamLogo}
              onPhotoChange={setTeamLogo}
              onRemove={() => setTeamLogo("")}
            />
          </div>

          <div className="border-t border-slate-100 pt-5">
            <h3 className="text-sm font-bold text-slate-800 mb-3">👑 Owner</h3>
            <div className="flex items-start gap-4">
              <PhotoUploader
                label="Photo"
                photo={ownerPhoto}
                onPhotoChange={setOwnerPhoto}
                onRemove={() => setOwnerPhoto("")}
              />
              <div className="flex-1">
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Name</label>
                <input
                  type="text"
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value.toUpperCase())}
                  placeholder="e.g. SANJAY"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 font-bold uppercase"
                />
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-5">
            <h3 className="text-sm font-bold text-slate-800 mb-3">⭐ Icon Player 1</h3>
            <div className="flex items-start gap-4">
              <PhotoUploader
                label="Photo"
                photo={player1Photo}
                onPhotoChange={setPlayer1Photo}
                onRemove={() => setPlayer1Photo("")}
              />
              <div className="flex-1">
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Name</label>
                <input
                  type="text"
                  value={player1Name}
                  onChange={(e) => setPlayer1Name(e.target.value.toUpperCase())}
                  placeholder="e.g. SURAJ"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 font-bold uppercase"
                />
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-5">
            <h3 className="text-sm font-bold text-slate-800 mb-3">⭐ Icon Player 2</h3>
            <div className="flex items-start gap-4">
              <PhotoUploader
                label="Photo"
                photo={player2Photo}
                onPhotoChange={setPlayer2Photo}
                onRemove={() => setPlayer2Photo("")}
              />
              <div className="flex-1">
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Name</label>
                <input
                  type="text"
                  value={player2Name}
                  onChange={(e) => setPlayer2Name(e.target.value.toUpperCase())}
                  placeholder="e.g. PIYUSH"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 font-bold uppercase"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-4 border-t border-slate-100">
            <div className="flex gap-3">
              <button
                onClick={handleDownload}
                disabled={downloading || !teamName.trim()}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-emerald-500/25 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {downloading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Download className="w-5 h-5" />
                )}
                Download
              </button>
              <button
                onClick={handleSaveCard}
                disabled={saving || !teamName.trim()}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-blue-500/25 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Save className="w-5 h-5" />
                )}
                Save to Team
              </button>
            </div>
            <button
              onClick={handleReset}
              className="w-full px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-colors text-sm"
            >
              Reset Form
            </button>
          </div>
        </div>

        {/* RIGHT: Card Preview */}
        <div className="flex flex-col items-center">
          <p className="text-sm font-semibold text-slate-500 mb-4 uppercase tracking-wider">Live Preview</p>
          <TeamCard
            forwardedRef={cardRef}
            teamName={teamName}
            ownerName={ownerName}
            ownerPhoto={ownerPhoto}
            player1Name={player1Name}
            player1Photo={player1Photo}
            player2Name={player2Name}
            player2Photo={player2Photo}
            teamLogo={teamLogo}
          />
        </div>
      </div>
    </div>
  );
}
