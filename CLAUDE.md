# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Marketing website for Smith & Willis hospitality group (London). Built by Ditta Studio. Stack: **Nuxt 4 + Vue 3 + TypeScript + Tailwind CSS v4 + Storyblok CMS**.

## Commands

```bash
npm run dev          # Pull Storyblok schemas + generate types, then run dev server
npm run dev:ssl      # SSL proxy on :3010 → :3000 (required for Storyblok Visual Editor)
npm run build        # nuxt build
npm run generate     # nuxt generate (static)
npm run lint         # eslint .
npm run lint:fix     # eslint . --fix
npm run sb:components  # Pull component schemas from Storyblok space 332344
npm run sb:types       # Regenerate TS types from Storyblok schema
npm run nuke         # Delete .output, dist, .nuxt, node_modules, package-lock.json
```

No test framework is installed.

## Architecture

### Routing
Single catch-all page: `app/pages/[...slug].vue`. Every route maps to a Storyblok story fetched via `useStory(route.path)`. `storyblokSlug()` maps `/` → `/home`.

### Data fetching
`app/composables/useStory.ts` is the sole Storyblok data-fetching entry point — wraps `useAsyncStoryblok`, reads `STORYBLOK_VERSION` from runtime config, bridges for live editing, throws a fatal 404 if not found. `app.vue` fetches the global `/settings` story once; the page fetches its own story. For datasource entries (e.g. careers), call `useStoryblokApi()` + `useAsyncData` directly.

### Page rendering
`AppComponents.vue` is the block renderer. It iterates `content.hero[]` (renders `HeroImage` / `HeroCarousel`) and `content.blocks[]` (renders one of `BlockCareers`, `BlockCarousel`, `BlockImage`, `BlockSplit`, `BlockText`, `BlockVideo`) based on the `component` field. Background/text colour CSS classes are applied at the section level via `colourBackground`/`colourText` maps in `app/utils/maps.ts`.

### Component conventions
- `app/components/` is namespace-prefixed by folder: `app/Header.vue` → `<AppHeader>`.
- All components: `<script lang="ts" setup>` + `defineProps<Props>()` with an inline `interface Props {}`.
- Scoped styles use `@reference "@/assets/css/main.css"` to access Tailwind theme tokens inside `<style scoped>`.
- Apply `v-editable="block"` to block root elements for Storyblok Visual Editor.
- SVGs are imported as Vue components via `vite-svg-loader`.

### CSS
Tailwind CSS v4 via `@tailwindcss/vite` (not PostCSS). All design tokens are defined in `app/assets/css/main.css` `@theme` block. Custom breakpoints: `2xs:375`, `xs:480`, `sm:600`, `md:800`, `lg:1200`, `xl:1440`, `2xl:1800`. Custom fonts: Season Sans (sans), Tiempos Text (serif). `postcss-nested` is enabled for nested syntax in plain CSS.

Typography uses named utility classes from `app/assets/css/typography.css` (e.g. `type-serif-large-caps`, `type-serif-medium`) — prefer these over ad-hoc Tailwind text classes. Use `twMerge` from `app/utils/twMerge.ts` (extended config) when conditionally merging Tailwind classes.

### Types
CMS types are auto-generated at `.storyblok/types/332344/storyblok-components.d.ts` — import from there for all Storyblok content shapes. Global app types live in `types/app.d.ts` (`TAspectRatios`, `ImageDimensions`, `Theme`).

### Key utilities (all auto-imported)
- `storyblokImage()` — builds optimised Storyblok image URLs via `@nuxt/image`
- `storyblokSlug()` — normalises paths for Storyblok lookups
- `getMediaQuery(breakpoint)` — returns a media query string from Tailwind CSS custom properties at runtime (keeps JS in sync with CSS theme)
- `safeKebabCase()`, `wait()`, `scrollToWithEasing()` — general helpers in `app/utils/helpers.ts`

### Environment variables
- `STORYBLOK_TOKEN` (public) — Storyblok access token
- `STORYBLOK_VERSION` (public) — `"published"` or `"draft"`
- `RESEND_API_KEY` (private) — email sending via Resend (job applications)
- `PRERENDER=true` — enables full static generation via Nitro crawler

### Server
Two Nitro API handlers: `server/api/createApplication.post.ts` (job application form, Zod validation + Resend email) and `server/api/sitemap.ts` (feeds `@nuxtjs/sitemap`).
