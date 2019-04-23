import * as C from ".";
import { IEntry } from "../base";

export * from "./social_link";
export * from "./organizer";
export * from "./event";
export * from "./gdg";
export * from "./partner";
export * from "./team";
export * from "./page";

export interface TypeDirectory {
  'socialLink': C.ISocialLink;
  'organizer': C.IOrganizer;
  'event': C.IEvent;
  'gdg': C.IGdg;
  'partner': C.IPartner;
  'team': C.ITeam;
  'page': C.IPage;
}

export interface ClassDirectory {
  'socialLink': C.SocialLink;
  'organizer': C.Organizer;
  'event': C.Event;
  'gdg': C.Gdg;
  'partner': C.Partner;
  'team': C.Team;
  'page': C.Page;
}

export function wrap(entry: C.ISocialLink): C.SocialLink;
export function wrap(entry: C.IOrganizer): C.Organizer;
export function wrap(entry: C.IEvent): C.Event;
export function wrap(entry: C.IGdg): C.Gdg;
export function wrap(entry: C.IPartner): C.Partner;
export function wrap(entry: C.ITeam): C.Team;
export function wrap(entry: C.IPage): C.Page;
export function wrap<CT extends keyof TypeDirectory>(entry: TypeDirectory[CT]): ClassDirectory[CT];
export function wrap(entry: IEntry<any>): IEntry<any> {
  const id = entry.sys.contentType.sys.id
  switch (id) {
    case 'socialLink':
      return new C.SocialLink(entry)
    case 'organizer':
      return new C.Organizer(entry)
    case 'event':
      return new C.Event(entry)
    case 'gdg':
      return new C.Gdg(entry)
    case 'partner':
      return new C.Partner(entry)
    case 'team':
      return new C.Team(entry)
    case 'page':
      return new C.Page(entry)
    default:
      throw new Error('Unknown content type:' + id)
  }
}
