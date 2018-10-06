let pageLimit = 10;

async function wikipediaSearch(string, pageLimit=10) {
  const responseData = await requestSearch(string, pageLimit);
  showSearchResults(responseData);
}

async function requestSearch(string, pageLimit) {
  const requestUrl = "https://en.wikipedia.org/w/api.php?" + ["origin=*", "format=json", "action=query", "list=search", "srsearch=" + encodeURI(string), "srlimit=" + pageLimit].join("&");
  const response = await fetch(requestUrl);
  const responseData = await response.json();
  return responseData;
}

function showSearchResults(json) {
  document.getElementById("search-results-container").innerHTML = "";
  const pages = json.query.search;
  const totalhits = json.query.searchinfo.totalhits;
  document.getElementById("search-results-container").innerHTML += "<p class=\"total-matches\">Total matches: " + totalhits + "</p>";
  for (let i = 0; i < pages.length; i++) {
    const page = pages[i]
    const url = "https://en.wikipedia.org/?curid=" + page.pageid
    const snippet = page.snippet
    const title = page.title
    addSearchResult(title, snippet, url);
  }
  if (pageLimit < 50) {
    document.getElementById("search-results-container").innerHTML += "<button class=\"load-more-btn\" id=\"load-more-btn\">Load more</button>";
  document.getElementById("load-more-btn").addEventListener("click", () => {
    if (pageLimit <= 40) {
      pageLimit += 10;
    }
    wikipediaSearch(document.getElementById("search-input").value, pageLimit);
  });
  }
}

function addSearchResult(title, snippet, url) {
  html =
    '<div class="search-result"> \
      <a class="search-result-link" href="' + url +  '"> \
        <h3 class="search-result-title">' + title + '</h3> \
        <p class="search-result-snippet">' + snippet + '...</p> \
      </a> \
    </div>'
  document.getElementById("search-results-container").innerHTML += html;
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("search-btn").addEventListener("click", () => {
    pageLimit = 10;
    wikipediaSearch(document.getElementById("search-input").value)
  });
  document.getElementById("search-input").addEventListener("keypress", (event) => {
    if (event.which == 13) {
      pageLimit = 10;
      wikipediaSearch(document.getElementById("search-input").value);
    }
  });
})
