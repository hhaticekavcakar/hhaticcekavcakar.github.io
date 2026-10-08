/* =================================================================
   Small enhancements for the personal website.
   The page still works if this file fails to load: all content is in
   index.html, and this script only adds the extras below.
   ================================================================= */

document.addEventListener("DOMContentLoaded", function () {
  setupMobileMenu();
  hideMenuLinksWithoutSection();
  highlightCurrentSection();
  setupGalleries();
  hideMissingVideos();
  setCurrentYear();
  listRemainingPlaceholders();
});

/* 1. Mobile menu: open/close the panel with the hamburger button */
function setupMobileMenu() {
  const sidebar = document.querySelector(".sidebar");
  const button = document.querySelector(".menu-toggle");
  if (!sidebar || !button) return;

  function setOpen(isOpen) {
    sidebar.classList.toggle("is-open", isOpen);
    button.setAttribute("aria-expanded", String(isOpen));
    button.querySelector(".visually-hidden").textContent = isOpen ? "Close menu" : "Open menu";
  }

  button.addEventListener("click", function () {
    setOpen(!sidebar.classList.contains("is-open"));
  });

  // Close the menu after choosing a section, so the content is visible
  sidebar.querySelectorAll(".site-nav a").forEach(function (link) {
    link.addEventListener("click", function () {
      setOpen(false);
    });
  });

  // Close with the Escape key
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") setOpen(false);
  });
}

/* 2. If you delete a section (e.g. Experience), remove its menu link too */
function hideMenuLinksWithoutSection() {
  document.querySelectorAll('.site-nav a[href^="#"]').forEach(function (link) {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) link.parentElement.remove();
  });
}

/* 3. Underline the menu link of the section currently on screen */
function highlightCurrentSection() {
  const links = document.querySelectorAll('.site-nav a[href^="#"]');
  if (!("IntersectionObserver" in window) || links.length === 0) return;

  const linkFor = {};
  links.forEach(function (link) {
    linkFor[link.getAttribute("href").slice(1)] = link;
  });

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (l) { l.classList.remove("is-active"); });
        const active = linkFor[entry.target.id];
        if (active) active.classList.add("is-active");
      });
    },
    // A section counts as "current" when it crosses the upper part of the screen
    { rootMargin: "-20% 0px -70% 0px" }
  );

  Object.keys(linkFor).forEach(function (id) {
    const section = document.getElementById(id);
    if (section) observer.observe(section);
  });
}

/* 4. Project galleries: clicking a thumbnail shows it as the large image */
function setupGalleries() {
  document.querySelectorAll(".gallery").forEach(function (gallery) {
    const mainImage = gallery.querySelector(".gallery-main img");
    const caption = gallery.querySelector(".gallery-main figcaption");
    const thumbs = gallery.querySelectorAll(".thumb");

    thumbs.forEach(function (thumb) {
      thumb.addEventListener("click", function () {
        mainImage.src = thumb.dataset.src;
        mainImage.alt = thumb.dataset.alt || "";
        if (caption) caption.textContent = thumb.dataset.caption || "";

        thumbs.forEach(function (t) { t.removeAttribute("aria-current"); });
        thumb.setAttribute("aria-current", "true");
      });
    });
  });
}

/* 5. Hide a video block whose file has not been uploaded yet,
      instead of showing an empty black player */
function hideMissingVideos() {
  document.querySelectorAll(".project-video video").forEach(function (video) {
    const block = video.closest(".project-video");
    const sources = video.querySelectorAll("source");
    const lastSource = sources[sources.length - 1];

    function hide() { block.hidden = true; }

    // The error may already have happened before this script ran
    if (video.networkState === HTMLMediaElement.NETWORK_NO_SOURCE) hide();

    if (lastSource) {
      lastSource.addEventListener("error", hide);
    } else if (!video.getAttribute("src")) {
      hide();
    }
    video.addEventListener("error", hide);
  });
}

/* 6. Keep the year in the footer up to date */
function setCurrentYear() {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
}

/* 7. Helper while you edit: lists any [PLACEHOLDER] text still on the page.
      Open the browser console (F12 > Console) to see the list.
      It prints nothing once everything is replaced. */
function listRemainingPlaceholders() {
  const pattern = /\[[^\[\]<>\n]{2,80}\]/g;
  const found = new Set();

  const html = document.documentElement.outerHTML.replace(/<!--[\s\S]*?-->/g, "");
  (html.match(pattern) || []).forEach(function (match) { found.add(match); });

  if (found.size > 0) {
    console.info("Placeholders still to replace (" + found.size + "):\n" + Array.from(found).join("\n"));
  }
}
