import * as C from ".";
import { IEntry } from "../base";

export * from "./organizer";
export * from "./event";
export * from "./gdg";
export * from "./page";
export * from "./partner";
export * from "./social_link";
export * from "./team";

export interface TypeDirectory {
  'organizer': C.IOrganizer;
  'event': C.IEvent;
  'gdg': C.IGdg;
  'page': C.IPage;
  'partner': C.IPartner;
  'socialLink': C.ISocialLink;
  'team': C.ITeam;
}

export interface ClassDirectory {
  'organizer': C.Organizer;
  'event': C.Event;
  'gdg': C.Gdg;
  'page': C.Page;
  'partner': C.Partner;
  'socialLink': C.SocialLink;
  'team': C.Team;
}

export function wrap(entry: C.IOrganizer): C.Organizer;
export function wrap(entry: C.IEvent): C.Event;
export function wrap(entry: C.IGdg): C.Gdg;
export function wrap(entry: C.IPage): C.Page;
export function wrap(entry: C.IPartner): C.Partner;
export function wrap(entry: C.ISocialLink): C.SocialLink;
export function wrap(entry: C.ITeam): C.Team;
export function wrap<CT extends keyof TypeDirectory>(entry: TypeDirectory[CT]): ClassDirectory[CT];
export function wrap(entry: IEntry<any>): IEntry<any> {
  const id = entry.sys.contentType.sys.id
  switch (id) {
    case 'organizer':
      return new C.Organizer(entry)
    case 'event':
      return new C.Event(entry)
    case 'gdg':
      return new C.Gdg(entry)
    case 'page':
      return new C.Page(entry)
    case 'partner':
      return new C.Partner(entry)
    case 'socialLink':
      return new C.SocialLink(entry)
    case 'team':
      return new C.Team(entry)
    default:
      throw new Error('Unknown content type:' + id)
  }
}
