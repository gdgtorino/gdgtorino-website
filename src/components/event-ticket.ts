import {customElement, LitElement, html, property} from '@polymer/lit-element';
import '@polymer/paper-card/paper-card';
import '@polymer/iron-image/iron-image';
import {sharedStyles} from '../styles/shared-styles';

@customElement('event-ticket')
class EventTicket extends LitElement {

    @property()
    event: any;

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
            ${sharedStyles}
            
            <style>
              :host {
                transition: filter .3s ease;
                filter: drop-shadow(0 2px 3px rgba(0, 0, 0, 0.2));
              }
              
              :host(:hover) {
                filter: drop-shadow(0 4px 5px rgba(0, 0, 0, 0.2));
              }
              
              .ticket-container {
                border-radius: 4px;
                background: white;
                transition: box-shadow .3s ease;
                cursor: pointer;
                clip-path: url(#ticketClipPath);
                box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
                            0 1px 5px 0 rgba(0, 0, 0, 0.12),
                            0 3px 1px -2px rgba(0, 0, 0, 0.2);
              }
              
              :host(:hover) > .ticket-container {
                box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.14),
                            0 1px 18px 0 rgba(0, 0, 0, 0.12),
                            0 3px 5px -1px rgba(0, 0, 0, 0.4);
              }
              
              .cover-image-container {
                width: 60%;
                overflow: hidden;
                border-top-left-radius: 4px;
                border-bottom-left-radius: 4px;
                padding-right: 4px;
              }
              
              .cover-image {
                padding-bottom: 50%;
                position: relative;
              }
              
              .cover-image::after {
                content: '';
                display: block;
                position: absolute;
                width: 4px;
                top: 0;
                right: -4px;
                bottom: 0;
                border-right: 8px dotted #EFEFEF;
              }
              
              .cover-image iron-image {
                position: absolute;
                top: 0;
                bottom: 0;
                right: 0;
                left: 0;
              }
              
              .info {
                padding: 16px 24px 24px 32px;
                min-width: 0;
              }
              
              h3 {
                margin-bottom: 0;
              }
              
              .caption {
                font-size: 13px;
                font-weight: bold;
                color: var(--paper-grey-400);
                margin-bottom: 16px;
              }
              
              .description {
                min-height: 0;
                position: relative;
                overflow: hidden;
                line-height: 1.4;
              }
              
              .description::after {
                content: '';
                text-align: right;
                position: absolute;
                bottom: 0;
                right: 0;
                width: 70%;
                height: 1.4em;
                background: linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1) 50%);
              }
            </style>
            
            <svg width="0" height="0">
                <defs>
                    <clipPath id="ticketClipPath" clipPathUnits="objectBoundingBox" transform="scale(0.001, 0.00333)">
                        <path class="st0" d="M619.5,299.5c-0.3-10.5-8.9-19-19.5-19s-19.2,8.5-19.5,19H22.5c-12.1,0-22-9.9-22-22V22.5c0-12.1,9.9-22,22-22
		                                     h558.1c0.3,10.5,8.9,19,19.5,19s19.2-8.5,19.5-19h358c12.1,0,22,9.9,22,22v255.1c0,12.1-9.9,22-22,22H619.5z"/>
                    </clipPath>
                </defs>
            </svg>
            
            <div class="ticket-container horizontal layout">
              <div class="cover-image-container">
                <div class="cover-image">
                  <iron-image sizing="cover" fade src="${this.event.logo.original.url}" alt="Event cover image"></iron-image>
                </div>
              </div>
              
              <div class="flex vertical layout info">
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
                <div class="flex description">${this.event.description.text}</div>
              </div>
            </div>
            
            
        `;
    }

}
