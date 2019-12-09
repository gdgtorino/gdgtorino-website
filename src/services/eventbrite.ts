const baseUrl = 'https://www.eventbriteapi.com/v3/';
const organizationId = 'EVENTBRITE_ORG_ID';
const token = 'EVENTBRITE_TOKEN';

const fetchJson = (input: RequestInfo, init?: RequestInit) => fetch(input, init)
    .then(r => r.json());
const cache: Map<string, any> = new Map();

export const getUpcomingEvents = (): Promise<any> => {
    const key = 'upcoming';
    if (cache.has(key)) {
        return cache.get(key);
    }
    //const res = fetchJson(`${baseUrl}events/search/?token=${token}&organizer.id=${organizationId}&sort_by=-date&expand=venue`);
    const res = fetchJson(`${baseUrl}organizers/${organizationId}/events/?token=${token}&order_by=start_desc&expand=venue&status=live`);
    cache.set(key, res);
    return res;
};

export const getPastEvents = (): Promise<any> => {
    const key = 'past';
    if (cache.has(key)) {
        return cache.get(key);
    }
    const res = fetchJson(`${baseUrl}organizers/${organizationId}/events/?token=${token}&order_by=start_desc&status=ended`);
    cache.set(key, res);
    return res;
};

export const getHighlightedEvents = async (): Promise<any> => {
    const upcoming = await getUpcomingEvents();
    if (upcoming.events.length > 0) {
        return upcoming.events.slice(0, 2);
    }
    const past = await getPastEvents();
    if (past.events.length > 1) {
        return past.events.slice(0, 2);
    }
    return [];
};
