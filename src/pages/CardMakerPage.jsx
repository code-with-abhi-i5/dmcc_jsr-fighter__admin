import React, { useState, useRef, useCallback } from "react";
import { Download, Upload, ImagePlus, Trash2, Loader2 } from "lucide-react";
import { toPng } from "html-to-image";
import toast from "react-hot-toast";
import logoImg from "../assets/logo.jpg";
import stadiumBg from "../assets/stadium_bg.jpg";

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

  const handleDownload = useCallback(async () => {
    if (!cardRef.current) return;
    if (!teamName.trim()) {
      toast.error("Please enter a team name.");
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

  const handleReset = () => {
    setTeamName("");
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
            <input
              type="text"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value.toUpperCase())}
              placeholder="e.g. BATTING RAJA"
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 font-bold uppercase tracking-wide"
            />
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

          <div className="flex gap-3 pt-4 border-t border-slate-100">
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
              Download Card
            </button>
            <button
              onClick={handleReset}
              className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-colors text-sm"
            >
              Reset
            </button>
          </div>
        </div>

        {/* RIGHT: Card Preview */}
        <div className="flex flex-col items-center">
          <p className="text-sm font-semibold text-slate-500 mb-4 uppercase tracking-wider">Live Preview</p>
          <div
            ref={cardRef}
            style={{
              width: "420px",
              minHeight: "580px",
              background: "linear-gradient(145deg, #050505 0%, #111116 40%, #050505 100%)",
              borderRadius: "24px",
              overflow: "hidden",
              fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
              position: "relative",
              border: "3px solid transparent",
              boxShadow: "0 20px 40px rgba(0,0,0,0.6), inset 0 0 40px rgba(212,175,55,0.15)",
              backgroundClip: "padding-box",
            }}
          >
            {/* Card Gold Border Gradient (using pseudo-element equivalent via absolute div) */}
            <div
              style={{
                position: "absolute",
                inset: "-3px",
                borderRadius: "24px",
                background: "linear-gradient(135deg, #f5d98a, #d4af37, #8a6d1c, #f5d98a)",
                zIndex: 0,
                pointerEvents: "none",
              }}
            />
            {/* Card Inner Background Cover to hide border inside */}
            <div
              style={{
                position: "absolute",
                inset: "0",
                borderRadius: "21px",
                background: "linear-gradient(145deg, #050505 0%, #0a0a0f 40%, #050505 100%)",
                zIndex: 1,
                pointerEvents: "none",
              }}
            />

            {/* Premium Stadium Photo Background */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                zIndex: 1,
                opacity: 0.65, // Increased opacity to make it lighter/more visible
                pointerEvents: "none",
                borderRadius: "21px",
                overflow: "hidden",
                mixBlendMode: "screen", // Screen or overlay makes the lights pop better
              }}
            >
              <img
                src={stadiumBg}
                alt="Stadium Background"
                style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(1.2) contrast(1.1)" }}
              />
            </div>

            {/* Stadium Floodlights (Top Left & Top Right) */}
            <div style={{ position: "absolute", top: "-50px", left: "-50px", width: "200px", height: "200px", background: "radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(212,175,55,0.05) 40%, transparent 70%)", zIndex: 1, pointerEvents: "none" }} />
            <div style={{ position: "absolute", top: "-50px", right: "-50px", width: "200px", height: "200px", background: "radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(212,175,55,0.05) 40%, transparent 70%)", zIndex: 1, pointerEvents: "none" }} />

            {/* Gold Top Accent Line */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: "5%",
                width: "90%",
                height: "4px",
                background: "linear-gradient(90deg, transparent, #f5d98a, #d4af37, #f5d98a, transparent)",
                zIndex: 2,
              }}
            />

            {/* Cricket Stumps - Left */}
            <svg style={{ position: "absolute", left: "8px", bottom: "160px", opacity: 0.06, pointerEvents: "none" }} width="50" height="120" viewBox="0 0 50 120">
              <rect x="8" y="0" width="5" height="110" rx="2" fill="#d4af37" />
              <rect x="22" y="0" width="5" height="110" rx="2" fill="#d4af37" />
              <rect x="36" y="0" width="5" height="110" rx="2" fill="#d4af37" />
              <rect x="5" y="15" width="40" height="4" rx="2" fill="#d4af37" />
              <rect x="5" y="30" width="40" height="4" rx="2" fill="#d4af37" />
            </svg>

            {/* Cricket Stumps - Right */}
            <svg style={{ position: "absolute", right: "8px", bottom: "160px", opacity: 0.06, pointerEvents: "none" }} width="50" height="120" viewBox="0 0 50 120">
              <rect x="8" y="0" width="5" height="110" rx="2" fill="#d4af37" />
              <rect x="22" y="0" width="5" height="110" rx="2" fill="#d4af37" />
              <rect x="36" y="0" width="5" height="110" rx="2" fill="#d4af37" />
              <rect x="5" y="15" width="40" height="4" rx="2" fill="#d4af37" />
              <rect x="5" y="30" width="40" height="4" rx="2" fill="#d4af37" />
            </svg>

            {/* Cricket Ball - Top Right */}
            <svg style={{ position: "absolute", right: "15px", top: "20px", opacity: 0.07, pointerEvents: "none" }} width="40" height="40" viewBox="0 0 40 40">
              <circle cx="20" cy="20" r="18" fill="none" stroke="#d4af37" strokeWidth="2" />
              <path d="M8 14 Q20 20 8 28" fill="none" stroke="#d4af37" strokeWidth="1.5" />
              <path d="M32 14 Q20 20 32 28" fill="none" stroke="#d4af37" strokeWidth="1.5" />
            </svg>

            {/* Cricket Bat - Bottom Left */}
            <svg style={{ position: "absolute", left: "15px", bottom: "30px", opacity: 0.05, pointerEvents: "none", transform: "rotate(-30deg)" }} width="30" height="100" viewBox="0 0 30 100">
              <rect x="11" y="0" width="8" height="35" rx="4" fill="#d4af37" />
              <rect x="6" y="33" width="18" height="55" rx="4" fill="#d4af37" />
              <rect x="9" y="86" width="12" height="14" rx="3" fill="#d4af37" />
            </svg>

            {/* Star ring around team logo area */}
            <svg style={{ position: "absolute", left: "50%", top: "48%", transform: "translate(-50%, -50%)", opacity: 0.04, pointerEvents: "none" }} width="300" height="300" viewBox="0 0 300 300">
              <polygon points="150,20 160,60 200,60 168,82 180,120 150,98 120,120 132,82 100,60 140,60" fill="#d4af37" />
              <circle cx="150" cy="150" r="100" fill="none" stroke="#d4af37" strokeWidth="1" strokeDasharray="8 6" />
              <circle cx="150" cy="150" r="130" fill="none" stroke="#d4af37" strokeWidth="0.5" strokeDasharray="4 8" />
            </svg>

            {/* Bottom gold glow */}
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "80px", background: "radial-gradient(ellipse at 50% 100%, rgba(212,175,55,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />

            {/* Top Branding */}
            <div style={{ display: "flex", alignItems: "center", padding: "24px 20px 16px", position: "relative", zIndex: 2, gap: "14px" }}>
              {/* DMCC Logo on Left */}
              <div
                style={{
                  width: "70px",
                  height: "70px",
                  flexShrink: 0,
                  overflow: "hidden",
                }}
              >
                <img
                  src={logoImg}
                  alt="DMCC Logo"
                  style={{ width: "100%", height: "100%", objectFit: "contain" }}
                />
              </div>

              {/* Text on Right */}
              <div style={{ textAlign: "left" }}>
                <div
                  style={{
                    fontSize: "28px",
                    fontFamily: "'Teko', sans-serif",
                    fontWeight: "700",
                    background: "linear-gradient(180deg, #f5d98a, #d4af37, #b8962e)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    letterSpacing: "2px",
                    lineHeight: "1",
                    filter: "drop-shadow(0 2px 4px rgba(212,175,55,0.3))",
                    whiteSpace: "nowrap",
                  }}
                >
                  DMCC & JSR FIGHTER
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    fontFamily: "'Oswald', sans-serif",
                    fontWeight: "500",
                    color: "#a0a0a0",
                    letterSpacing: "5px",
                    marginTop: "6px",
                  }}
                >
                  SEASON 2 • YEAR 2026
                </div>
              </div>
            </div>

            {/* Team Badge / Logo */}
            <div style={{ display: "flex", justifyContent: "center", padding: "0 20px 10px", position: "relative", zIndex: 2 }}>
              <div
                style={{
                  width: "130px",
                  height: "130px",
                  overflow: "hidden",
                  background: "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={teamLogo || logoImg}
                  alt="Logo"
                  style={{ width: "100%", height: "100%", objectFit: "contain" }}
                />
              </div>
            </div>

            {/* Team Name Banner */}
            <div style={{ textAlign: "center", padding: "10px 20px 4px", position: "relative", zIndex: 2 }}>
              <div
                style={{
                  fontSize: "34px",
                  fontFamily: "'Teko', sans-serif",
                  background: "linear-gradient(180deg, #f5d98a, #d4af37)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  letterSpacing: "5px",
                  lineHeight: "1.1",
                  filter: "drop-shadow(0 2px 6px rgba(212,175,55,0.4))",
                  whiteSpace: "nowrap",
                }}
              >
                {teamName || "TEAM NAME"}
              </div>
              <div
                style={{
                  fontSize: "12px",
                  fontFamily: "'Oswald', sans-serif",
                  fontWeight: "500",
                  color: "#d4af37",
                  letterSpacing: "8px",
                  marginTop: "4px",
                  opacity: 0.7,
                }}
              >
                CRICKET CLUB
              </div>
            </div>

            {/* Separator with cricket ball */}
            <div
              style={{
                margin: "16px auto",
                width: "80%",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.4))" }} />
              <svg width="14" height="14" viewBox="0 0 14 14" style={{ flexShrink: 0 }}>
                <circle cx="7" cy="7" r="6" fill="none" stroke="#d4af37" strokeWidth="1" opacity="0.5" />
                <path d="M3 5 Q7 7 3 9" fill="none" stroke="#d4af37" strokeWidth="0.8" opacity="0.5" />
                <path d="M11 5 Q7 7 11 9" fill="none" stroke="#d4af37" strokeWidth="0.8" opacity="0.5" />
              </svg>
              <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, rgba(212,175,55,0.4), transparent)" }} />
            </div>

            {/* Player Cards Row */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                alignItems: "start",
                gap: "10px",
                padding: "0 16px 28px",
                position: "relative",
                zIndex: 2,
              }}
            >
              {/* Owner */}
              <PersonSlot
                label="OWNER"
                name={ownerName}
                photo={ownerPhoto}
              />
              {/* Icon Player 1 */}
              <PersonSlot
                label="ICON PLAYER 1"
                name={player1Name}
                photo={player1Photo}
              />
              {/* Icon Player 2 */}
              <PersonSlot
                label="ICON PLAYER 2"
                name={player2Name}
                photo={player2Photo}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PersonSlot({ label, name, photo }) {
  return (
    <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", position: "relative", zIndex: 2 }}>
      {/* Photo Frame (Hex/Chamfered Trading Card look) */}
      <div
        style={{
          width: "100%",
          aspectRatio: "3/4", // Makes the image taller like a real player portrait
          clipPath: "polygon(10% 0%, 90% 0%, 100% 10%, 100% 100%, 0% 100%, 0% 10%)", // Less cut-off
          background: "linear-gradient(135deg, #f5d98a, #b8962e, #8a6d1c)",
          padding: "2px", // Acts as a gold border using the background
          position: "relative",
          marginBottom: "4px",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            background: "linear-gradient(145deg, #111, #222)",
            clipPath: "polygon(10% 0%, 90% 0%, 100% 10%, 100% 100%, 0% 100%, 0% 10%)",
            overflow: "hidden",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {photo ? (
            <img
              src={photo}
              alt={name || label}
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 1 }}
            />
          ) : (
            <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" opacity="0.5">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
          )}

          {/* Inner Vignette / Shadow */}
          <div style={{ position: "absolute", inset: 0, boxShadow: "inset 0 0 8px rgba(0,0,0,0.4)", zIndex: 2, pointerEvents: "none" }} />
        </div>
      </div>

      {/* Ribbon / Name Banner */}
      <div
        style={{
          width: "110%", // Extends slightly past the photo
          background: "linear-gradient(90deg, #b8962e, #f5d98a, #b8962e)",
          padding: "2px 0",
          clipPath: "polygon(5% 0, 95% 0, 100% 50%, 95% 100%, 5% 100%, 0% 50%)",
          position: "relative",
          zIndex: 3,
          marginTop: "-15px", // Overlaps the photo bottom
          boxShadow: "0 4px 10px rgba(0,0,0,0.8)",
        }}
      >
        <div
          style={{
            background: "#0a0a0f",
            margin: "1px", // Inner dark background
            clipPath: "polygon(5% 0, 95% 0, 100% 50%, 95% 100%, 5% 100%, 0% 50%)",
            padding: "4px 2px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Label (OWNER, ICON PLAYER 1) */}
          <div
            style={{
              fontSize: "7px",
              fontFamily: "'Inter', sans-serif",
              fontWeight: "900",
              color: "#d4af37",
              letterSpacing: "1px",
              textTransform: "uppercase",
              lineHeight: "1",
            }}
          >
            {label}
          </div>

          {/* Player Name */}
          <div
            style={{
              fontSize: "14px",
              fontFamily: "'Teko', sans-serif",
              fontWeight: "700",
              color: "#fff",
              letterSpacing: "1px",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              width: "100%",
              marginTop: "1px",
              lineHeight: "1.1",
              textShadow: "0 1px 3px rgba(0,0,0,1)",
            }}
          >
            {name || "NAME"}
          </div>
        </div>
      </div>
    </div>
  );
}
