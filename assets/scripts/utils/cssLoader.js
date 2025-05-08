export function loadCSS(href) {
  if (!document.querySelector(`link[href="${href}"]`)) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    document.head.appendChild(link);
  }
}

export function unloadCSS(filename) {
  const link = document.querySelector(`link[href="${filename}"]`);
  if (link) {
    document.head.removeChild(link);
  }
}
