import { Entry, IEntry, ISys } from "../base";

export interface IEventFields {
  title?: string;
  description?: any;
  hashtag?: string;
  date?: string;
}

/**
 * Event
 */
export interface IEvent extends IEntry<IEventFields> {
}

export function isEvent(entry: IEntry<any>): entry is IEvent {
  return entry &&
    entry.sys &&
    entry.sys.contentType &&
    entry.sys.contentType.sys &&
    entry.sys.contentType.sys.id == 'event'
}

export class Event extends Entry<IEventFields> implements IEvent {
  public readonly sys!: ISys<'Entry'>;
  public readonly fields!: IEventFields;

  get title(): string | undefined {
    return this.fields.title
  }

  get description(): any | undefined {
    return this.fields.description
  }

  get hashtag(): string | undefined {
    return this.fields.hashtag
  }

  get date(): string | undefined {
    return this.fields.date
  }

  constructor(entry: IEvent);
  constructor(id: string, fields: IEventFields);
  constructor(entryOrId: IEvent | string, fields?: IEventFields) {
    super(entryOrId, 'event', fields)
  }
}
