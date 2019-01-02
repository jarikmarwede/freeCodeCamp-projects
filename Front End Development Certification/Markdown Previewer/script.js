const renderer = new marked.Renderer();
renderer.link = function(href, title, text) {
  return `<a href="${href}" target="_blank">${text}</a>`;
};

function parseMarkdown(markdown) {
  document.getElementById("preview").innerHTML = marked(markdown, {
    breaks: true,
    renderer: renderer
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const editor = document.getElementById("editor");
  parseMarkdown(editor.value);
  editor.addEventListener("input", event => parseMarkdown(event.target.value));
});
