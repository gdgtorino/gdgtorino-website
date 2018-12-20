import {customElement, html, LitElement} from '@polymer/lit-element';
import {until} from "lit-html/directives/until";

class Event {
    private _eventName: String = "event name goes here";

    //TODO add other proerties
    constructor(eventName: String) {
        this._eventName = eventName;
    }

    get eventName(): String {
        return this._eventName;
    }


}

@customElement('page-events' as any)
class PageEvents extends LitElement {
    private url = "https://www.eventbriteapi.com/v3/organizers/9764068365/events/?token=DPXS6C3R4TYXRBQ4UDCD";
    private events;
    private eventList: Array<Event> = new Array<Event>();

    render() {
        return html`
          <h1>Events</h1>
          ${
            until(this.fetchEvents(),
                html`<div>Loading...</div>`)
            }
        `;
    }

    async fetchEvents() {
        await fetch(this.url).then(response => {
            return response.json();
        }).then(data => {
            // Work with JSON data here
            this.events = data.events;
            data.events.forEach(e => {
                let eventName: String = e.name.text;
                console.log(eventName);
                this.eventList.push(new Event(eventName));
            });
            console.log(this.eventList);
        }).catch(err => {
            // toDo something for an error here
            console.log(err);
        });
        return this.renderEvents();
    }

    renderEvents() {
        return JSON.stringify(this.eventList);
    }
}