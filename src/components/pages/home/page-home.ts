import {customElement, html, property} from 'lit-element';
import {until} from 'lit-html/directives/until';

import sharedStyles from '../../../styles/shared-styles.css';
import style from './page-home.css';
import basscssFlex from 'basscss-flexbox/css/flexbox.css';
import * as ContentfulService from '../../../services/contentful';
import * as EventbriteService from '../../../services/eventbrite';
import {RouterPage} from '../../router-page';
import '@polymer/iron-icons/iron-icons';
import '@polymer/iron-icon/iron-icon';
import '../../event-ticket/event-ticket';
import {repeat} from 'lit-html/directives/repeat';

@customElement('page-home')
class PageHome extends RouterPage {

    static styles = [style, sharedStyles, basscssFlex];

    @property() gdg = ContentfulService.getGdg();
    @property() highlightedEvents = EventbriteService.getHighlightedEvents();

    render() {
        return html`
          <div class="container">
            <section class="intro">
              <img src="../../../assets/images/group-photo.png" class="group-photo">
              
              <h2 class="abstract">
                ${until(this.gdg.then(gdg => gdg.fields.abstract))}
              </h2>
            </section>
          </div>
          
          <section class="grey-bg">
            <div class="container">
              <div class="flex items-center">
                <h3 class="flex-auto">Eventi in evidenza</h3>
                <a href="/eventi" class="body-link">Tutti gli eventi <iron-icon icon="arrow-forward"></iron-icon></a>
              </div>
              ${until(this.highlightedEvents.then(events => repeat(events, event => html`
                <event-ticket .event=${event}></event-ticket>
              `)))}
            </div>
          </section>
          
          <div class="container">
            <section>
              <h3>I nostri partner</h3>
              <div class="partners flex flex-wrap items-center justify-center">
                ${until(ContentfulService.getPartners().then(partners =>
                  repeat(partners.items, (p: any) => html`
                    <img class="partner-logo" src=${p.fields.logo.fields.file.url} alt=${p.fields.name + ' logo'}>
                  `)
                ))}
              </div>
            </section>
          </div>
        `;
    }

}
