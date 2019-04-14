import * as configuration from '../../config.json';

const baseUrl = 'https://www.eventbriteapi.com/v3/';
const {organizationId, token} = configuration.eventbrite;
const fetchJson = (input: RequestInfo, init?: RequestInit) => fetch(input, init)
    .then(r => r.json());

export const fetchUpcomingEvents = () => {
    return fetchJson(`${baseUrl}events/search/?token=${token}&organizer.id=${organizationId}&sort_by=-date&expand=venue`);
};

export const fetchPastEvents = () => {
    return fetchJson(`${baseUrl}organizers/${organizationId}/events/?token=${token}&order_by=start_desc&status=ended`);
};
