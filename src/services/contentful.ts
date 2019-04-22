import {ContentfulClientApi, createClient, Entry, EntryCollection} from 'contentful';
import {
    IGdgFields,
    IOrganizerFields,
    IPageFields,
    IPartnerFields, ITeamFields,
} from '../content-types/generated';
import * as configuration from '../../config.json';

const contentfulClient: ContentfulClientApi = createClient(configuration.contentful);

export const getRoutingData = (): Promise<EntryCollection<IPageFields>> => {
    return contentfulClient.getEntries<IPageFields>({
        content_type: 'page',
        select: 'fields.slug,fields.component,fields.mainNavigationItem,fields.name,fields.order',
        order: 'fields.order',
    });
};

export const getGdg = (): Promise<Entry<IGdgFields>> => {
    return contentfulClient.getEntry<IGdgFields>('11pVnPX4AKqcCIAyyYwqI6');
};

export const getPartners = (): Promise<EntryCollection<IPartnerFields>> => {
    return contentfulClient.getEntries<IPartnerFields>({
        'content_type': 'partner',
        select: 'fields.logo',
    });
};

export const getAbout = (): Promise<EntryCollection<IPageFields>> => {
    return contentfulClient.getEntries<IPageFields>({
        content_type: 'page',
        'fields.slug': 'about',
    });
};

export const getOrganizers = (): Promise<Entry<IOrganizerFields>[]> => {
    return contentfulClient.getEntries<IOrganizerFields>({
        content_type: 'organizer',
    }).then(data => data.items);
};

export const getTeams = (): Promise<EntryCollection<ITeamFields>> => {
    return contentfulClient.getEntries<ITeamFields>({
        content_type: 'team',
        order: 'fields.order',
    });
};
