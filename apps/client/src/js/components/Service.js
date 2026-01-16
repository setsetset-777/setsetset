/**
 * Service custom component
 * <sss-service />
 */

const stylesheet = document.createElement('template');
stylesheet.innerHTML = `
<style>
header {
    display: flex;
    justify-content: space-between;
    border-bottom: var(--color-main) solid 1px;
    padding-bottom: 0.75em;
    align-items: center;
    cursor: pointer;
    position: relative;
}

header > div {
    display: flex;
    align-items: baseline;
    gap: 0.5em;
}

header h3 {
    font-size: var(--font-size-big);
    font-weight: bold;
}

header button {
    width: 16px;
    height: 16px;
    position: relative;
    transition: transform var(--transition-timing) var(--transition-function);
    cursor: inherit;
}

header button:before,
header button:after {
    transition: opacity var(--transition-timing) var(--transition-function),
        transform var(--transition-timing) var(--transition-function);
    background: var(--color-main);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    content: "";
    display: block;
    transform-origin: top;
}

header button:before {
    width: 1em;
    height: 1px;
}

header button:after {
    height: 1em;
    width: 1px;
    transform: rotate(0deg) translate(-50%, -50%);
}


header:hover button {
    transform: rotate(180deg);
}

.body {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows var(--service-body-transition-timing) var(--transition-function);
}

.body > div {
    overflow: hidden;
}

.body > div > div {
    padding-top: 0.75em;
}

.body ::slotted(ul) {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
}

[data-active] header button:after {
    transform: rotate(90deg) translate(-50%, -50%);
    opacity: 0;
}

[data-active] .body {
    grid-template-rows: 1fr;
}
</style>`;

function getTemplate ({ number, title }) {
    const template = document.createElement('template');
    template.innerHTML = `
        <article>
            <header>
                <div>
                    <sss-serial initial="s" number="${number}"></sss-serial>
                    <h3>${title}</h3>
                </div>
                <button aria-label="Expand"></button>
            </header>
            <div class="body">
                <div>
                    <div>
                        <slot name="body"></slot>
                    </div>
                </div>
            </div>
        </article>`;
    return template.content.cloneNode(true);
}

class Service extends HTMLElement {
    connectedCallback() {
        this.attachShadow({mode: "open"});
        this.shadowRoot.appendChild(document.getElementById("css-reset").content.cloneNode(true));
        this.shadowRoot.appendChild(stylesheet.content.cloneNode(true));
        this.shadowRoot.appendChild(getTemplate({
            number: this.serial.padStart(3, "0"),
            title: this.title
        }));

        const article = this.shadowRoot.querySelector("article");
        const header = article.querySelector("header");
        header.addEventListener("click", () => {
            article.toggleAttribute("data-active");
        });
    }

    get title() {
        return this.getAttribute("title");
    }

    get serial() {
        return this.getAttribute("serial");
    }
}

customElements.define('sss-service', Service);
