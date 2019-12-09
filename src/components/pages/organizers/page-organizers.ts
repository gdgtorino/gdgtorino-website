import {customElement, html, property} from 'lit-element';
import {styleMap} from 'lit-html/directives/style-map';
import {repeat} from 'lit-html/directives/repeat';
import {until} from 'lit-html/directives/until';
import {Entry} from 'contentful';

import * as ContentfulService from '../../../services/contentful';
import {RouterPage} from '../router-page';
import sharedStyles from '../../../styles/shared-styles.css';
import style from './page-organizers.css';
import basscssGrid from 'basscss-grid/css/grid.css';
import basscssFlex from 'basscss-flexbox/css/flexbox.css';
import basscssLayout from 'basscss-layout/css/layout.css';
import basscssMargin from 'basscss-margin/css/margin.css';
import {IOrganizerFields, Organizer} from '../../../content-types/generated';
import {renderErrorView} from '../../error-view/error-view';

/*const groupByTeam = (teams: { [key: string]: IOrganizerFields[] }, org: Entry<IOrganizerFields>) => {
    const teamId = org.fields.inTeam &&
    org.fields.level &&
    org.fields.level !== 'General manager' &&
    org.fields.level !== 'Lead' &&
    org.fields.level !== 'Mentor'
        ? org.fields.inTeam.sys.id : 'other';
    teams[teamId] = teams[teamId] || [];
    teams[teamId].push(org.fields);
    return teams;
};*/

const getTeamId = (teamName: string) => teamName.replace(/ /g, '-')
    .toLowerCase()
    .trim();

@customElement('page-organizers')
class PageOrganizers extends RouterPage {

    static styles = [style, sharedStyles, basscssFlex, basscssGrid, basscssLayout, basscssMargin];

    teams = ContentfulService.getTeams();
    organizers = ContentfulService.getOrganizers();
        // .then(orgs => orgs.reduce(groupByTeam, {}));

    /*@property() orgsByTeam = Promise.all([this.teams, this.organizers])
        .then(([teams, organizers]) => {
            return [
                {
                    team: {name: 'Leads'},
                    organizers: organizers['other'],
                },
                ...teams.items.map(team => ({
                    team: team.fields,
                    organizers: organizers[team.sys.id],
                })),
            ];
        });*/

    render() {
        return html`
          <div class="container">
            <h1 class="page-title">${this.pageData.name}</h1>
            <div class="page-content">
              
              <div class="clearfix organizers">
              
              ${until(this.organizers.then(orgs => repeat(orgs, (organizer: any) => html`
                
                    <div class="organizer sm-col sm-col-6 md-col-4 lg-col-3">
                      <div class="organizer-pic"
                           style=${styleMap({
                             backgroundImage: this.profilePicUrl(organizer),
                           })}> 
                      </div>
                      
                      ${organizer.fields.inTeam ? html`
                        <span class="team-badge ${getTeamId(organizer.fields.inTeam.fields.name)}"
                              title="Sono in ${organizer.fields.inTeam.fields.name.toLowerCase()}!">                              
                        </span>
                      ` : null}
                       
                      <div class="name">${organizer.fields.name}</div>
                       
                       ${organizer.fields.role ? html`<div>${organizer.fields.role}</div>` : null}
                       
                       ${organizer.fields.socialLinks ? html`
                         <div class="social-links">
                           
                           ${repeat(organizer.fields.socialLinks, (link: any) => html`
                             <a href=${link.fields.url} target="_blank" rel="noopener"><img src=${link.fields.icon.fields.file.url}></a>
                           `)}
                           
                         </div>
                       ` : null}
                       
                    </div>
                    
              `)).catch(renderErrorView))}
              
              </div>
              
            </div>
          </div>
        `;
    }

    private profilePicUrl(organizer: any): string {
        return organizer.fields.profilePicture ? `url(${organizer.fields.profilePicture.fields.file.url})` : null;
    }
}
