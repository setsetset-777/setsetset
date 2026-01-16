const stylesheet = document.createElement("template");
stylesheet.innerHTML = `
<style>

button {
  position: relative;
  font-family: var(--font-family-mono);
  text-transform: uppercase;
  font-size: var(--action-font-size);
  border-radius: var(--action-border-radius);
  border: var(--color-main) solid 1px;
  border-bottom-width: var(--strike-width);
  padding: 0.5em 1.5em 0.625em;
  cursor: pointer;
  transition: color var(--transition-timing) var(--transition-function);
}

button span {
  position: relative;
}

button:before {
  content: "";
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 100%;
  background-color: var(--color-main);
  transition: top var(--transition-timing) var(--transition-function);
}

button:hover {
  color: var(--color-background);
}

button:hover:before {
  top: 0;
}
</style>`;

function getTemplate({ label }: { label: string }) {
  const template = document.createElement("template");
  template.innerHTML = `
      <button>
        <span>${label}</span>
      </button>`;
  return template.content.cloneNode(true);
}

class Action extends HTMLElement {
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
        label: this.label,
      }),
    );
  }

  get label() {
    return this.getAttribute("label") as string;
  }
}

customElements.define("sss-action", Action);
