import {customElement, LitElement, html, property} from 'lit-element';

import sharedStyles from '../../styles/shared-styles.css';
import style from './event-ticket.css';
import '@polymer/paper-card/paper-card';
import '@polymer/iron-image/iron-image';

@customElement('event-ticket')
class EventTicket extends LitElement {

    static styles = [style, sharedStyles];

    @property() event: any;

    render() {
        let dateString = '';
        let timeString = '';
        let date;
        if (this.event) {
            date = new Date(this.event.start.utc);
            dateString = date
                .toLocaleDateString(navigator.language, {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                });
            timeString = date.toLocaleTimeString(navigator.language, {hour: 'numeric', minute: 'numeric'});
        }
        return html`
            <svg width="0" height="0">
                <defs>
                    <clipPath id="ticketClipPath" clipPathUnits="objectBoundingBox" transform="scale(0.001, 0.00333)">
                        <path class="st0" d="M619.5,299.5c-0.3-10.5-8.9-19-19.5-19s-19.2,8.5-19.5,19H22.5c-12.1,0-22-9.9-22-22V22.5c0-12.1,9.9-22,22-22
		                                     h558.1c0.3,10.5,8.9,19,19.5,19s19.2-8.5,19.5-19h358c12.1,0,22,9.9,22,22v255.1c0,12.1-9.9,22-22,22H619.5z"/>
                    </clipPath>
                </defs>
            </svg>
            
            <a href="${this.event.url}" target="_blank">
              <div class="ticket-container">
                <div class="cover-image-container">
                  <div class="cover-image">
                    <iron-image sizing="cover" fade src="${this.event.logo.original.url}" alt="Event cover image"></iron-image>
                  </div>
                </div>
                
                <div class="info">
                  <h3>${this.event.name.text}</h3>
                  <div class="caption">
                    <div>${dateString}</div>
                    <div>Ore ${timeString}</div>
                  </div>
                  ${this.event.venue ? html`
                      <div class="caption">
                        <div>${this.event.venue.name}</div>
                        <div>${this.event.venue.address.localized_address_display}</div>
                      </div>
                  ` : null}
                  <div class="description">${this.event.description.text}</div>
                </div>
              </div>
            </a>
        `;
    }

}
