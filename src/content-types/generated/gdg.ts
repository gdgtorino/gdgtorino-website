import { wrap } from ".";
import { Asset, Entry, IAsset, IEntry, ILink, isAsset, isEntry, ISys } from "../base";
import { ISocialLink, SocialLink } from "./social_link";

export interface IGdgFields {
  location: string;
  logo?: ILink<'Asset'> | IAsset;
  email?: string;
  description?: string;
  abstract?: string;
  socialLinks?: Array<ILink<'Entry'> | ISocialLink>;
  mainGallery?: Array<ILink<'Asset'> | IAsset>;
}

/**
 * GDG
 */
export interface IGdg extends IEntry<IGdgFields> {
}

export function isGdg(entry: IEntry<any>): entry is IGdg {
  return entry &&
    entry.sys &&
    entry.sys.contentType &&
    entry.sys.contentType.sys &&
    entry.sys.contentType.sys.id == 'gdg'
}

export class Gdg extends Entry<IGdgFields> implements IGdg {
  public readonly sys!: ISys<'Entry'>;
  public readonly fields!: IGdgFields;

  get location(): string {
    return this.fields.location
  }

  get logo(): Asset | null | undefined {
    return !this.fields.logo ? undefined :
      (isAsset(this.fields.logo) ? new Asset(this.fields.logo) : null)
  }

  get email(): string | undefined {
    return this.fields.email
  }

  get description(): string | undefined {
    return this.fields.description
  }

  get abstract(): string | undefined {
    return this.fields.abstract
  }

  get socialLinks(): Array<SocialLink | null> | undefined {
    return !this.fields.socialLinks ? undefined :
      this.fields.socialLinks.map((item) =>
        isEntry(item) ? wrap<'socialLink'>(item) : null
      )
  }

  get social_links(): Array<SocialLink | null> | undefined {
    return !this.fields.socialLinks ? undefined :
      this.fields.socialLinks.map((item) =>
        isEntry(item) ? wrap<'socialLink'>(item) : null
      )
  }

  get mainGallery(): Array<Asset | null> | undefined {
    return !this.fields.mainGallery ? undefined :
      this.fields.mainGallery.map((item) =>
        isAsset(item) ? new Asset(item) : null
      )
  }

  get main_gallery(): Array<Asset | null> | undefined {
    return !this.fields.mainGallery ? undefined :
      this.fields.mainGallery.map((item) =>
        isAsset(item) ? new Asset(item) : null
      )
  }

  constructor(entry: IGdg);
  constructor(id: string, fields: IGdgFields);
  constructor(entryOrId: IGdg | string, fields?: IGdgFields) {
    super(entryOrId, 'gdg', fields)
  }
}
