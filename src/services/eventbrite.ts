const baseUrl = 'https://www.eventbriteapi.com/v3/';
const organizationId = '9764068365';
const token = 'DPXS6C3R4TYXRBQ4UDCD';

export const fetchUpcomingEvents = () => {
    return fetch(`${baseUrl}events/search/?token=${token}&organizer.id=${organizationId}&sort_by=-date&expand=venue`)
        .then(r => r.json());
};

export const fetchPastEvents = () => {
    return fetch(`${baseUrl}organizers/${organizationId}/events/?token=${token}&order_by=start_desc&status=ended`)
        .then(r => r.json());
};
