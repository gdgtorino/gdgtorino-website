import {customElement, html, property} from '@polymer/lit-element';
import {RouterPage} from '../router-page';
import * as EventbriteService from '../../services/eventbrite';
import '../event-ticket';
import {sharedStyles} from '../../styles/shared-styles';
import {until} from 'lit-html/lib/until';

@customElement('page-events')
class PageEvents extends RouterPage {

   @property()
   pastEvents;
   @property()
   upcomingEvents;

    async firstUpdated() {
        this.pastEvents = await EventbriteService.fetchPastEvents();
        this.upcomingEvents = await EventbriteService.fetchUpcomingEvents();
    }

    render() {
        const pastEvents = this.pastEvents ? (<any>this.pastEvents).events : [];
        const upcomingEvents = this.upcomingEvents ? (<any>this.upcomingEvents).events : [];

        return html`
          ${sharedStyles}
          
          <style>
            event-ticket {
              width: 100%;
              margin-bottom: 60px;
            }
            
            .head {
              font-weight: 200;
              font-size: 18px;
              color: var(--paper-grey-500);
              margin: 40px 0;
            }
          </style>
          
          <div class="container">
            <h1 class="page-title">Eventi</h1>
            
            <div class="vertical layout">
              
              ${upcomingEvents.length > 0 ?
                    upcomingEvents.map(event => html`
                      <event-ticket .event=${event}></event-ticket>
                    `) : html`
                      <div class="head">Al momento non abbiamo eventi in programma. Stay tuned!</div>
                    `}
              
              <h3>Eventi passati</h3>
              
              ${pastEvents.map(event => html`
                <event-ticket .event=${event}></event-ticket>
              `)}
            </div>
          </div>
        `;
    }

}
