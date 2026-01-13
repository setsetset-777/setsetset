import "./components/index.js";
import initActiveAnchor from "./utils/initActiveAnchor.js";

/**
 * Automatically set theme on preferred color change
 */
const detectTheme = () => {
    let storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
        setTheme(storedTheme);
    }
    else if (window.matchMedia('(prefers-color-scheme: dark)')) {
        setTheme("dark");
    };

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        const theme = event.matches ? "dark" : "light";
        setTheme(theme);
    });

    document.querySelector(".settings-theme").addEventListener("click", () => {
        toggleTheme();
    });
}

/**
 * Set color theme
 */
const setTheme = (theme) => {
    const dataset = document.querySelector("body").dataset;
    dataset.theme = theme;
    localStorage.setItem("theme", theme);
};

const toggleTheme = () => {
    const dataset = document.querySelector("body").dataset;
    let theme = dataset.theme;
    if (theme === "dark") {
        theme = "light";
    } else {
        theme = "dark";
    }
    setTheme(theme)
}

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