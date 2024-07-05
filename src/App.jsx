import { useState } from "react";
import Quote from "./components/Quote";

function App() {
  const [color, setColor] = useState("#646cff");

  document.body.style.background = color;

  const randomColorUtitlity = (length) => {
    return Math.floor(Math.random() * length);
  };

  const handleCreateRandomColor = () => {
    // EX: #947656
    const hex = [1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
    let hexColor = "#";
    for (let i = 0; i < 6; i++) {
      hexColor += hex[randomColorUtitlity(hex.length)];
    }
    setColor(hexColor);
  };

  return (
    <section className="quote_container">
      <Quote
        color={color}
        handleClick={handleCreateRandomColor}
        url={"https://dummyjson.com/quotes"}
        limit="30"
        skip="0"
      />
      <a
        href="https://github.com/mrvin100"
        target="_blank"
        className="heading link"
      >
        by mrvin100
      </a>
    </section>
  );
}

export default App;
