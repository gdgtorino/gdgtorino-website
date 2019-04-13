import {customElement, html} from 'lit-element';
import {RouterPage} from '../router-page';

@customElement('page-notfound')
class PageNotFound extends RouterPage {

    render() {
        return html`
          <h1>404</h1>
          Oops, ${this.location.params[0]} is not here...
        `;
    }

}
