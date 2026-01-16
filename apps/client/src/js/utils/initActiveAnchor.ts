/**
 * Handle the enablement of active anchor on scroll
 */
export default function initActiveAnchor() {
  const anchors = [...document.querySelectorAll("sss-anchor")] as HTMLElement[];

  const items = anchors.map((anchor) => ({
    anchor: anchor,
    section: getAnchorNextSection(anchor),
  }));

  const scrollHandler = debounce(() => handleScroll(items));

  addEventListener("scroll", () => {
    scrollHandler();
  });

  setTimeout(() => {
    document.querySelector("body")?.classList.add("animate-background");
  }, 200);
}

function handleScroll(
  items: {
    anchor: HTMLElement;
    section: HTMLElement;
  }[],
) {
  let hasActive = false;
  items.forEach(({ anchor, section }) => {
    const anchorRect = anchor.getBoundingClientRect();
    const sectionRect = section.getBoundingClientRect();
    if (anchorRect.bottom === sectionRect.top) {
      anchor.setAttribute("active", "");
      document
        .querySelector("body")
        ?.setAttribute(
          "data-active",
          anchor.getAttribute("data-anchor") as string,
        );
      hasActive = true;
    } else {
      anchor.removeAttribute("active");
    }
  });
  if (!hasActive) {
    document.querySelector("body")?.setAttribute("data-active", "1");
  }
}

function getAnchorNextSection(anchor: HTMLElement) {
  let section: HTMLElement = anchor;
  while (section.tagName !== "SECTION") {
    section = section.nextSibling as HTMLElement;
  }
  return section;
}

function debounce<T extends (...args: any[]) => void>(
  callback: T,
  delay = 0,
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}
