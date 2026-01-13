/**
 * Handle the enablement of active anchor on scroll
 */
export default function initActiveAnchor () {
    const anchors = [...document.querySelectorAll("sss-anchor")];

    const items = anchors.map((anchor) => ({
        anchor,
        section: getAnchorNextSection(anchor)
    }));

    const scrollHandler = debounce(() => handleScroll(items));
    let isBackgroundAnimate = false;

    addEventListener("scroll", () => {
        scrollHandler()
    });

    setTimeout(() => {
        document.querySelector("body").classList.add("animate-background");
    }, 200);
};

function handleScroll(items) {
    let hasActive = false;
    items.forEach(({ anchor, section }) => {
        const anchorRect = anchor.getBoundingClientRect();
        const sectionRect = section.getBoundingClientRect();
        if(anchorRect.bottom === sectionRect.top) {
            anchor.setAttribute("active", "");
            document.querySelector("body").setAttribute("data-active", anchor.getAttribute("data-anchor"));
            hasActive = true;
        } else {
            anchor.removeAttribute("active");
        }
    });
    if (!hasActive) {
        document.querySelector("body").setAttribute("data-active", "1")
    }
}

function getAnchorNextSection (anchor) {
    let section = anchor;
    while(section.tagName !== "SECTION") {
        section = section.nextSibling;
    }
    return section;
};

function debounce(callback, delay = 0){
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            callback.apply(this, args);
        }, delay);
    };
}