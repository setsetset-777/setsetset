/**
 * Anchor custom component
 * <sss-anchor />
 */

const stylesheet = document.createElement("template");
stylesheet.innerHTML = `
<style>
:host {
  font-family: var(--font-family-serif);
  font-size: var(--anchor-font-size);
  line-height: var(--anchor-line-height);
  position: relative;
  }

:host > div {
  position: relative;
  padding: 0 var(--anchor-padding);
  display: inline-block;
  margin-left: calc(-1 * var(--anchor-padding));
}

:host > div:after {
  content: "";
  display: block;
  height: var(--strike-width);
  position: absolute;
  top: 0.7em;
  left: 0;
  right: 0;
  background: var(--logo-color);
  animation: 3s linear slide-in;
  transition: right var(--transition-timing) var(--transition-function);
}

:host(:not([active]):hover) > div:after,
:host([active]) > div:after {
  right: 100%;
}

:host a {
  text-decoration: none;
}

</style>`;

function getTemplate({ label, href }: { label: string; href: string }) {
  const template = document.createElement("template");
  template.innerHTML = `
    <div>
      <div>
        <a href="${href}">${label}</a>
      </div>
    </div>`;
  return template.content.cloneNode(true);
}

class Anchor extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: "open" });
    this.shadowRoot?.appendChild(
      (
        document.getElementById("css-reset") as HTMLTemplateElement
      ).content.cloneNode(true),
    );
    this.shadowRoot?.appendChild(stylesheet.content.cloneNode(true));
    this.shadowRoot?.appendChild(
      getTemplate({
        href: this.href,
        label: this.label,
      }),
    );
  }

  get href() {
    return this.getAttribute("href") as string;
  }

  get label() {
    return this.getAttribute("label") as string;
  }

  get active() {
    return this.hasAttribute("active") as boolean;
  }

  set active(value) {
    if (value) {
      this.setAttribute("active", value ? "true" : "false");
    } else {
      this.removeAttribute("active");
    }
  }
}

customElements.define("sss-anchor", Anchor);
