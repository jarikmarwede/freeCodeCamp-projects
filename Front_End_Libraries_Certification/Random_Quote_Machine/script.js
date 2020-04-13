function retrieveQuote() {
  // fetch can not be used because the API sets cookies which get blocked by fetch automatically
  const request = new XMLHttpRequest();
  request.addEventListener("load", () => {
    parseNewQuote(JSON.parse(request.response)[0]);
  });
  request.open("GET", "https://quotesondesign.com/wp-json/wp/v2/posts/?orderby=rand&" + (new Date()).getTime());
  request.send();
}

function getNewQuote() {
  toggleQuoteVisibility();
  retrieveQuote();
}

function parseNewQuote(quote) {
  const quoteElement = document.getElementById("quote-text");
  const authorElement = document.getElementById("quote-author");
  const sourceElement = document.getElementById("quote-source");

  quoteElement.innerHTML = quote["content"]["rendered"];
  authorElement.innerHTML = "- " + quote["title"]["rendered"];
  if (quote["meta"] !== undefined && quote["meta"]["Source"] !== undefined) {
    sourceElement.innerHTML = "Source: " + quote["custom_meta"]["Source"];
  } else {
    sourceElement.innerHTML = "";
  }
  document.getElementById("twitter-btn").href = encodeURI("https://twitter.com/intent/tweet?text=" + quoteElement.textContent + " " + authorElement.textContent);
  toggleQuoteVisibility();
}

function toggleQuoteVisibility() {
  const quoteElement = document.getElementById("quote-text");
  const visible = quoteElement.style.display !== "none";

  quoteElement.style.display = visible ? "none" : "block";
  document.getElementById("quote-author").style.display = visible ? "none" : "block";
  document.getElementById("quote-source").style.display = visible ? "none" : "block";
}

document.addEventListener("DOMContentLoaded", () => {
  getNewQuote();
  document.getElementById("random-btn").addEventListener("click", getNewQuote);
});
