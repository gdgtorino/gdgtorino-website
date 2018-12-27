import {customElement, LitElement, property, html, query} from '@polymer/lit-element';
import {sharedStyles} from '../styles/shared-styles';
import {Router} from '@vaadin/router';

import '@polymer/app-layout/app-drawer-layout/app-drawer-layout';
import '@polymer/app-layout/app-header-layout/app-header-layout';
import '@polymer/app-layout/app-drawer/app-drawer';
import '@polymer/app-layout/app-header/app-header';
import '@polymer/app-layout/app-toolbar/app-toolbar';
import '@polymer/iron-icons/iron-icons';
import '@polymer/paper-icon-button/paper-icon-button';
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

    @property()
    page: string;
    @query('#routerOutlet')
    routerOutlet;
    router;

    async firstUpdated() {
        const pages = await ContentfulService.getRoutingData();
        this.router = new Router(this.routerOutlet);
        this.router.setRoutes([
            ...pages.items.map(p => ({
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
            
                <div id="routerOutlet"></div>
                
              </app-header-layout>
              
            </app-drawer-layout>
            
            ${this.page == null ? html`
              <div class="loading-overlay horizontal layout center-center">
                <paper-spinner-lite active></paper-spinner-lite>
              </div>` : null}
        `;
    }
}