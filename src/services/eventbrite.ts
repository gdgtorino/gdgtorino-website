const baseUrl = 'https://www.eventbriteapi.com/v3/';
import * as configuration from '../../config.json';

const {organizationId, token} = configuration.eventbrite;

export const fetchUpcomingEvents = () => {
    return fetch(`${baseUrl}events/search/?token=${token}&organizer.id=${organizationId}&sort_by=-date&expand=venue`)
        .then(r => r.json());
};

export const fetchPastEvents = () => {
    return fetch(`${baseUrl}organizers/${organizationId}/events/?token=${token}&order_by=start_desc&status=ended`)
        .then(r => r.json());
};
