import {customElement, html} from 'lit-element';
import {RouterPage} from '../../router-page';

import sharedStyles from '../../../styles/shared-styles.css';
import style from './page-team.css';

@customElement('page-team')
class PageTeam extends RouterPage {

    static styles = [style, sharedStyles];

    render() {
        return html`
          <h1>Team</h1>
        `;
    }

}
