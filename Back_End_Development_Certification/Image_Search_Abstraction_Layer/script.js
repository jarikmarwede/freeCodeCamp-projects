async function getAPIResponse(url) {
  document.querySelector(".code-wrapper img").hidden = false;
  const response = await fetch(url);
  document.querySelector(".code-wrapper img").hidden = true;
  document.getElementById("api-response").innerText = JSON.stringify(await response.json());
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("image-search-button")
      .addEventListener("click", async () => {
    const searchTerm = document.getElementById("search-term").value;
    const offset = document.getElementById("offset").value || 1;
    if (searchTerm) {
      const APIURL = `https://jm-freecodecamp-projects.herokuapp.com/image-search-abstraction-layer/imagesearch/${searchTerm}?offset=${offset}`;
      await getAPIResponse(APIURL);
    }
  });

  document.getElementById("latest-image-searches-button")
      .addEventListener("click", async () => {
    await getAPIResponse("https://jm-freecodecamp-projects.herokuapp.com" +
        "/image-search-abstraction-layer/latest/imagesearch");
  });
});
