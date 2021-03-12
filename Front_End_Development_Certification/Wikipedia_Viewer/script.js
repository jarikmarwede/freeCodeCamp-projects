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
  const requestUrl = "https://en.wikipedia.org/w/api.php?" + ["origin=*", "format=json", "action=query", "list=search", "srsearch=" + encodeURI(string), "sroffset=" + pageLimit - 10, "srlimit=" + pageLimit].join("&");
  const response = await fetch(requestUrl);
  return response.json();
}

function showSearchResults(json) {
  if (pageLimit <= 10)
    document.getElementById("search-results-container").innerHTML = "";
  const pages = json["query"]["search"];
  const totalHits = json["query"]["searchinfo"]["totalhits"];
  document.getElementById("total-matches").innerText = "Total matches: " + totalHits;
  for (const page of pages) {
    const url = "https://en.wikipedia.org/?curid=" + page["pageid"];
    addSearchResult(page["title"], page["snippet"], url);
  }
  document.getElementById("load-more-btn").hidden = pageLimit >= 50;
}

function addSearchResult(title, snippet, url) {
  const searchResultCard = document.createElement("search-result-card");
  searchResultCard.url = url;
  searchResultCard.innerHTML = `
    <span slot="title">${title}</span>
    <span slot="snippet">${snippet}</span>
  `;
  document.getElementById("search-results-container").appendChild(searchResultCard);
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("search-btn").addEventListener("click", newSearch);
  document.getElementById("search-input").addEventListener("keypress", (event) => {
    if (event.key === "Enter")
      newSearch();
  });
  document.getElementById("load-more-btn").addEventListener("click", () => {
    if (pageLimit <= 40) {
      pageLimit += 10;
    }
    wikipediaSearch(document.getElementById("search-input").value, pageLimit).then();
  });
})
