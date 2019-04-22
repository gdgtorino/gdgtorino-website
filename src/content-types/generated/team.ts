import { Entry, IEntry, ISys } from "../base";

export interface ITeamFields {
  name?: string;
  description?: string;
  order?: number;
}

/**
 * Team
 */
export interface ITeam extends IEntry<ITeamFields> {
}

export function isTeam(entry: IEntry<any>): entry is ITeam {
  return entry &&
    entry.sys &&
    entry.sys.contentType &&
    entry.sys.contentType.sys &&
    entry.sys.contentType.sys.id == 'team'
}

export class Team extends Entry<ITeamFields> implements ITeam {
  public readonly sys!: ISys<'Entry'>;
  public readonly fields!: ITeamFields;

  get name(): string | undefined {
    return this.fields.name
  }

  get description(): string | undefined {
    return this.fields.description
  }

  get order(): number | undefined {
    return this.fields.order
  }

  constructor(entry: ITeam);
  constructor(id: string, fields: ITeamFields);
  constructor(entryOrId: ITeam | string, fields?: ITeamFields) {
    super(entryOrId, 'team', fields)
  }
}
