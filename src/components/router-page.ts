import {LitElement} from 'lit-element';

export interface Location {
    baseUrl?: string;
    pathname?: string;
    redirectFrom?: string;
    route?: any;
    routes?: any[];
    params?: any;
    getUrl: Function;
}

export class RouterPage extends LitElement {
    location: Location;
}
