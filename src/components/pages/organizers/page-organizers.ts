import {customElement, html, property} from 'lit-element';
import {styleMap} from 'lit-html/directives/style-map';
import {repeat} from 'lit-html/directives/repeat';
import {until} from 'lit-html/directives/until';
import {Entry} from 'contentful';

import * as ContentfulService from '../../../services/contentful';
import {RouterPage} from '../../router-page';
import sharedStyles from '../../../styles/shared-styles.css';
import style from './page-organizers.css';
import {IOrganizerFields} from '../../../content-types/generated';

const groupByTeam = (teams: { [key: string]: IOrganizerFields[] }, org: Entry<IOrganizerFields>) => {
    const teamId = org.fields.inTeam &&
    org.fields.level &&
    org.fields.level !== 'General manager' &&
    org.fields.level !== 'Lead'
        ? org.fields.inTeam.sys.id : 'other';
    teams[teamId] = teams[teamId] || [];
    teams[teamId].push(org.fields);
    return teams;
};

@customElement('page-organizers')
class PageOrganizers extends RouterPage {

    static styles = [style, sharedStyles];

    teams = ContentfulService.getTeams();
    organizers = ContentfulService.getOrganizers()
        .then(orgs => orgs.reduce(groupByTeam, {}));

    @property() orgsByTeam = Promise.all([this.teams, this.organizers])
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
        });

    render() {
        return html`
          <div class="container">
            <h1 class="page-title">${this.pageData.name}</h1>
            <div class="page-content">
              
              ${until(this.orgsByTeam.then(teams => repeat(teams, team => html`
                
                ${team.team && team.organizers ? html`<h3 class="team-name">${team.team.name}</h3>` : null}
                
                <div class="horizontal layout wrap organizers">
                
                  ${team.organizers ? repeat(team.organizers, (organizer: any) => html`

                    <div class="organizer">
                      <div class="organizer-pic"
                           style=${styleMap({
                             backgroundImage: this.profilePicUrl(organizer),
                           })}></div>
                       
                       <div class="name">${organizer.name}</div>
                       
                       ${organizer.role ? html`<div>${organizer.role}</div>` : null}
                       
                    </div>
                    
                  `) : null}
                
                </div>
                
              `)))}
              
            </div>
          </div>
        `;
    }


    private profilePicUrl(organizer: any): string {
        return organizer.profilePicture ? `url(${organizer.profilePicture.fields.file.url})` : null;
    }
}
