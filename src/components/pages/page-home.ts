import {customElement, html} from '@polymer/lit-element';
import {RouterPage} from '../router-page';

@customElement('page-home')
class PageHome extends RouterPage {

    render() {
        return html`
          <h1>Home</h1>
        `;
    }

}