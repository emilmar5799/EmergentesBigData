export default function CardStat({ title, value, color }) {
  return (
    <div className="card-stat" style={{ borderLeft: `5px solid ${color}` }}>
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );
}
