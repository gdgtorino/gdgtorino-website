import {customElement, html, property} from 'lit-element';
import {until} from 'lit-html/directives/until';
import {repeat} from 'lit-html/directives/repeat';
import '@polymer/iron-icons/iron-icons';
import '@polymer/iron-icon/iron-icon';
import '@appnest/masonry-layout';

import '../../event-ticket/event-ticket';
import sharedStyles from '../../../styles/shared-styles.css';
import style from './page-home.css';
import basscssFlex from 'basscss-flexbox/css/flexbox.css';
import basscssPadding from 'basscss-padding/css/padding.css';
import * as ContentfulService from '../../../services/contentful';
import * as EventbriteService from '../../../services/eventbrite';
import {RouterPage} from '../router-page';
import {renderErrorView} from '../../error-view/error-view';
import {setStructuredData} from '../../../utils/structured-data';
import {WithContext, Event, Organization, Place, PostalAddress} from 'schema-dts';

@customElement('page-home')
class PageHome extends RouterPage {

    static styles = [style, sharedStyles, basscssFlex, basscssPadding];

    @property() gdg = ContentfulService.getGdg();
    @property() highlightedEvents = EventbriteService.getHighlightedEvents();

    constructor() {
        super();
        Promise.all([this.gdg, this.highlightedEvents])
            .then(([gdg, highlightedEvents]) => {
                console.log('GDG', gdg);
                const structuredData: WithContext<Organization> = {
                    '@context': 'https://schema.org',
                    '@type': 'Organization',
                    name: `GDG ${gdg.fields.location}`,
                    alternateName: `Google Developer Group ${gdg.fields.location}`,
                    description: gdg.fields.abstract,
                    areaServed: <Place>{
                        '@type': 'Place',
                        address: <PostalAddress>{
                            '@type': 'PostalAddress',
                            addressCountry: 'IT',
                            addressLocality: 'Turin',
                            postalCode: '10100',
                        },
                    },
                    email: gdg.fields.email,
                    logo: (<any>gdg.fields.logo).fields.url,
                    url: 'https://gdgtorino.it',
                };
                if (highlightedEvents && highlightedEvents.length) {
                    const event = highlightedEvents[0];
                    structuredData.event = <Event>{
                        '@type': 'Event',
                        name: event.name.text,
                        description: event.description.text,
                        url: event.url,
                        startDate: event.start.utc,
                        endDate: event.end.utc,
                        image: event.logo.original.url,
                    };
                }
                setStructuredData(structuredData);
            });
    }

    render() {
        return html`
          <div class="container">
            <section class="intro">
              <img src="../../../assets/images/group-photo.jpg" class="group-photo">
              
              <h2 class="abstract">
                ${until(this.gdg.then(gdg => gdg.fields.abstract).catch(renderErrorView))}
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
              `)).catch(renderErrorView))}
            </div>
          </section>
          
          <section>
            <div class="container">
              <h3>I momenti migliori dagli ultimi eventi</h3>
              <masonry-layout cols="auto" maxcolwidth="400" gap="10" class="pt3">
                ${until(this.gdg.then(gdg => html`
                  ${repeat(gdg.fields.mainGallery, (image: any) => html`
                    <img src=${image.fields.file.url} alt=${image.fields.title}>
                  `)}
                `).catch(renderErrorView))}
              </masonry-layout>
            </div>
          </section>
          
          <div class="container">
            <section>
              <h3>Abbiamo collaborato con</h3>
              <div class="partners flex flex-wrap items-center justify-center">
                ${until(ContentfulService.getPartners().then(partners =>
                  repeat(partners.items, (p: any) => html`
                    <img class="partner-logo" src=${p.fields.logo.fields.file.url} alt=${p.fields.name + ' logo'}>
                  `)
                ).catch(renderErrorView))}
              </div>
            </section>
          </div>
        `;
    }

}
