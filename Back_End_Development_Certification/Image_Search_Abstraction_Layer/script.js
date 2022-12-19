const API_BASE_URL = window.location.origin + "/.netlify/functions";

async function getAPIResponse(url) {
  const apiResponseField = document.getElementById("api-response");
  const loadingIndicator = document.querySelector(".code-wrapper img")

  loadingIndicator.hidden = false;
  try {
    const response = await fetch(url);
    if (response.status === 502) {
      apiResponseField.innerText = "The Server is experiencing problems with the Image Search API. Maybe it has been taken down. Browsing the latest searches should still work as expected";
    } else {
      apiResponseField.innerText = JSON.stringify(await response.json());
    }
  } catch (error) {
    apiResponseField.innerText = "Error while fetching API data.";
    console.log(error);
  }
  loadingIndicator.hidden = true;
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("image-search-button")
      .addEventListener("click", async () => {
    const searchTerm = document.getElementById("search-term").value;
    const offset = document.getElementById("offset").value || 1;
    if (searchTerm) {
      await getAPIResponse(`${API_BASE_URL}/Image_Search_query?query=${searchTerm}&offset=${offset}`);
    }
  });

  document.getElementById("latest-image-searches-button")
      .addEventListener("click", async () => {
    await getAPIResponse(API_BASE_URL + "/Image_Search_get-latest");
  });
});
