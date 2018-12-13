import {customElement, html, LitElement} from '@polymer/lit-element';

@customElement('page-about' as any)
class PageAbout extends LitElement {

    render() {
        return html`
          <h1>About</h1>
        `;
    }

}