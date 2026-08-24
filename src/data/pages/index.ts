import { PageData, homePageData } from "./home";
import { approachPageData } from "./approach";
import { aiappbuilderPageData } from "./aiappbuilder";
import { dubaiaiPageData } from "./dubaiai";
import { sonyPageData } from "./sony";
import { thefriedkingroupPageData } from "./thefriedkingroup";
import { amnhealthcarePageData } from "./amnhealthcare";

export type { PageData };

export type PageSlug = 
  | "home"
  | "approach"
  | "aiappbuilder"
  | "dubaiai"
  | "sony"
  | "thefriedkingroup"
  | "amnhealthcare";

export const PAGES: Record<PageSlug, PageData> = {
  home: homePageData,
  approach: approachPageData,
  aiappbuilder: aiappbuilderPageData,
  dubaiai: dubaiaiPageData,
  sony: sonyPageData,
  thefriedkingroup: thefriedkingroupPageData,
  amnhealthcare: amnhealthcarePageData
};

export const ROUTE_TO_SLUG: Record<string, PageSlug> = {
  "/": "home",
  "/home": "home",
  "/approach": "approach",
  "/aiappbuilder": "aiappbuilder",
  "/dubaiai": "dubaiai",
  "/sony": "sony",
  "/thefriedkingroup": "thefriedkingroup",
  "/amnhealthcare": "amnhealthcare"
};
