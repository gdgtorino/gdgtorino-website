import {customElement, html, property} from 'lit-element';
import {RouterPage} from '../../router-page';

import * as ContentfulService from '../../../services/contentful';
import sharedStyles from '../../../styles/shared-styles.css';
import style from './page-team.css';
import {repeat} from 'lit-html/directives/repeat';
import {until} from 'lit-html/directives/until';
import {IOrganizerFields, ITeamFields} from '../../../content-types/generated';
import {Entry, EntryCollection} from 'contentful';
import {styleMap} from 'lit-html/directives/style-map';

const groupByTeam = (teams: { [key: string]: IOrganizerFields[] }, org: Entry<IOrganizerFields>) => {
    const teamId = org.fields.inTeam ? org.fields.inTeam.sys.id : 'other';
    teams[teamId] = teams[teamId] || [];
    teams[teamId].push(org.fields);
    return teams;
};

@customElement('page-team')
class PageTeam extends RouterPage {

    static styles = [style, sharedStyles];

    teams = ContentfulService.getTeams();
    organizers = ContentfulService.getOrganizers()
        .then(orgs => orgs.reduce(groupByTeam, {}));

    @property() orgsByTeam = Promise.all([this.teams, this.organizers])
        .then(([teams, organizers]) => {
            const res = [];
            for (const teamId in organizers) {
                const teamData = teams.items.find(team => team.sys.id === teamId);
                if (teamData) {
                    res.push({
                        team: teamData,
                        organizers: organizers[teamId],
                    });
                }
            }
            res.unshift({
                organizers: organizers['other'],
            });
            return res;
        });

    render() {
        return html`
          <div class="container">
            <h1 class="page-title">Team</h1>
            <div class="page-content">
              ${until(this.orgsByTeam.then(teams => repeat(teams, team => html`
                ${team.team ? html`<h3 class="team-name">${team.team.fields.name}</h3>` : null}
                
                <div class="horizontal layout wrap organizers">
                ${repeat(team.organizers, (organizer: any) => html`
                  <div class="organizer">
                    <div class="organizer-pic"
                         style=${styleMap({
            backgroundImage: this.profilePicUrl(organizer),
        })}></div>
                     <div class="name">${organizer.name}</div>
                     ${organizer.role ? html`<div>${organizer.role}</div>` : null}
                  </div>
                `)}
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
