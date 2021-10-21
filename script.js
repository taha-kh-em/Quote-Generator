//* DOM Queries
const quoteContainer = document.querySelector(".quote-container");
const quoteText = document.querySelector("#quote");
const authorText = document.querySelector(".author");
const newQuoteBtn = document.querySelector("#new-quote");
const tweetQuoteBtn = document.querySelector(".twitter-button");
const loader = document.querySelector(".loader");

const randomIndex = (length) => {
  return Math.floor(Math.random() * length);
};

// * Set Quote Text and Author
const updateUI = (data) => {
  const { text, author } = data[randomIndex(data.length)];

  quoteText.textContent = text;
  authorText.textContent = author || "Unknown";

  if (text.length > 70) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
};

const showLoadingSpinner = () => {
  loader.hidden = false;
  quoteContainer.hidden = true;
};

const removeLoadingSpinner = () => {
  loader.hidden = true;
  quoteContainer.hidden = false;
};

const getQuote = async () => {
  showLoadingSpinner();

  try {
    const apiUrl = "https://type.fit/api/quotes";
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err); //! Show Error Message
  } finally {
    removeLoadingSpinner();
  }
};

const tweetQuote = () => {
  const quote = quoteText.innerText;
  const author = authorText.innerText;

  open(`https://twitter.com/intent/tweet?text=${quote} - ${author}`, "_blank");
};

// * Initial Loading...
getQuote().then((data) => updateUI(data));

// * Event Listeners
newQuoteBtn.addEventListener("click", () =>
  getQuote().then((data) => updateUI(data))
);

tweetQuoteBtn.addEventListener("click", tweetQuote);
