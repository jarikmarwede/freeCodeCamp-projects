function getNewQuote() {
  $.ajax( {
      url: "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1",
      success: function(json) {updateQuote(json)},
      cache: false,
	  crossDomain: true
    });
}

function updateQuote(json) {
  $("#quote-text").fadeOut(0);
  $("#quote-author").fadeOut(0);
  $("#quote-source").fadeOut(0);
  quote = json[0];
  $("#quote-text").html(quote.content);
  $("#quote-author").html("- " + quote.title);
  if (typeof quote.custom_meta !== "undefined" && typeof quote.custom_meta.Source !== "undefined") {
    $("#quote-source").html("Source: " + quote.custom_meta.Source);
  } else {
    $("#quote-source").text("");
  };
  var twitter_url = encodeURI("https://twitter.com/intent/tweet?text=" + $("#quote-text").text() + " " + $("#quote-author").text());
  $("#twitter-btn").attr("href", twitter_url);
  $("#quote-text").fadeIn("slow");
  $("#quote-author").fadeIn("slow");
  $("#quote-source").fadeIn("slow");
}

$(document).ready(function() {
  getNewQuote();
  $("#new-quote-btn").on("click", function() {
    getNewQuote();
  });
});