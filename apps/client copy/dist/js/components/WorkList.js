import data from "../data/works.json" with {type: 'json'};

const stylesheet = document.createElement('template');
stylesheet.innerHTML = `
<style>
.list {
    display: flex;
    flex-direction: column;
}

.item {
    display: flex;
    justify-content: space-between;
    border-bottom: var(--color-main) solid 1px;
    padding: 1em 0 0.75em;
    align-items: baseline;
}

.left {
    display: flex;
    gap: 1em;
    align-items: baseline;
}

.title {
    font-weight: bold;
}

.right {
    display: flex;
    gap: 1em;
}

.tag-list {
    display: flex;
    gap: 0.5em;
    font-family: var(--font-family-mono);
    font-size: 0.875em;
    align-items: baseline;
}

.tag-list li {
    text-transform: uppercase;
}

.tag-list li:not(:last-child) {
    padding-right: 0.5em;
    border-right: var(--color-main) solid 1px;
}
</style>`;

function getTemplate ({ items }) {
    const template = document.createElement('template');
    template.innerHTML = `
        <ul class="list">
            ${items.join("")}
        </ul>`;
    return template.content.cloneNode(true);
}

function getItemTemplate ({ initial, count, title, tags, year, url, code }) {
    return `
        <li class="item">
            <div class="left">
                <sss-serial initial="${initial}" number="${count}"></sss-serial>
                <h4 class="title">${title}</span>
            </div>
            <div class="right">
                <ul class="tag-list">
                    ${tags.map(tag => `<li><span class="tag">${tag}</span></li>`).join("")}
                    <li>${year}</li>
                </ul>
                ${ code ?
                    `<a class="code" href="${code}" target="blank">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.3292 11.7333L14.2874 8.01738L10.3292 4.28528H12.0579L16 8.01738L12.0579 11.7333H10.3292Z" fill="currentColor"/>
                            <path d="M5.72094 13.1743L8.8666 2.82568H10.2076L7.06191 13.1743H5.72094Z" fill="currentColor"/>
                            <path d="M5.67084 11.7333H3.94212L0 8.01738L3.94212 4.28528H5.67084L1.71256 8.01738L5.67084 11.7333Z" fill="currentColor"/>
                        </svg>
                    </a>`
                    : ""
                }
                <a class="link" href="${url}" target="blank">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 2H14V3H5V2Z" fill="currentColor"/>
                        <path d="M13 11V2L14 2V11H13Z" fill="currentColor"/>
                        <path d="M2 13.293L12.7638 2.52912L13.471 3.23623L2.70711 14.0001L2 13.293Z" fill="currentColor"/>
                    </svg>
                </a>
            </div>
        </li>
    `;
}

class WorkList extends HTMLElement {

    connectedCallback() {
        this.attachShadow({mode: "open"});
        this.shadowRoot.appendChild(document.getElementById("css-reset").content.cloneNode(true));
        this.shadowRoot.appendChild(stylesheet.content.cloneNode(true));
        const { initial, items } = data[this.src];
        const formattedItems = items.map(({ count, title, tags, year, url, code }) => {
            return getItemTemplate({ initial, count, title, tags, year, url, code })
        });
        this.shadowRoot.appendChild(getTemplate({
            items: formattedItems
        }));
    }

    get src() {
        return this.getAttribute("src");
    }
}

customElements.define('sss-work-list', WorkList);
