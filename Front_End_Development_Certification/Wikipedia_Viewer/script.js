import "./search-result-card/search-result-card.js";

let pageLimit = 10;

function newSearch() {
  pageLimit = 10;
  wikipediaSearch(document.getElementById("search-input").value).then();
}

async function wikipediaSearch(string, pageLimit=10) {
  showSearchResults(await requestSearch(string, pageLimit));
}

async function requestSearch(string, pageLimit) {
  const requestUrl = "https://en.wikipedia.org/w/api.php?" + ["origin=*", "format=json", "action=query", "list=search", "srsearch=" + encodeURI(string), "srlimit=" + pageLimit].join("&");
  const response = await fetch(requestUrl);
  return response.json();
}

function showSearchResults(json) {
  document.getElementById("search-results-container").innerHTML = "";
  const pages = json["query"]["search"];
  const totalHits = json["query"]["searchinfo"]["totalhits"];
  document.getElementById("search-results-container").innerHTML += "<p class=\"total-matches\">Total matches: " + totalHits + "</p>";
  for (const page of pages) {
    const url = "https://en.wikipedia.org/?curid=" + page["pageid"];
    addSearchResult(page["title"], page["snippet"], url);
  }
  if (pageLimit < 50) {
    document.getElementById("search-results-container").innerHTML += "<button class=\"load-more-btn\" id=\"load-more-btn\">Load more</button>";
    document.getElementById("load-more-btn").addEventListener("click", () => {
      if (pageLimit <= 40) {
        pageLimit += 10;
      }
      wikipediaSearch(document.getElementById("search-input").value, pageLimit).then();
    });
  }
}

function addSearchResult(title, snippet, url) {
  const snippetString = snippet.replace(/"/g, "'");
  document.getElementById("search-results-container").innerHTML += `
    <search-result-card url="${url}" title="${title}" snippet="${snippetString}"></search-result-card>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("search-btn").addEventListener("click", newSearch);
  document.getElementById("search-input").addEventListener("keypress", (event) => {
    if (event.key === "Enter")
      newSearch();
  });
})
