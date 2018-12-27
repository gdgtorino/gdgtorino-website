const baseUrl = 'https://www.eventbriteapi.com/v3/';
const organizationId = '9764068365';
const token = 'DPXS6C3R4TYXRBQ4UDCD';

export const fetchAllEvents = () => {
    return fetch(`${baseUrl}organizers/${organizationId}/events/?token=${token}`)
        .then(r => r.json());
};