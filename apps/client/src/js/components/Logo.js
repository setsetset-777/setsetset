const stylesheet = document.createElement('template');
stylesheet.innerHTML = `
<style>
.logo {
    position: relative;
    display: inline-block;
    width: auto;
    
}

.logo > div {
    position: relative;
    padding: 0 0.1em;
}

.logo:after {
    content: "";
    width: 100%;
    height: 10%;
    position: absolute;
    top: 0.62em;
    left: 0;
    background: var(--color-main);
}
</style>`;

const template = document.createElement('template');
template.innerHTML = `
<div class="logo">
    <div>777</div>
</div>`;

class Logo extends HTMLElement {

    connectedCallback() {
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(stylesheet.content.cloneNode(true));
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

customElements.define('setsetset-logo', Logo);
