import {customElement, html} from 'lit-element';
import {RouterPage} from '../../router-page';

import sharedStyles from '../../../styles/shared-styles.css';
import style from './page-notfound.css';

@customElement('page-notfound')
class PageNotFound extends RouterPage {

    static styles = [style, sharedStyles];

    render() {
        return html`
          <h1>404</h1>
          Oops, ${this.location.params[0]} is not here...
        `;
    }

}
