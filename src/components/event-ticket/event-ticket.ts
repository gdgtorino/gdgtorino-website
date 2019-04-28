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
                    <clipPath id="ticketClipPathOriz" clipPathUnits="objectBoundingBox" transform="scale(0.001, 0.00333)">
                        <path d="M619.5,299.5c-0.3-10.5-8.9-19-19.5-19s-19.2,8.5-19.5,19H22.5c-12.1,0-22-9.9-22-22V22.5c0-12.1,9.9-22,22-22
		                                     h558.1c0.3,10.5,8.9,19,19.5,19s19.2-8.5,19.5-19h358c12.1,0,22,9.9,22,22v255.1c0,12.1-9.9,22-22,22H619.5z"/>
                    </clipPath>
                    <clipPath id="ticketClipPathVert" clipPathUnits="objectBoundingBox" transform="scale(0.001, 0.0011628)">
                        <path d="M1000,466.39v-430A36.37,36.37,0,0,0,963.63,0H36.37A36.37,36.37,0,0,0,0,36.37V467.06a31.76,31.76,0,0,1,31.77,31.78A31.76,31.76,0,0,1,0,530.61v293A36.37,36.37,0,0,0,36.37,860H963.63A36.37,36.37,0,0,0,1000,823.63V529.94a31.78,31.78,0,0,1,0-63.55Z"/>
                    </clipPath>
                </defs>
            </svg>
            
            <a href="${this.event.url}" target="_blank" rel="noopener">
              <div class="ticket-container">
                <div class="cover-image-container">
                  <div class="cover-image">
                    <iron-image sizing="cover" fade src="${this.event.logo.original.url}" alt="Event cover image"></iron-image>
                  </div>
                </div>
                
                <div class="info-container">
                  <div class="info">
                    <h3>${this.event.name.text}</h3>
                    <div class="caption">
                      <div>${dateString}</div>
                      <div>Ore ${timeString}</div>
                    </div>
                    ${this.event.venue ? html`
                        <div class="venue caption">
                          <div>${this.event.venue.name}</div>
                          <div>${this.event.venue.address.localized_address_display}</div>
                        </div>
                    ` : null}
                    <div class="description">${this.event.description.text}</div>
                  </div>
                </div>
              </div>
            </a>
        `;
    }

}
