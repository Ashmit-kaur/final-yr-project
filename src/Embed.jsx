export default function Embed({ data, layout }) {
  if (!data || data.length === 0) {
    return <div>No favourites found.</div>;
  }

  console.log(data);

  return (
    <div style={{ padding: "1rem", fontFamily: "Arial" }}>
      <h2>Favourite Testimonials ({layout} layout)</h2>
      {layout === "card" ? (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          {data.map((item, i) => (
            <div
              key={i}
              style={{
                width: "200px",
                border: "1px solid #ccc",
                padding: "1rem",
                borderRadius: "8px",
                background: "#fff",
              }}
            >
              <h4 className="text-black">{item.name}</h4>
              <p>{item.email}</p>
            </div>
          ))}
        </div>
      ) : (
        <ul>
          {data.map((item, i) => (
            <li key={i} style={{ marginBottom: "0.5rem" }}>
              <strong>{item.name}:</strong> {item.message}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
