export default function TableData({ data }) {
  if (!data.length) return <p>No hay datos.</p>;
  return (
    <table className="data-table">
      <thead>
        <tr>{Object.keys(data[0]).map((key) => <th key={key}>{key}</th>)}</tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i}>
            {Object.values(row).map((val, j) => <td key={j}>{String(val)}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
