import React from "react";
import logoImg from "../assets/logo.jpg";

export default function TeamCard({
  teamName,
  ownerName,
  ownerPhoto,
  player1Name,
  player1Photo,
  player2Name,
  player2Photo,
  teamLogo,
  forwardedRef,
}) {
  return (
    <div
      ref={forwardedRef}
      style={{
        width: "420px",
        minHeight: "580px",
        background: "linear-gradient(160deg, #064e3b 0%, #043825 35%, #022315 75%, #01140c 100%)",
        borderRadius: "24px",
        overflow: "hidden",
        fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
        position: "relative",
        border: "3px solid transparent",
        boxShadow: "0 25px 50px -12px rgba(0,0,0,0.7), 0 0 40px rgba(16,185,129,0.25), inset 0 0 30px rgba(212,175,55,0.15)",
        backgroundClip: "padding-box",
      }}
    >
      {/* Card Gold & Emerald Outer Border */}
      <div
        style={{
          position: "absolute",
          inset: "-3px",
          borderRadius: "24px",
          background: "linear-gradient(135deg, #ffe599 0%, #d4af37 35%, #10b981 70%, #d4af37 100%)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      {/* Card Inner Background - Rich Deep Cricket Turf Green Gradient */}
      <div
        style={{
          position: "absolute",
          inset: "0",
          borderRadius: "21px",
          background: "linear-gradient(165deg, #064e3b 0%, #053b28 25%, #022617 60%, #01140c 100%)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* Cricket Stadium Turf Lawn Stripes (Subtle grass striping pattern) */}
      <div
        style={{
          position: "absolute",
          inset: "0",
          borderRadius: "21px",
          backgroundImage: "repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.02) 0px, rgba(255, 255, 255, 0.02) 28px, transparent 28px, transparent 56px)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* Cricket Pitch Ambient Radial Texture */}
      <div
        style={{
          position: "absolute",
          inset: "0",
          borderRadius: "21px",
          backgroundImage: "radial-gradient(ellipse at 50% 50%, rgba(16, 185, 129, 0.12) 0%, transparent 80%)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* Stadium Floodlights Glow (Top Center, Left & Right) */}
      <div
        style={{
          position: "absolute",
          top: "-40px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "320px",
          height: "180px",
          background: "radial-gradient(ellipse at center, rgba(52, 211, 153, 0.3) 0%, rgba(16, 185, 129, 0.1) 40%, transparent 70%)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "-50px",
          left: "-50px",
          width: "220px",
          height: "220px",
          background: "radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(52,211,153,0.15) 35%, transparent 70%)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "-50px",
          right: "-50px",
          width: "220px",
          height: "220px",
          background: "radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(52,211,153,0.15) 35%, transparent 70%)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* Gold Top Accent Line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "5%",
          width: "90%",
          height: "4px",
          background: "linear-gradient(90deg, transparent, #ffe599, #d4af37, #ffe599, transparent)",
          zIndex: 2,
        }}
      />

      {/* Cricket Stumps with Bails - Left */}
      <svg style={{ position: "absolute", left: "10px", bottom: "160px", opacity: 0.12, pointerEvents: "none" }} width="50" height="120" viewBox="0 0 50 120">
        <rect x="8" y="0" width="5" height="110" rx="2" fill="#f5d98a" />
        <rect x="22" y="0" width="5" height="110" rx="2" fill="#f5d98a" />
        <rect x="36" y="0" width="5" height="110" rx="2" fill="#f5d98a" />
        <rect x="5" y="12" width="40" height="5" rx="2" fill="#f5d98a" />
        <rect x="5" y="28" width="40" height="5" rx="2" fill="#f5d98a" />
      </svg>

      {/* Cricket Stumps with Bails - Right */}
      <svg style={{ position: "absolute", right: "10px", bottom: "160px", opacity: 0.12, pointerEvents: "none" }} width="50" height="120" viewBox="0 0 50 120">
        <rect x="8" y="0" width="5" height="110" rx="2" fill="#f5d98a" />
        <rect x="22" y="0" width="5" height="110" rx="2" fill="#f5d98a" />
        <rect x="36" y="0" width="5" height="110" rx="2" fill="#f5d98a" />
        <rect x="5" y="12" width="40" height="5" rx="2" fill="#f5d98a" />
        <rect x="5" y="28" width="40" height="5" rx="2" fill="#f5d98a" />
      </svg>

      {/* Cricket Ball with Seam - Top Right */}
      <svg style={{ position: "absolute", right: "16px", top: "22px", opacity: 0.15, pointerEvents: "none" }} width="44" height="44" viewBox="0 0 40 40">
        <circle cx="20" cy="20" r="18" fill="none" stroke="#f5d98a" strokeWidth="2" />
        <path d="M8 14 Q20 20 8 28" fill="none" stroke="#f5d98a" strokeWidth="1.5" />
        <path d="M32 14 Q20 20 32 28" fill="none" stroke="#f5d98a" strokeWidth="1.5" />
      </svg>

      {/* Cricket Bat - Bottom Left */}
      <svg style={{ position: "absolute", left: "14px", bottom: "25px", opacity: 0.1, pointerEvents: "none", transform: "rotate(-25deg)" }} width="36" height="110" viewBox="0 0 30 100">
        <rect x="11" y="0" width="8" height="35" rx="4" fill="#f5d98a" />
        <rect x="6" y="33" width="18" height="55" rx="4" fill="#f5d98a" />
        <rect x="9" y="86" width="12" height="14" rx="3" fill="#f5d98a" />
      </svg>

      {/* Cricket Pitch Center Ring & Stars */}
      <svg style={{ position: "absolute", left: "50%", top: "46%", transform: "translate(-50%, -50%)", opacity: 0.08, pointerEvents: "none" }} width="320" height="320" viewBox="0 0 300 300">
        <circle cx="150" cy="150" r="110" fill="none" stroke="#f5d98a" strokeWidth="1.5" strokeDasharray="8 6" />
        <circle cx="150" cy="150" r="140" fill="none" stroke="#34d399" strokeWidth="0.8" strokeDasharray="4 8" />
        <circle cx="150" cy="150" r="75" fill="none" stroke="#f5d98a" strokeWidth="0.8" />
      </svg>

      {/* Bottom Emerald & Gold Glow */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "100px", background: "radial-gradient(ellipse at 50% 100%, rgba(16,185,129,0.25) 0%, rgba(212,175,55,0.1) 40%, transparent 70%)", pointerEvents: "none" }} />

      {/* Top Branding */}
      <div style={{ display: "flex", alignItems: "center", padding: "24px 20px 16px", position: "relative", zIndex: 2, gap: "14px" }}>
        {/* DMCC Logo on Left */}
        <div
          style={{
            width: "70px",
            height: "70px",
            flexShrink: 0,
            overflow: "hidden",
            filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.4))",
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
              color: "#ffe599",
              letterSpacing: "2px",
              lineHeight: "1",
              textShadow: "0 2px 6px rgba(0,0,0,0.9), 0 0 10px rgba(212,175,55,0.4)",
              whiteSpace: "nowrap",
            }}
          >
            DMCC & JSR FIGHTER
          </div>
          <div
            style={{
              fontSize: "13px",
              fontFamily: "'Oswald', sans-serif",
              fontWeight: "700",
              color: "#34d399",
              letterSpacing: "2.5px",
              textTransform: "uppercase",
              marginTop: "2px",
              lineHeight: "1.1",
              textShadow: "0 2px 4px rgba(0,0,0,0.9), 0 0 8px rgba(16,185,129,0.3)",
              whiteSpace: "nowrap",
            }}
          >
            JHARKHAND PREMIER LEAGUE
          </div>
          <div
            style={{
              fontSize: "10.5px",
              fontFamily: "'Oswald', sans-serif",
              fontWeight: "700",
              color: "#fde047",
              letterSpacing: "0.8px",
              textTransform: "uppercase",
              marginTop: "3px",
              lineHeight: "1.2",
              textShadow: "0 1px 3px rgba(0,0,0,0.9)",
              whiteSpace: "nowrap",
            }}
          >
            BIGGEST SHORT TO LONG LEAGUE CRICKET TOURNAMENT
          </div>
          <div
            style={{
              fontSize: "10px",
              fontFamily: "'Oswald', sans-serif",
              fontWeight: "600",
              color: "#a7f3d0",
              letterSpacing: "3.5px",
              marginTop: "3px",
              textShadow: "0 1px 3px rgba(0,0,0,0.8)",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
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
            filter: "drop-shadow(0 6px 14px rgba(0,0,0,0.5))",
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
            background: "linear-gradient(180deg, #fff3c4, #e6be44, #c99f28)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "5px",
            lineHeight: "1.1",
            filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.7))",
            whiteSpace: "nowrap",
          }}
        >
          {teamName || "TEAM NAME"}
        </div>
        <div
          style={{
            fontSize: "12px",
            fontFamily: "'Oswald', sans-serif",
            fontWeight: "600",
            color: "#6ee7b7",
            letterSpacing: "8px",
            marginTop: "4px",
            textShadow: "0 1px 3px rgba(0,0,0,0.5)",
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
        <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.6))" }} />
        <svg width="14" height="14" viewBox="0 0 14 14" style={{ flexShrink: 0 }}>
          <circle cx="7" cy="7" r="6" fill="none" stroke="#f5d98a" strokeWidth="1" opacity="0.8" />
          <path d="M3 5 Q7 7 3 9" fill="none" stroke="#f5d98a" strokeWidth="0.8" opacity="0.8" />
          <path d="M11 5 Q7 7 11 9" fill="none" stroke="#f5d98a" strokeWidth="0.8" opacity="0.8" />
        </svg>
        <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, rgba(212,175,55,0.6), transparent)" }} />
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
        <PersonSlot label="OWNER" name={ownerName} photo={ownerPhoto} />
        <PersonSlot label="ICON PLAYER 1" name={player1Name} photo={player1Photo} />
        <PersonSlot label="ICON PLAYER 2" name={player2Name} photo={player2Photo} />
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
          aspectRatio: "3/4",
          clipPath: "polygon(10% 0%, 90% 0%, 100% 10%, 100% 100%, 0% 100%, 0% 10%)",
          background: "linear-gradient(135deg, #ffe599, #d4af37, #10b981)",
          padding: "2px",
          position: "relative",
          marginBottom: "4px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.5)",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            background: "linear-gradient(150deg, #021e11, #06381e, #01140c)",
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
            <div style={{ color: "#34d399", opacity: 0.35, zIndex: 1 }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
          )}
        </div>
      </div>
      
      {/* Label & Name */}
      <div
        style={{
          background: "linear-gradient(180deg, #ffe599, #d4af37)",
          padding: "1px 6px",
          borderRadius: "4px",
          transform: "translateY(-10px)",
          zIndex: 3,
          boxShadow: "0 2px 4px rgba(0,0,0,0.6)",
          width: "85%",
        }}
      >
        <div style={{ fontSize: "8px", fontWeight: "700", color: "#062b19", letterSpacing: "1px", fontFamily: "'Inter', sans-serif" }}>
          {label}
        </div>
      </div>
      <div style={{ fontSize: "14px", fontWeight: "800", color: "#fff", textTransform: "uppercase", marginTop: "-6px", textShadow: "0 2px 4px rgba(0,0,0,0.9)", fontFamily: "'Oswald', sans-serif", letterSpacing: "1px", width: "100%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
        {name || "NAME"}
      </div>
    </div>
  );
}
