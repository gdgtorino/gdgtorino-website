import {customElement, html} from 'lit-element';
import {RouterPage} from '../router-page';

@customElement('page-team')
class PageTeam extends RouterPage {

    render() {
        return html`
          <h1>Team</h1>
        `;
    }

}
