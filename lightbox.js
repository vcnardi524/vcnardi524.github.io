// Click a photo in any .grid to view it full size. Arrow keys move, Esc closes.
(function () {
  const box = document.createElement("div");
  box.className = "lightbox";
  box.innerHTML =
    '<button class="lb-close" aria-label="Close">×</button>' +
    '<button class="lb-prev" aria-label="Previous">‹</button>' +
    '<img alt=""><p></p>' +
    '<button class="lb-next" aria-label="Next">›</button>';
  document.body.appendChild(box);
  const img = box.querySelector("img");
  const cap = box.querySelector("p");
  let items = [], i = 0, opener = null;

  function show() {
    const b = items[i];
    img.src = b.dataset.full;
    img.alt = b.querySelector("img").alt;
    cap.textContent = img.alt;
  }
  function open(btn) {
    items = [...btn.closest(".grid").querySelectorAll("button")];
    i = items.indexOf(btn);
    opener = btn;
    show();
    box.classList.add("open");
    box.querySelector(".lb-close").focus();
  }
  function close() {
    box.classList.remove("open");
    img.src = "";
    if (opener) opener.focus();
  }
  function step(d) { i = (i + d + items.length) % items.length; show(); }

  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".grid button");
    if (btn) open(btn);
  });
  box.addEventListener("click", (e) => {
    if (e.target.closest(".lb-prev")) step(-1);
    else if (e.target.closest(".lb-next")) step(1);
    else if (e.target === box || e.target.closest(".lb-close")) close();
  });
  document.addEventListener("keydown", (e) => {
    if (!box.classList.contains("open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "ArrowRight") step(1);
  });

  // Helper so pages can build grids from data.
  window.photoGrid = function (photos) {
    return '<div class="grid">' + photos.map(([src, alt]) =>
      `<button data-full="photos/${src}.jpg"><img src="photos/${src}_t.jpg" alt="${alt}" loading="lazy"></button>`
    ).join("") + "</div>";
  };
})();
