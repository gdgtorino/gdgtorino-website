import {customElement, html, LitElement, property, query} from 'lit-element';
import {repeat} from 'lit-html/directives/repeat';
import {Entry, EntryCollection} from 'contentful';
import {Document} from '@contentful/rich-text-types';
import {Router} from '@vaadin/router';
import {until} from 'lit-html/directives/until';

import style from './gdg-app.css';
import sharedStyles from '../../styles/shared-styles.css';
import basscssGrid from 'basscss-grid/css/grid.css';
import basscssFlex from 'basscss-flexbox/css/flexbox.css';
import basscssHide from 'basscss-hide/css/hide.css';
import basscssLayout from 'basscss-layout/css/layout.css';
import * as ContentfulService from '../../services/contentful';
import '@polymer/app-layout/app-drawer-layout/app-drawer-layout';
import '@polymer/app-layout/app-header-layout/app-header-layout';
import '@polymer/app-layout/app-drawer/app-drawer';
import '@polymer/app-layout/app-header/app-header';
import '@polymer/app-layout/app-toolbar/app-toolbar';
import '@polymer/iron-icons/iron-icons';
import '@polymer/paper-icon-button/paper-icon-button';
import '@polymer/paper-input/paper-input';
import '@polymer/paper-tabs/paper-tabs';
import '@polymer/paper-tabs/paper-tab';
import '@polymer/paper-spinner/paper-spinner-lite';
import '../pages/home/page-home';
import '../pages/about/page-about';
import '../pages/events/page-events';
import '../pages/organizers/page-organizers';
import '../pages/generic/page-generic';
import '../pages/notfound/page-notfound';
import '../../styles/theme';
import {IPageFields} from '../../content-types/generated';
import {PageData} from '../router-page';
import {AppDrawerElement} from '@polymer/app-layout/app-drawer/app-drawer';
import {classMap} from 'lit-html/directives/class-map';

@customElement('gdg-app')
class GdgApp extends LitElement {

    static styles = [sharedStyles, style, basscssGrid, basscssFlex, basscssHide, basscssLayout];

    @property() page: string;
    @property() gdg = ContentfulService.getGdg();
    @query('#routerOutlet') routerOutlet;
    @query('#emailInput') emailInput;
    @query('#mailChimpForm') mailChimpForm;
    @query('app-drawer') drawer: AppDrawerElement;
    pagesData: EntryCollection<IPageFields>;
    router: Router;

    async firstUpdated() {
        this.pagesData = await ContentfulService.getRoutingData();
        this.router = new Router(this.routerOutlet);
        this.router.setRoutes([
            ...this.pagesData.items.map(p => ({
                path: `/${p.fields.slug || ''}`,
                component: p.fields.component || 'page-generic',
                action: (context, commands) => {
                    const component = commands.component(context.route.component);
                    component.pageData = <PageData>{
                        ...p.fields,
                        getBody(): Promise<Document> {
                            return ContentfulService.getPageBody(p.sys.id);
                        },
                    };
                    return component;
                },
            })),
            {
                path: '(.*)',
                component: 'page-notfound',
            },
        ]);
        window.addEventListener('vaadin-router-location-changed', () => {
            this.page = this.router.location.pathname.substr(1);
            this.drawer.close();
        });
    }


