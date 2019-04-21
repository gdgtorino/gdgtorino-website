import * as contentful from 'contentful';
import * as configuration from '../../config.json';


const contentfulClient = contentful.createClient(configuration.contentful);

export const getRoutingData = (): Promise<any> => {
    return contentfulClient.getEntries({
        content_type: 'page',
        select: 'fields.slug,fields.component,fields.mainNavigationItem,fields.name,fields.order',
    });
};

export const getGdg = (): Promise<any> => {
    return contentfulClient.getEntry('11pVnPX4AKqcCIAyyYwqI6');
};

export const getPartners = (): Promise<any> => {
    return contentfulClient.getEntries({
        'content_type': 'partner',
        select: 'fields.logo',
    });
};

export const getAbout = (): Promise<any> => {
    return contentfulClient.getEntries({
        content_type: 'page',
        'fields.slug': 'about',
    });
};
