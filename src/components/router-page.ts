import {LitElement} from 'lit-element';
import {IPageFields} from '../content-types/generated';
import {Document} from '@contentful/rich-text-types';

export interface Location {
    baseUrl?: string;
    pathname?: string;
    redirectFrom?: string;
    route?: any;
    routes?: any[];
    params?: any;
    getUrl: Function;
}

export interface PageData extends Partial<IPageFields> {
    getBody(): Promise<Document>;
}

export class RouterPage extends LitElement {
    location: Location;
    pageData: PageData;
    onBeforeEnter() {};
    onAfterEnter() {};
    onBeforeLeave() {};
    onAfterLeave() {};
}
