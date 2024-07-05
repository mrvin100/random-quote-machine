import { useEffect, useState } from "react";

export default function Quote({
  color,
  handleClick,
  url,
  limit = 10,
  skip = 0,
}) {
  const [quotes, setQuotes] = useState([]);
  const [quote, setQuote] = useState({
    quote: "We must balance conspicuous consumption with conscious capitalism.",
    author: "Norman Vincent Peale",
  });
  const [loading, setLoading] = useState(false);

  async function fetchQuotes(getUrl) {
    try {
      setLoading(true);
      const response = await fetch(`${getUrl}?limit=${limit}&skip=${skip}`);
      const data = await response.json();
      if (data) {
        setQuotes(data.quotes);
        setLoading(false);
      }
    } catch (e) {
      console.log(e.message);
      setLoading(false);
    }
  }

  useEffect(() => {
    if (url !== "") fetchQuotes(url);
  }, [url]);

  if (loading) {
    return <div>Loading data! Please wait</div>;
  }

  const handleRandomize = () => {
    handleClick();
    const randomNumber = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomNumber]);
  };
  return (
    <div className="quote">
      <p>
        <i className="bx bxs-quote-left" style={{ color: `${color}` }}></i>
        <span>
          {quote && quote?.quote
            ? quote.quote
            : "We must balance conspicuous consumption with conscious capitalism."}
        </span>
      </p>
      <h3 className="heading author" style={{ color: `${color}` }}>
        -
        <span>
          {quote && quote?.author ? quote.author : "Norman Vincent Peale"}
        </span>
      </h3>
      <div>
        <div className="icons">
          <a
            href={`https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=${quote.quote}&author=${quote.author}`}
            target="_blank"
            className="icon bx bxl-twitter"
            style={{ color: `${color}` }}
            title="Tweet this quote!"
          ></a>
          <a
            href={`https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=${quote.author}&content=${quote.quote}`}
            target="_blank"
            className="icon bx bxl-tumblr"
            style={{ color: `${color}` }}
            title="Post this quote on tumblr!"
          ></a>
        </div>
        <button
          className="btn"
          onClick={handleRandomize}
          style={{ background: `${color}` }}
        >
          New quote
        </button>
      </div>
    </div>
  );
}
