import {customElement, html, property} from 'lit-element';
import {until} from 'lit-html/directives/until';

import {RouterPage} from '../router-page';
import {sharedStyles} from '../../styles/shared-styles';
import * as ContentfulService from '../../services/contentful';
import * as EventbriteService from '../../services/eventbrite';
import '@polymer/iron-icons/iron-icons';
import '@polymer/iron-icon/iron-icon';
import '../event-ticket';

@customElement('page-home')
class PageHome extends RouterPage {

    @property() gdg = ContentfulService.getGdg();

    render() {
        return html`
          ${sharedStyles}
          <style>
            .intro {
              padding-top: 80px;
              overflow: auto;
            }  
              
            .abstract {
              max-width: 600px;
              color: inherit;
              font-size: 28px;
            }
            
            .group-photo {
              width: 700px;
              height: auto;
              float: right;
              shape-outside: polygon(100% 0%, 100% 100%, 0% 100%, 0% 30%, 40% 13%);
            }
            
            .body-link {
              color: inherit;
              text-decoration: none;
            }
            
            .body-link:hover {
              text-decoration: underline;
            }
          </style>
          
          <div class="container section intro">
            <img src="../../../assets/images/group-photo.png" class="group-photo">
            
            <h2 class="abstract">
              ${until(this.gdg.then(gdg => gdg.fields.abstract))}
            </h2>
          </div>
          
          <div class="section grey-bg">
            <div class="container">
              <div class="horizontal layout center">
                <h3 class="flex">Il prossimo evento</h3>
                <a href="/events" class="body-link">Tutti gli eventi <iron-icon icon="arrow-forward"></iron-icon></a>
              </div>
              ${until(EventbriteService.fetchPastEvents().then(data => html`
                <event-ticket .event=${data.events[0]}></event-ticket>
              `))}
            </div>
          </div>
          
          <div class="container section">
            <h3>I nostri partner</h3>
            <div style="height: 250px;"></div>
          </div>
        `;
    }

}
