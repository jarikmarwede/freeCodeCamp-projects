async function retrieveQuote() {
  const response = await fetch("https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1", {cache: "no-store"});
  const reponseData = await response.json();
  return reponseData;
}

async function getNewQuote() {
  toggleQuoteVisibility();
  const responseData = await retrieveQuote();
  const quote = responseData[0];
  const quoteElement = document.getElementById("quote-text");
  const authorElement = document.getElementById("quote-author");
  const sourceElement = document.getElementById("quote-source");

  quoteElement.innerHTML = quote.content;
  authorElement.innerHTML = "- " + quote.title;
  if (quote.custom_meta !== undefined && quote.custom_meta.Source !== undefined) {
    sourceElement.innerHTML = "Source: " + quote.custom_meta.Source;
  } else {
    sourceElement.innerHTML = "";
  }
  var twitter_url = encodeURI("https://twitter.com/intent/tweet?text=" + quoteElement.textContent + " " + authorElement.textContent);
  document.getElementById("twitter-btn").href = twitter_url;
  toggleQuoteVisibility();
}

function toggleQuoteVisibility() {
  const quoteElement = document.getElementById("quote-text");
  const authorElement = document.getElementById("quote-author");
  const sourceElement = document.getElementById("quote-source");

  if (quoteElement.style.display == "none") {
    quoteElement.style.display = "block";
    authorElement.style.display = "block";
    sourceElement.style.display = "block";
  } else {
    quoteElement.style.display = "none";
    authorElement.style.display = "none";
    sourceElement.style.display = "none";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  getNewQuote();
  document.getElementById("random-btn").addEventListener("click", getNewQuote);
});
