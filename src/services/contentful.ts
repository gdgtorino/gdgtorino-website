import {ContentfulClientApi, createClient, Entry, EntryCollection} from 'contentful';
import {Document} from '@contentful/rich-text-types';

import {
    IGdgFields,
    IOrganizerFields,
    IPageFields,
    IPartnerFields, ITeamFields,
} from '../content-types/generated';

const contentfulClient: ContentfulClientApi = createClient(<any>{
    space: 'CONTENTFUL_SPACE',
    accessToken: 'CONTENTFUL_ACCESS_TOKEN',
    managementToken: 'CONTENTFUL_MANAGEMENT_TOKEN',
});

export const getRoutingData = (): Promise<EntryCollection<IPageFields>> => {
    return contentfulClient.getEntries<IPageFields>({
        content_type: 'page',
        select: 'fields.slug,fields.component,fields.mainNavigationItem,fields.name,fields.order',
        order: 'fields.order',
    });
};

export const getPageBody = (id: string): Promise<Document> => {
    return contentfulClient.getEntries<IPageFields>({
        'sys.id': id,
        content_type: 'page',
        select: 'fields.body',
    }).then(res => res.items.length ? res.items[0].fields.body : null);
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

export const getOrganizers = (): Promise<Entry<IOrganizerFields>[]> => {
    return contentfulClient.getEntries<IOrganizerFields>({
        content_type: 'organizer',
        order: 'fields.level',
    }).then(data => data.items);
};

export const getTeams = (): Promise<EntryCollection<ITeamFields>> => {
    return contentfulClient.getEntries<ITeamFields>({
        content_type: 'team',
        order: 'fields.order',
    });
};
