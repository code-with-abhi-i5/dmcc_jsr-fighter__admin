export function exportToCSV(registrations, filename = "dmcc_players.csv") {
  // Define columns
  const headers = [
    "Registration ID",
    "Player Name",
    "Phone Number",
    "Status",
    "Team",
    "Jersey Size",
    "Jersey Number",
    "UTR / Transaction ID",
    "Address",
    "Admin Mark",
    "Registration Date"
  ];

  // Map data to rows
  const rows = registrations.map(reg => [
    reg.registrationId || "",
    reg.playerName || "",
    reg.phoneNumber || "",
    reg.status || "",
    reg.team || "Unassigned",
    reg.jerseySize || "",
    reg.jerseyNumber || "",
    reg.utr || "",
    (reg.address || "").replace(/,/g, " "), // avoid CSV separator conflicts
    (reg.adminMark || "").replace(/,/g, " "),
    reg.createdAt ? new Date(reg.createdAt).toLocaleString("en-IN") : ""
  ]);

  // Build CSV content
  const csvContent = [
    headers.join(","),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(","))
  ].join("\n");

  // Create Blob and trigger download
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
