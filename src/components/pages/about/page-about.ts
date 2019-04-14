import {customElement, html} from 'lit-element';
import {RouterPage} from '../../router-page';

import sharedStyles from '../../../styles/shared-styles.css';
import style from './page-about.css';

@customElement('page-about')
class PageAbout extends RouterPage {

    static styles = [style, sharedStyles];

    render() {
        return html`
          <h1>About</h1>
        `;
    }

}
