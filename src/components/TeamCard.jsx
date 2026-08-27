import React from "react";
import logoImg from "../assets/logo.jpg";
import stadiumBg from "../assets/stadium_bg.jpg";

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
          opacity: 0.65,
          pointerEvents: "none",
          borderRadius: "21px",
          overflow: "hidden",
          mixBlendMode: "screen",
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
            <div style={{ color: "#d4af37", opacity: 0.3, zIndex: 1 }}>
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
          background: "linear-gradient(180deg, #f5d98a, #d4af37)",
          padding: "1px 6px",
          borderRadius: "4px",
          transform: "translateY(-10px)",
          zIndex: 3,
          boxShadow: "0 2px 4px rgba(0,0,0,0.5)",
          width: "85%",
        }}
      >
        <div style={{ fontSize: "8px", fontWeight: "700", color: "#111", letterSpacing: "1px", fontFamily: "'Inter', sans-serif" }}>
          {label}
        </div>
      </div>
      <div style={{ fontSize: "14px", fontWeight: "800", color: "#fff", textTransform: "uppercase", marginTop: "-6px", textShadow: "0 1px 2px rgba(0,0,0,0.8)", fontFamily: "'Oswald', sans-serif", letterSpacing: "1px", width: "100%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
        {name || "NAME"}
      </div>
    </div>
  );
}
