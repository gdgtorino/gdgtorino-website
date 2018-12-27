import {customElement, html} from '@polymer/lit-element';
import {RouterPage} from '../router-page';

@customElement('page-events')
class PageEvents extends RouterPage {

    render() {
        return html`
          <h1>Events</h1>
        `;
    }

}