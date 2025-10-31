// src/components/CardStat.jsx
export default function CardStat({ title, value, color = "#1976d2" }) {
  return (
    <div
      style={{
        background: "white",
        borderRadius: "10px",
        padding: "1rem",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        borderLeft: `6px solid ${color}`,
        flex: "1",
        minWidth: "150px",
      }}
    >
      <h3 style={{ margin: 0, fontSize: "1.1rem", color: "#333" }}>{title}</h3>
      <p style={{ fontSize: "1.5rem", fontWeight: "bold", marginTop: ".5rem" }}>{value}</p>
    </div>
  );
}
