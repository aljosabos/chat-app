import { useEffect, useState } from "react";
import "./App.scss";
import ChatIcon from "images/icons/Chat";

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
    <div className="text-lg text-red-500">
      <ul className="bg-red-300">
        {fruits?.map((fruit) => (
          <li key={fruit}>{fruit}</li>
        ))}
      </ul>

      <ChatIcon />

      <div className="bg-red-100 p-6 rounded-lg shadow-lg max-w-sm text-center">
        <h2 className="text-2xl font-bold text-gray-800">Tailwind Card</h2>
        <p className="text-gray-600 mt-3">
          This is a simple card layout built with Tailwind CSS.
        </p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
          Learn More
        </button>
      </div>
    </div>
  );
}

export default App;
