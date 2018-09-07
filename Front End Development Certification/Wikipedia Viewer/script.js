var pageLimit = 10;

function wikipediaSearch(string, pageLimit=10) {
  var requestUrl = "https://en.wikipedia.org/w/api.php?" + ["origin=*", "format=json", "action=query", "list=search", "srsearch=" + encodeURI(string), "srlimit=" + pageLimit].join("&");
  $.getJSON(requestUrl, showSearchResults);
}

function showSearchResults(json) {
  $("#search-results-container").empty();
  var pages = json.query.search;
  var totalhits = json.query.searchinfo.totalhits;
  $("#search-results-container").append("<p class=\"total-matches\">Total matches: " + totalhits + "</p>");
  for (var i = 0; i < pages.length; i++) {
    var page = pages[i]
    var url = "https://en.wikipedia.org/?curid=" + page.pageid
    var snippet = page.snippet
    var title = page.title
    addSearchResult(title, snippet, url);
  }
  if (pageLimit < 50) {
    $("#search-results-container").append("<button class=\"load-more-btn\" id=\"load-more-btn\">Load more</button>")
  $("#load-more-btn").on("click", function() {
    if (pageLimit <= 40) {
      pageLimit += 10;
    }
    wikipediaSearch($("#search-input").val(), pageLimit);
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
  $("#search-results-container").append(html);
}

$(document).ready(function() {
  $("#search-btn").on("click", function() {
    pageLimit = 10;
    wikipediaSearch($("#search-input").val())});
  $("#search-input").on("keypress", function(e) {
    if (e.which == 13) {
      pageLimit = 10;
      wikipediaSearch($("#search-input").val());
    }
  });
})
