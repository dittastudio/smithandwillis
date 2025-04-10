const colourText: Record<string, string> = {
  current: 'text-current',
  white: 'text-white',
  black: 'text-black',
  offwhite: 'text-offwhite',
  offblack: 'text-offblack',
  orange: 'text-orange',
  warmgrey: 'text-warm-grey',
  richbrown: 'text-rich-brown',
} as const

const colourTextMd: Record<string, string> = {
  current: 'md:text-current',
  white: 'md:text-white',
  black: 'md:text-black',
  offwhite: 'md:text-offwhite',
  offblack: 'md:text-offblack',
  orange: 'md:text-orange',
  warmgrey: 'md:text-warm-grey',
  richbrown: 'md:text-rich-brown',
} as const

const colourBackground: Record<string, string> = {
  current: 'bg-current',
  white: 'bg-white',
  black: 'bg-black',
  offwhite: 'bg-offwhite',
  offblack: 'bg-offblack',
  orange: 'bg-orange',
  warmgrey: 'bg-warm-grey',
  richbrown: 'bg-rich-brown',
} as const

export { colourBackground, colourText, colourTextMd }