    render() {
        const navPages: Entry<IPageFields>[] = this.pagesData ? this.pagesData.items
            .filter(page => page.fields.mainNavigationItem) : [];
        return html`
            <app-drawer-layout fullbleed force-narrow>
            
              <app-drawer slot="drawer">
                ${repeat(navPages, (page: Entry<IPageFields>) => html`
                  <a href="/${page.fields.slug || ''}" class=${classMap({active: (page.fields.slug || '') === this.page})}>
                    ${page.fields.name}
                  </a>
                `)}
              </app-drawer>
              
              <app-header-layout fullbleed>
                <app-header slot="header">
                  <app-toolbar class="container">
                    <paper-icon-button icon="menu" drawer-toggle class="sm-hide md-hide lg-hide"></paper-icon-button>
                    <a href="/"><img class="logo" src="../../assets/images/logo.png"></a>
                    <div class="flex-auto"></div>
                    <paper-tabs .selected=${this.page}
                                attr-for-selected="name"
                                class="xs-hide">
                      ${repeat(navPages.filter(p => p.fields.slug), (page: Entry<IPageFields>) => html`
                        <paper-tab link name=${page.fields.slug}><a href="./${page.fields.slug}">${page.fields.name}</a></paper-tab>
                      `)}
                    </paper-tabs>
                  </app-toolbar>
                </app-header>
            
                <div class="flex flex-column">
                
                  <div id="routerOutlet"></div>
                  
                  <footer>
                    <div class="container clearfix">
                    
                      <div class="sm-col sm-col-3">
                        <img src="../../assets/images/logo-grey.svg" class="footer-logo">
                      </div>
                      
                      <div class="sm-col sm-col-3 flex flex-column">
                        ${repeat(navPages, (page: Entry<IPageFields>) => html`
                            <a href="/${page.fields.slug || ''}">${page.fields.name}</a>
                        `)}
                      </div>
                      
                      <div class="sm-col sm-col-3 flex flex-column">
                        ${until(this.gdg.then(gdg =>
                          repeat(gdg.fields.socialLinks, (p: any) => html`
                            <a href=${p.fields.url} target="_blank"><img src=${p.fields.icon.fields.file.url}>${p.fields.text}</a>
                          `)
                        ))}
                      </div>
                      
                      <div class="sm-col sm-col-3 flex flex-column">
                        <div>Iscriviti alla nostra newsletter per rimanere aggiornato sui prossimi eventi!</div>
                        <paper-input id="emailInput"
                                     label="Email"
                                     type="email"
                                     required
                                     auto-validate
                                     error-message="Inserisci un indirizzo email valido"
                                     @keypress="${this.onEmailInputKeypress.bind(this)}">
                      <paper-icon-button slot="suffix"
                                         icon="arrow-forward"
                                         title="Iscriviti"
                                         @click="${this.subscribeToNewsletter.bind(this)}">
                      </paper-icon-button>
                        </paper-input>
                      </div>
                      
                    </div>
                    <div class="bottom-line">
                      <div class="container sm-flex items-center">
                        <div>
                          Made with <img src="../../assets/images/polymer.svg"> and <img src="../../assets/images/love.svg">
                          by GDG Torino
                        </div>
                        <div class="xs-hide flex-auto"></div>
                        <a href="/privacy-policy">Privacy policy</a>
                        <a href="/termini-di-servizio">Termini di servizio</a>
                      </div>
                    </div>
                  </footer>
                  
                </div>
                
              </app-header-layout>
              
            </app-drawer-layout>
            
            ${this.page == null ? html`
              <div class="loading-overlay horizontal layout center-center">
                <paper-spinner-lite active></paper-spinner-lite>
              </div>` : null}
            
            <form id="mailChimpForm"
                  class="hidden"
                  action="https://gdgtorino.us13.list-manage.com/subscribe/post?u=5b856731f80e3cf563201f842&amp;id=a4a45eebb0"
                  method="POST"
                  target="_blank">
              <input type="hidden" name="EMAIL">
              <div style="position: absolute; left: -5000px;" aria-hidden="true">
                <input type="text" name="b_5b856731f80e3cf563201f842_a4a45eebb0" tabindex="-1" value="">
              </div>
            </form>
        `;
    }

    onEmailInputKeypress(event: KeyboardEvent) {
        if (event.key === 'Enter') {
            this.subscribeToNewsletter();
        }
    }

    subscribeToNewsletter() {
        if (this.emailInput && this.emailInput.validate()) {
            this.mailChimpForm.querySelector('input').value = this.emailInput.value;
            this.mailChimpForm.submit();
        }
    }
}
