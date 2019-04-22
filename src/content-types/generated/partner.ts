import { Asset, Entry, IAsset, IEntry, ILink, isAsset, ISys } from "../base";

export interface IPartnerFields {
  name: string;
  logo: ILink<'Asset'> | IAsset;
}

/**
 * Partner
 */
export interface IPartner extends IEntry<IPartnerFields> {
}

export function isPartner(entry: IEntry<any>): entry is IPartner {
  return entry &&
    entry.sys &&
    entry.sys.contentType &&
    entry.sys.contentType.sys &&
    entry.sys.contentType.sys.id == 'partner'
}

export class Partner extends Entry<IPartnerFields> implements IPartner {
  public readonly sys!: ISys<'Entry'>;
  public readonly fields!: IPartnerFields;

  get name(): string {
    return this.fields.name
  }

  get logo(): Asset | null {
    return (isAsset(this.fields.logo) ? new Asset(this.fields.logo) : null)
  }

  constructor(entry: IPartner);
  constructor(id: string, fields: IPartnerFields);
  constructor(entryOrId: IPartner | string, fields?: IPartnerFields) {
    super(entryOrId, 'partner', fields)
  }
}
