import {customElement, html, property} from 'lit-element';

import sharedStyles from '../../../styles/shared-styles.css';
import style from './page-events.css';
import basscssFlex from 'basscss-flexbox/css/flexbox.css';
import * as EventbriteService from '../../../services/eventbrite';
import {RouterPage} from '../../router-page';
import '../../event-ticket/event-ticket';
import {until} from "lit-html/directives/until";
import {repeat} from 'lit-html/directives/repeat';

@customElement('page-events')
class PageEvents extends RouterPage {

    static styles = [style, sharedStyles, basscssFlex];

    @property() pastEvents;
    @property() upcomingEvents;

    async firstUpdated() {
        this.pastEvents = await EventbriteService.getPastEvents();
        this.upcomingEvents = await EventbriteService.getUpcomingEvents();
    }

    render() {
        const pastEvents = this.pastEvents ? (<any>this.pastEvents).events : [];
        const upcomingEvents = this.upcomingEvents ? (<any>this.upcomingEvents).events : [];

        return html`
            <div class="container">
              <h1 class="page-title">Eventi</h1>
              
              <div class="flex flex-column">
              
                ${until(this.firstUpdated().then( () => html`
                  
                  ${upcomingEvents.length > 0
                    ? repeat(upcomingEvents, event => html`
                      <event-ticket .event=${event}></event-ticket>
                    `)
                    : html`
                      <div class="head">Al momento non abbiamo eventi in programma. Stay tuned!</div>
                    `
                  }
                  
                  <h3>Eventi passati</h3>
                  
                  ${repeat(pastEvents, event => html`
                    <event-ticket .event=${event}></event-ticket>
                  `)}
              
                `), html`
                
                  <div class="loading-layout flex items-center justify-center">
                    <paper-spinner-lite active></paper-spinner-lite>
                  </div>
                  
                `)}
                
              </div>
            </div>
        `;
    }

}
