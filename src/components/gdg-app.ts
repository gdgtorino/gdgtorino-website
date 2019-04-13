import {customElement, LitElement, property, html, query} from 'lit-element';
import {sharedStyles} from '../styles/shared-styles';
import {Router} from '@vaadin/router';

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
import './pages/page-home';
import './pages/page-about';
import './pages/page-events';
import './pages/page-team';
import './pages/page-generic';
import './pages/page-notfound';
import '../styles/theme';
import * as ContentfulService from '../services/contentful';

@customElement('gdg-app')
class GdgApp extends LitElement {

    @property() page: string;
    @query('#routerOutlet') routerOutlet;
    @query('#emailInput') emailInput;
    @query('#mailChimpForm') mailChimpForm;
    router;
    pagesData;

    async firstUpdated() {
        this.pagesData = await ContentfulService.getRoutingData();
        this.router = new Router(this.routerOutlet);
        this.router.setRoutes([
            ...this.pagesData.items.map(p => ({
                path: `/${p.fields.slug || ''}`,
                component: p.fields.component || 'page-generic',
            })),
            {
                path: '(.*)',
                component: 'page-notfound',
            },
        ]);
        window.addEventListener('vaadin-router-location-changed', () => {
            this.page = this.router.location.pathname.substr(1);
        });
    }

    render() {
        const navPages = this.pagesData ? this.pagesData.items
                .filter(page => page.fields.mainNavigationItem === true)
                .sort((a, b) => a.fields.order < b.fields.order ? -1 : a.fields.order > b.fields.order ? 1 : 0)
            : [];
        return html`
            ${sharedStyles}
            <style>
              app-toolbar {
                height: 56px;
              }
              
              paper-tab {
                padding: 0 16px;
              }
              
              paper-tab a {
                text-decoration: none;
                color: inherit;
                display: flex;
                align-items: center;
                justify-content: center;
              }
              
              .logo {
                height: 48px;
                width: auto;
              }
              
              #routerOutlet {
                width: 100%;
                height: 100%;
              }
              
              .loading-overlay {
                position: relative;
                width: 100vw;
                height: 100vh;
                background: white;
              }
              
              footer {
                background: var(--paper-grey-100);
                color: #a5a5a5;
              }
              
              footer > .container {
                margin-top: 40px;
                margin-bottom: 40px;
              }
              
              footer a {
                color: inherit;
                text-decoration: none;
                padding: 8px 0;
              }
              
              footer a:hover {
                text-decoration: underline;
              }
              
              footer a img {
                vertical-align: middle;
                margin-right: 12px;
              }
              
              footer .bottom-line {
                background: var(--paper-grey-200);
                padding: 8px;
              }
              
              footer .bottom-line img {
                height: 13px;
                width: auto;
              }
              
              footer .bottom-line a {
                margin-left: 16px;
              }
            </style>
            
            <app-drawer-layout fullbleed force-narrow>
            
              <app-drawer slot="drawer">
                drawer-content
              </app-drawer>
              
              <app-header-layout fullbleed>
                <app-header slot="header">
                  <app-toolbar class="container">
                    <paper-icon-button icon="menu" drawer-toggle class="show-on-narrow"></paper-icon-button>
                    <a href="/"><img class="logo" src="../../assets/images/logo.png"></a>
                    <div class="flex"></div>
                    <paper-tabs .selected=${this.page}
                                attr-for-selected="name"
                                class="hide-on-narrow">
                      <paper-tab link name="about"><a href="./about">About</a></paper-tab>
                      <paper-tab link name="eventi"><a href="./eventi">Eventi</a></paper-tab>
                      <paper-tab link name="team"><a href="./team">Team</a></paper-tab>
                    </paper-tabs>
                  </app-toolbar>
                </app-header>
            
                <div class="vertical layout">
                
                  <div id="routerOutlet"></div>
                  
                  <footer>
                    <div class="container horizontal layout wrap">
                      <div class="flex">
                        <img src="../../assets/images/logo-grey.svg" class="footer-logo">
                      </div>
                      <div class="flex vertical layout">
                        ${navPages.map(page => html`
                            <a href="/${page.fields.slug}">${page.fields.name}</a>
                        `)}
                      </div>
                      <div class="flex vertical layout">
                        <a href="https://facbook.com/gdgtorino" target="_blank"><img src="../../assets/images/facebook.svg"> /gdgtorino</a>
                        <a href="https://twitter.com/gdgtorino" target="_blank"><img src="../../assets/images/twitter.svg"> @gdgtorino</a>
                        <a href="https://medium.com/gdgtorino" target="_blank"><img src="../../assets/images/medium.svg"> @gdgtorino</a>
                        <a href="https://github.com/gdgtorino" target="_blank"><img src="../../assets/images/github.svg"> /gdgtorino</a>
                      </div>
                      <div class="flex vertical layout">
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
                      <div class="container horizontal layout center">
                        <div>
                          Made with <img src="../../assets/images/polymer.svg"> and <img src="../../assets/images/love.svg">
                          by GDG Torino
                        </div>
                        <div class="flex"></div>
                        <a href="/privacy-policy">Privacy policy</a>
                        <a href="/terms-of-service">Terms of service</a>
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
