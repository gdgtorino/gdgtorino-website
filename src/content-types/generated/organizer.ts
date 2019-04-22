import { wrap } from ".";
import { Asset, Entry, IAsset, IEntry, ILink, isAsset, isEntry, ISys } from "../base";
import { ITeam, Team } from "./team";

export interface IOrganizerFields {
  name?: string;
  profilePicture?: ILink<'Asset'> | IAsset;
  role?: string;
  bio?: string;
  linkedin?: string;
  website?: string;
  inTeam?: ILink<'Entry'> | ITeam;
}

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

  get profilePicture(): Asset | null | undefined {
    return !this.fields.profilePicture ? undefined :
      (isAsset(this.fields.profilePicture) ? new Asset(this.fields.profilePicture) : null)
  }

  get profile_picture(): Asset | null | undefined {
    return !this.fields.profilePicture ? undefined :
      (isAsset(this.fields.profilePicture) ? new Asset(this.fields.profilePicture) : null)
  }

  get role(): string | undefined {
    return this.fields.role
  }

  get bio(): string | undefined {
    return this.fields.bio
  }

  get linkedin(): string | undefined {
    return this.fields.linkedin
  }

  get website(): string | undefined {
    return this.fields.website
  }

  get inTeam(): Team | null | undefined {
    return !this.fields.inTeam ? undefined :
      (isEntry(this.fields.inTeam) ? wrap<'team'>(this.fields.inTeam) : null)
  }

  get in_team(): Team | null | undefined {
    return !this.fields.inTeam ? undefined :
      (isEntry(this.fields.inTeam) ? wrap<'team'>(this.fields.inTeam) : null)
  }

  constructor(entry: IOrganizer);
  constructor(id: string, fields: IOrganizerFields);
  constructor(entryOrId: IOrganizer | string, fields?: IOrganizerFields) {
    super(entryOrId, 'organizer', fields)
  }
}
