import { Asset, Entry, IAsset, IEntry, ILink, isAsset, ISys } from "../base";

export interface IPageFields {
  name: string;
  description?: string;
  slug?: string;
  component?: string;
  body?: any;
  mainNavigationItem?: boolean;
  order?: number;
  image?: ILink<'Asset'> | IAsset;
}

/**
 * Page
 */
export interface IPage extends IEntry<IPageFields> {
}

export function isPage(entry: IEntry<any>): entry is IPage {
  return entry &&
    entry.sys &&
    entry.sys.contentType &&
    entry.sys.contentType.sys &&
    entry.sys.contentType.sys.id == 'page'
}

export class Page extends Entry<IPageFields> implements IPage {
  public readonly sys!: ISys<'Entry'>;
  public readonly fields!: IPageFields;

  get name(): string {
    return this.fields.name
  }

  get description(): string | undefined {
    return this.fields.description
  }

  get slug(): string | undefined {
    return this.fields.slug
  }

  get component(): string | undefined {
    return this.fields.component
  }

  get body(): any | undefined {
    return this.fields.body
  }

  get mainNavigationItem(): boolean | undefined {
    return this.fields.mainNavigationItem
  }

  get main_navigation_item(): boolean | undefined {
    return this.fields.mainNavigationItem
  }

  get order(): number | undefined {
    return this.fields.order
  }

  get image(): Asset | null | undefined {
    return !this.fields.image ? undefined :
      (isAsset(this.fields.image) ? new Asset(this.fields.image) : null)
  }

  constructor(entry: IPage);
  constructor(id: string, fields: IPageFields);
  constructor(entryOrId: IPage | string, fields?: IPageFields) {
    super(entryOrId, 'page', fields)
  }
}
