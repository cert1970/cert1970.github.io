// import autoInit from "@material/auto-init/index";
import { MDCChipSet } from "@material/chips";
import { MDCRipple } from "@material/ripple";
import { MDCTopAppBar } from "@material/top-app-bar";

const topAppBar = document.querySelector(".mdc-top-app-bar");
MDCTopAppBar.attachTo(topAppBar);

const ripples = document.querySelectorAll(".mdc-card__primary-action, .mdc-fab");
[].map.call(ripples, (ripple) => {
  return new MDCRipple(ripple);
})

const chips = document.querySelectorAll("mdc-chip-set");
for (const chip of chips) {
  MDCChipSet.attachTo(chip);
}

// Search form
let searchForm = document.querySelector(".site-search-form");
document.querySelector(`.mdc-top-app-bar__action-item[aria-label="Search"]`).addEventListener("click", () => {
  searchForm.classList.add("site-search-form--open");
})
document.querySelector(".site-search-form__close").addEventListener("click", () => {
  searchForm.classList.remove("site-search-form--open");
});

// Fab
const fab = document.querySelector(".mdc-fab");
const fabIcon = document.querySelector(".mdc-fab__icon");
if (fab) {
  window.addEventListener("scroll", () => {
    let timeout;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      if (window.scrollY > 0) {
        fabIcon.classList.add("post-fab__icon--rotated");
      } else {
        fabIcon.classList.remove("post-fab__icon--rotated");
      }
    }, 100);
  });

  let isClicked = false;
  let scrollPosition = document.documentElement.scrollHeight;
  fab.addEventListener("click", () => {
    if (isClicked === false) {
      if (window.scrollY != 0) {
        scrollPosition = window.scrollY;
        window.scroll({ top: 0, behavior: "smooth" });
      } else {
        window.scroll({ top: scrollPosition, behavior: "smooth" });
      }
      isClicked = true;
      setTimeout(() => {
        isClicked = false;
      }, 1000);
    }
  });
}