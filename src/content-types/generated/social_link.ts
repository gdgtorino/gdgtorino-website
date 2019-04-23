import { Asset, Entry, IAsset, IEntry, ILink, isAsset, ISys } from "../base";

export interface ISocialLinkFields {
  text?: string;
  url: string;
  icon: ILink<'Asset'> | IAsset;
}

/**
 * Social link
 */
export interface ISocialLink extends IEntry<ISocialLinkFields> {
}

export function isSocialLink(entry: IEntry<any>): entry is ISocialLink {
  return entry &&
    entry.sys &&
    entry.sys.contentType &&
    entry.sys.contentType.sys &&
    entry.sys.contentType.sys.id == 'socialLink'
}

export class SocialLink extends Entry<ISocialLinkFields> implements ISocialLink {
  public readonly sys!: ISys<'Entry'>;
  public readonly fields!: ISocialLinkFields;

  get text(): string | undefined {
    return this.fields.text
  }

  get url(): string {
    return this.fields.url
  }

  get icon(): Asset | null {
    return (isAsset(this.fields.icon) ? new Asset(this.fields.icon) : null)
  }

  constructor(entry: ISocialLink);
  constructor(id: string, fields: ISocialLinkFields);
  constructor(entryOrId: ISocialLink | string, fields?: ISocialLinkFields) {
    super(entryOrId, 'socialLink', fields)
  }
}
