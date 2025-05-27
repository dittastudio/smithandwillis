type Colours = 'current' | 'white' | 'black' | 'offwhite' | 'offblack' | 'orange' | 'warmgrey' | 'richbrown'

const colourText: Record<Colours, string> = {
  current: 'text-current',
  white: 'text-white',
  black: 'text-black',
  offwhite: 'text-offwhite',
  offblack: 'text-offblack',
  orange: 'text-orange',
  warmgrey: 'text-warm-grey',
  richbrown: 'text-rich-brown',
} as const

const colourTextMd: Record<Colours, string> = {
  current: 'md:text-current',
  white: 'md:text-white',
  black: 'md:text-black',
  offwhite: 'md:text-offwhite',
  offblack: 'md:text-offblack',
  orange: 'md:text-orange',
  warmgrey: 'md:text-warm-grey',
  richbrown: 'md:text-rich-brown',
} as const

const colourBackground: Record<Colours, string> = {
  current: 'bg-current',
  white: 'bg-white',
  black: 'bg-black',
  offwhite: 'bg-offwhite',
  offblack: 'bg-offblack',
  orange: 'bg-orange',
  warmgrey: 'bg-warm-grey',
  richbrown: 'bg-rich-brown',
} as const

const ratios: Record<string, string> = {
  '16:9': 'aspect-[16/9]',
  '9:16': 'aspect-[9/16]',
  '3:2': 'aspect-[3/2]',
  '2:3': 'aspect-[2/3]',
  '4:3': 'aspect-[4/3]',
  '3:4': 'aspect-[3/4]',
  '1:1': 'aspect-[1/1]',
  'md-16:9': 'md:aspect-[16/9]',
  'md-9:16': 'md:aspect-[9/16]',
  'md-3:2': 'md:aspect-[3/2]',
  'md-2:3': 'md:aspect-[2/3]',
  'md-4:3': 'md:aspect-[4/3]',
  'md-3:4': 'md:aspect-[3/4]',
  'md-1:1': 'md:aspect-[1/1]',
} as const

export { colourBackground, type Colours, colourText, colourTextMd, ratios }
