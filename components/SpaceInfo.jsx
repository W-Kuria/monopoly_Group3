import { useEffect, useState } from "react";

function SpaceInfo() {
  const [spaces, setSpaces] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/spaces")
      .then((res) => res.json())
      .then(setSpaces)
      .catch((err) => {
        console.error("Error fetching spaces:", err);
      });
  }, []);

  if (!spaces) return <p>Loading...</p>;

  return (
    <div>
      <h2>Board Spaces</h2>
      <ul>
        {spaces.map((space) => (
          <li key={space.id}>
            <strong>{space.name}</strong> — {space.type}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SpaceInfo;
