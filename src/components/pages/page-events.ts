import {customElement, html, property} from '@polymer/lit-element';
import {RouterPage} from '../router-page';
import * as EventbriteService from '../../services/eventbrite';
import {repeat} from 'lit-html/directives/repeat';

@customElement('page-events')
class PageEvents extends RouterPage {

   @property()
   events;

    async firstUpdated() {
        this.events = await EventbriteService.fetchAllEvents();
    }

    render() {
        return html`
          <h1>Events</h1>
          ${JSON.stringify(this.events)}
        `;
    }

}