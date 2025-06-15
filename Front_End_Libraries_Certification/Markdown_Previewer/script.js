import { marked } from 'https://cdn.jsdelivr.net/npm/marked@15.0.12/+esm';
import dompurify from 'https://cdn.jsdelivr.net/npm/dompurify@3.2.6/+esm';

const renderer = new marked.Renderer();
renderer.link = function({href, text}) {
  return `<a href="${href}" target="_blank">${text}</a>`;
};

function parseMarkdown(markdown) {
  const markdownOutput = marked(markdown, {
    breaks: true,
    renderer: renderer
  });
  const sanitizedOutput = dompurify.sanitize(markdownOutput);
  document.getElementById("preview").innerHTML = sanitizedOutput;
  document.getElementById("code").innerText = markdownOutput;
}

document.addEventListener("DOMContentLoaded", () => {
  const editor = document.getElementById("editor");
  parseMarkdown(editor.value);
  editor.addEventListener("input", event => parseMarkdown(event.target.value));
});
