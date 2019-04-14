import {customElement, html} from 'lit-element';
import {RouterPage} from '../../router-page';

import sharedStyles from '../../../styles/shared-styles.css';
import style from './page-generic.css';

@customElement('page-generic')
class PageGeneric extends RouterPage {

    static styles = [style, sharedStyles];

    render() {
        return html`
          <h1>Generic</h1>
        `;
    }

}
