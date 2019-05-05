import {customElement, html} from 'lit-element';
import {RouterPage} from '../router-page';

import sharedStyles from '../../../styles/shared-styles.css';
import style from './page-notfound.css';

@customElement('page-notfound')
class PageNotFound extends RouterPage {

    static styles = [style, sharedStyles];

    render() {
        return html`
          <div class="container">
            <h1 class="page-title">404</h1>
            
            <div class="page-content">
              Oops, ${this.location.params[0]} is not here...
            </div>
          </div>
        `;
    }

}
