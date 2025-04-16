import {StoryblokStory} from 'storyblok-generate-ts'

export interface BlockCareersStoryblok {
  background_color?: number | string;
  text_color?: number | string;
  headline?: string;
  items?: CareerItemStoryblok[];
  _uid: string;
  component: "block_careers";
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

export interface BlockCarouselStoryblok {
  title?: string;
  link?: Exclude<MultilinkStoryblok, {linktype?: "email"} | {linktype?: "asset"}>;
  slides: (SlideSplitStoryblok | SlideImagesStoryblok | SlideVideoStoryblok)[];
  autoplay: boolean;
  _uid: string;
  component: "block_carousel";
  [k: string]: any;
}

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

export interface BlockImageStoryblok {
  media: AssetStoryblok;
  ratio: number | string;
  ratio_desktop: number | string;
  _uid: string;
  component: "block_image";
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

export interface BlockSplitStoryblok {
  media?: AssetStoryblok;
  headline?: string;
  text: RichtextStoryblok;
  ratio?: number | string;
  ratio_desktop?: number | string;
  link?: LinkStoryblok[];
  reverse: boolean;
  background_color?: number | string;
  text_color?: number | string;
  _uid: string;
  component: "block_split";
  [k: string]: any;
}

export interface BlockTextStoryblok {
  headline?: string;
  text: RichtextStoryblok;
  link?: LinkStoryblok[];
  background_color?: number | string;
  text_color?: number | string;
  _uid: string;
  component: "block_text";
  [k: string]: any;
}

export interface BlockVideoStoryblok {
  poster: AssetStoryblok;
  video_mobile: AssetStoryblok;
  ratio_mobile: number | string;
  video_desktop?: AssetStoryblok;
  ratio_desktop: number | string;
  _uid: string;
  component: "block_video";
  [k: string]: any;
}

export interface CareerItemStoryblok {
  role: string;
  company: string;
  pdf: AssetStoryblok;
  email: string;
  _uid: string;
  component: "career_item";
  [k: string]: any;
}

export type MultiassetStoryblok = {
  alt?: string;
  copyright?: string;
  id: number;
  filename: string;
  name: string;
  title?: string;
  [k: string]: any;
}[];

export interface HeroCarouselStoryblok {
  images: MultiassetStoryblok;
  _uid: string;
  component: "hero_carousel";
  [k: string]: any;
}

export interface HeroImageStoryblok {
  media: AssetStoryblok;
  _uid: string;
  component: "hero_image";
  [k: string]: any;
}

export interface LinkStoryblok {
  title: string;
  link: Exclude<MultilinkStoryblok, {linktype?: "asset"}>;
  _uid: string;
  component: "link";
  [k: string]: any;
}

export interface PageStoryblok {
  hero?: (HeroImageStoryblok | HeroCarouselStoryblok)[];
  blocks?: (
    | BlockCareersStoryblok
    | BlockCarouselStoryblok
    | BlockImageStoryblok
    | BlockSplitStoryblok
    | BlockTextStoryblok
    | BlockVideoStoryblok
  )[];
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

export interface SlideImagesStoryblok {
  images?: MultiassetStoryblok;
  _uid: string;
  component: "slide_images";
  [k: string]: any;
}

export interface SlideSplitStoryblok {
  background_color?: number | string;
  text_color?: number | string;
  media?: AssetStoryblok;
  headline?: string;
  text: RichtextStoryblok;
  reverse: boolean;
  alignment_mobile?: "" | "top" | "bottom";
  _uid: string;
  component: "slide_split";
  [k: string]: any;
}

export interface SlideVideoStoryblok {
  poster: AssetStoryblok;
  video_mobile: AssetStoryblok;
  video_desktop?: AssetStoryblok;
  _uid: string;
  component: "slide_video";
  [k: string]: any;
}
