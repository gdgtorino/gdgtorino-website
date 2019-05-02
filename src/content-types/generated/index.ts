import * as C from ".";
import { IEntry } from "../base";

export * from "./gdg";
export * from "./organizer";
export * from "./event";
export * from "./page";
export * from "./social_link";
export * from "./team";
export * from "./partner";

export interface TypeDirectory {
  'gdg': C.IGdg;
  'organizer': C.IOrganizer;
  'event': C.IEvent;
  'page': C.IPage;
  'socialLink': C.ISocialLink;
  'team': C.ITeam;
  'partner': C.IPartner;
}

export interface ClassDirectory {
  'gdg': C.Gdg;
  'organizer': C.Organizer;
  'event': C.Event;
  'page': C.Page;
  'socialLink': C.SocialLink;
  'team': C.Team;
  'partner': C.Partner;
}

export function wrap(entry: C.IGdg): C.Gdg;
export function wrap(entry: C.IOrganizer): C.Organizer;
export function wrap(entry: C.IEvent): C.Event;
export function wrap(entry: C.IPage): C.Page;
export function wrap(entry: C.ISocialLink): C.SocialLink;
export function wrap(entry: C.ITeam): C.Team;
export function wrap(entry: C.IPartner): C.Partner;
export function wrap<CT extends keyof TypeDirectory>(entry: TypeDirectory[CT]): ClassDirectory[CT];
export function wrap(entry: IEntry<any>): IEntry<any> {
  const id = entry.sys.contentType.sys.id
  switch (id) {
    case 'gdg':
      return new C.Gdg(entry)
    case 'organizer':
      return new C.Organizer(entry)
    case 'event':
      return new C.Event(entry)
    case 'page':
      return new C.Page(entry)
    case 'socialLink':
      return new C.SocialLink(entry)
    case 'team':
      return new C.Team(entry)
    case 'partner':
      return new C.Partner(entry)
    default:
      throw new Error('Unknown content type:' + id)
  }
}
