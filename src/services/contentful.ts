import 'contentful/dist/contentful.browser';

export declare var contentful: any;

const contentfulClient = contentful.createClient({
    space: 'g6xke51oy32b',
    accessToken: '89f161385ef04d41070200fb9b8da5987a405a945cc755b83820d7f656b90730',
});

export const getRoutingData = (): Promise<any> => {
    return contentfulClient.getEntries({
        'content_type': 'page',
        select: 'fields.slug,fields.component,fields.mainNavigationItem,fields.name,fields.order',
    });
};

export const getGdg = (): Promise<any> => {
    return contentfulClient.getEntry('11pVnPX4AKqcCIAyyYwqI6');
};
