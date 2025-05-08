import React from "react";

const Embed = () => {
  const favourites=window.__FAVOURITES__ || []
  console.log("Embed.jsx favourites",favourites)
  return (
    <div style={{ padding: "1rem", fontFamily: "Arial, sans-serif" }}>
      {favourites.map((item, i) => (
        <div
          key={i}
          style={{
            background: "#fff",
            marginBottom: "1rem",
            padding: "1rem",
            borderRadius: "8px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          }}
        >
          <h4>{item.name}</h4>
          <p>{item.reviewText}</p>
          {item.reviewType === "VIDEO" ? (
            <video src={item.videoUrl} controls width="100%" />
          ) : (
            item.photo && <img src={item.photo} alt={item.name} width="100" />
          )}
        </div>
      ))}
    </div>
  );
};

export default Embed;
