import * as C from ".";
import { IEntry } from "../base";

export * from "./event";
export * from "./page";
export * from "./gdg";
export * from "./organizer";
export * from "./partner";
export * from "./team";
export * from "./social_link";

export interface TypeDirectory {
  'event': C.IEvent;
  'page': C.IPage;
  'gdg': C.IGdg;
  'organizer': C.IOrganizer;
  'partner': C.IPartner;
  'team': C.ITeam;
  'socialLink': C.ISocialLink;
}

export interface ClassDirectory {
  'event': C.Event;
  'page': C.Page;
  'gdg': C.Gdg;
  'organizer': C.Organizer;
  'partner': C.Partner;
  'team': C.Team;
  'socialLink': C.SocialLink;
}

export function wrap(entry: C.IEvent): C.Event;
export function wrap(entry: C.IPage): C.Page;
export function wrap(entry: C.IGdg): C.Gdg;
export function wrap(entry: C.IOrganizer): C.Organizer;
export function wrap(entry: C.IPartner): C.Partner;
export function wrap(entry: C.ITeam): C.Team;
export function wrap(entry: C.ISocialLink): C.SocialLink;
export function wrap<CT extends keyof TypeDirectory>(entry: TypeDirectory[CT]): ClassDirectory[CT];
export function wrap(entry: IEntry<any>): IEntry<any> {
  const id = entry.sys.contentType.sys.id
  switch (id) {
    case 'event':
      return new C.Event(entry)
    case 'page':
      return new C.Page(entry)
    case 'gdg':
      return new C.Gdg(entry)
    case 'organizer':
      return new C.Organizer(entry)
    case 'partner':
      return new C.Partner(entry)
    case 'team':
      return new C.Team(entry)
    case 'socialLink':
      return new C.SocialLink(entry)
    default:
      throw new Error('Unknown content type:' + id)
  }
}
