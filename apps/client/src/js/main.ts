import "../styles/index.scss";

import "./components/index.ts";
import initActiveAnchor from "./utils/initActiveAnchor.ts";

type Theme = "dark" | "light";

/**
 * Automatically set theme on preferred color change
 */
const detectTheme = () => {
  let storedTheme = localStorage.getItem("theme") as Theme;
  if (storedTheme) {
    setTheme(storedTheme);
  } else if (window.matchMedia("(prefers-color-scheme: dark)")) {
    setTheme("dark");
  }

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (event) => {
      const theme = event.matches ? "dark" : "light";
      setTheme(theme);
    });

  document.querySelector(".settings-theme")?.addEventListener("click", () => {
    toggleTheme();
  });
};

/**
 * Set color theme
 */
const setTheme = (theme: Theme) => {
  const dataset = document.querySelector("body")?.dataset;
  if (!dataset) {
    return;
  }
  dataset.theme = theme;
  localStorage.setItem("theme", theme);
};

const toggleTheme = () => {
  const dataset = document.querySelector("body")?.dataset;
  if (!dataset) {
    return;
  }
  let theme: Theme = dataset.theme as Theme;
  if (theme === "dark") {
    theme = "light";
  } else {
    theme = "dark";
  }
  setTheme(theme);
};

/**
 * Run main code
 */
const init = () => {
  detectTheme();
  initActiveAnchor();
};

/**
 * Execute script on DOM ready
 */
document.addEventListener("DOMContentLoaded", init);
