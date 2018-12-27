import {customElement, html} from '@polymer/lit-element';
import {RouterPage} from '../router-page';

@customElement('page-generic')
class PageGeneric extends RouterPage {

    render() {
        return html`
          <h1>Generic</h1>
        `;
    }

}