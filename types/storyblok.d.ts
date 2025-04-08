import {StoryblokStory} from 'storyblok-generate-ts'

export interface AssetStoryblok {
  _uid?: string;
  id: number | null;
  alt: string | null;
  name: string;
  focus: string | null;
  source: string | null;
  title: string | null;
  filename: string;
  copyright: string | null;
  fieldtype?: string;
  meta_data?: null | {
    [k: string]: any;
  };
  is_external_url?: boolean;
  [k: string]: any;
}

export interface BlockMediaStoryblok {
  media: AssetStoryblok;
  ratio: number | string;
  ratio_desktop?: number | string;
  _uid: string;
  component: "block_media";
  [k: string]: any;
}

export interface RichtextStoryblok {
  type: string;
  content?: RichtextStoryblok[];
  marks?: RichtextStoryblok[];
  attrs?: any;
  text?: string;
  [k: string]: any;
}

export interface BlockTextStoryblok {
  background_color?: number | string;
  text_color?: number | string;
  headline?: string;
  text: RichtextStoryblok;
  link?: LinkStoryblok[];
  _uid: string;
  component: "block_text";
  [k: string]: any;
}

export interface HeroMediaStoryblok {
  media: AssetStoryblok;
  ratio: number | string;
  ratio_desktop?: number | string;
  _uid: string;
  component: "hero_media";
  [k: string]: any;
}

export type MultilinkStoryblok =
  | {
      id?: string;
      cached_url?: string;
      anchor?: string;
      linktype?: "story";
      target?: "_self" | "_blank";
      [k: string]: any;
    }
  | {
      url?: string;
      cached_url?: string;
      anchor?: string;
      linktype?: "asset" | "url";
      target?: "_self" | "_blank";
      [k: string]: any;
    }
  | {
      email?: string;
      linktype?: "email";
      target?: "_self" | "_blank";
      [k: string]: any;
    };

export interface LinkStoryblok {
  title: string;
  link: Exclude<MultilinkStoryblok, {linktype?: "asset"}>;
  _uid: string;
  component: "link";
  [k: string]: any;
}

export interface PageStoryblok {
  hero?: HeroMediaStoryblok[];
  blocks?: (BlockMediaStoryblok | BlockTextStoryblok)[];
  seo_title: string;
  seo_description: string;
  seo_image: AssetStoryblok;
  _uid: string;
  component: "page";
  uuid?: string;
  [k: string]: any;
}

export interface SettingsStoryblok {
  navigation_primary?: LinkStoryblok[];
  navigation_secondary?: LinkStoryblok[];
  studio_title?: string;
  studio?: RichtextStoryblok;
  places_title?: string;
  places?: RichtextStoryblok;
  contact_title?: string;
  contact?: RichtextStoryblok;
  _uid: string;
  component: "settings";
  [k: string]: any;
}
