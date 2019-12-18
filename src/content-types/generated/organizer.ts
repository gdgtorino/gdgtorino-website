import { wrap } from ".";
import { Asset, Entry, IAsset, IEntry, ILink, isAsset, isEntry, ISys } from "../base";
import { ISocialLink, SocialLink } from "./social_link";
import { ITeam, Team } from "./team";

export interface IOrganizerFields {
  name?: string;
  inTeam?: ILink<'Entry'> | ITeam;
  level?: OrganizerLevel;
  role?: string;
  profilePicture?: ILink<'Asset'> | IAsset;
  socialLinks?: Array<ILink<'Entry'> | ISocialLink>;
  bio?: string;
  website?: string;
}

export type OrganizerLevel = '1 Main lead' | '2 Lead' | '3 Organizer' | '4 Supporter' | '5 Mentor';

/**
 * Organizer
 */
export interface IOrganizer extends IEntry<IOrganizerFields> {
}

export function isOrganizer(entry: IEntry<any>): entry is IOrganizer {
  return entry &&
    entry.sys &&
    entry.sys.contentType &&
    entry.sys.contentType.sys &&
    entry.sys.contentType.sys.id == 'organizer'
}

export class Organizer extends Entry<IOrganizerFields> implements IOrganizer {
  public readonly sys!: ISys<'Entry'>;
  public readonly fields!: IOrganizerFields;

  get name(): string | undefined {
    return this.fields.name
  }

  get inTeam(): Team | null | undefined {
    return !this.fields.inTeam ? undefined :
      (isEntry(this.fields.inTeam) ? wrap<'team'>(this.fields.inTeam) : null)
  }

  get in_team(): Team | null | undefined {
    return !this.fields.inTeam ? undefined :
      (isEntry(this.fields.inTeam) ? wrap<'team'>(this.fields.inTeam) : null)
  }

  get level(): OrganizerLevel | undefined {
    return this.fields.level
  }

  get role(): string | undefined {
    return this.fields.role
  }

  get profilePicture(): Asset | null | undefined {
    return !this.fields.profilePicture ? undefined :
      (isAsset(this.fields.profilePicture) ? new Asset(this.fields.profilePicture) : null)
  }

  get profile_picture(): Asset | null | undefined {
    return !this.fields.profilePicture ? undefined :
      (isAsset(this.fields.profilePicture) ? new Asset(this.fields.profilePicture) : null)
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

  get bio(): string | undefined {
    return this.fields.bio
  }

  get website(): string | undefined {
    return this.fields.website
  }

  constructor(entry: IOrganizer);
  constructor(id: string, fields: IOrganizerFields);
  constructor(entryOrId: IOrganizer | string, fields?: IOrganizerFields) {
    super(entryOrId, 'organizer', fields)
  }
}
