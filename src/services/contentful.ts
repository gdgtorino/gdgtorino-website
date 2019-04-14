import 'contentful/dist/contentful.browser';
import * as configuration from '../../config.json';

export declare var contentful: any;

const contentfulClient = contentful.createClient(configuration.contentful);

export const getRoutingData = (): Promise<any> => {
    return contentfulClient.getEntries({
        'content_type': 'page',
        select: 'fields.slug,fields.component,fields.mainNavigationItem,fields.name,fields.order',
    });
};

export const getGdg = (): Promise<any> => {
    return contentfulClient.getEntry('11pVnPX4AKqcCIAyyYwqI6');
};
