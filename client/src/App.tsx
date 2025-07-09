import { useEffect, useState } from "react";
import "./App.css";
import ChatIcon from "@icons/Chat";

function App() {
  const [fruits, setFruits] = useState([]);

  useEffect(() => {
    fetch(`/api/fruits`).then((response) =>
      response.json().then((data) => {
        if (data) setFruits(data.fruits);
      })
    );
  }, []);

  return (
    <div>
      <ul>
        {fruits?.map((fruit) => (
          <li key={fruit}>{fruit}</li>
        ))}
      </ul>

      <ChatIcon />
    </div>
  );
}

export default App;
