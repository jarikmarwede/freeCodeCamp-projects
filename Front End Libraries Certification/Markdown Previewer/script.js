const renderer = new marked.Renderer();
renderer.link = function(href, title, text) {
  return `<a href="${href}" target="_blank">${text}</a>`;
};

function parseMarkdown(markdown) {
  const markdownOutput = marked(markdown, {
    breaks: true,
    renderer: renderer
  });
  document.getElementById("preview").innerHTML = markdownOutput;
  document.getElementById("code").innerText = markdownOutput;
}

document.addEventListener("DOMContentLoaded", () => {
  const editor = document.getElementById("editor");
  parseMarkdown(editor.value);
  editor.addEventListener("input", event => parseMarkdown(event.target.value));
});
