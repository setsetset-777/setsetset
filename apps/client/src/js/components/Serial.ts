/**
 * Serial custom component
 * <sss-serial initial="s" number="1" />
 */

const stylesheet = document.createElement("template");
stylesheet.innerHTML = `
<style>
:host {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-small);
  text-transform: uppercase;
}
</style>`;

function getTemplate({ initial, number }: { initial: string; number: string }) {
  const template = document.createElement("template");
  template.innerHTML = `
    <span>${initial}${number}</span>`;
  return template.content.cloneNode(true);
}

class Serial extends HTMLElement {
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
        initial: this.initial,
        number: this.number.padStart(3, "0"),
      }),
    );
  }

  get initial() {
    return this.getAttribute("initial") as string;
  }

  get number() {
    return this.getAttribute("number") as string;
  }
}

customElements.define("sss-serial", Serial);
