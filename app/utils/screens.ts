export const breakpoints = {
  '2xs': 375,
  'xs': 480,
  'sm': 600,
  'md': 800,
  'lg': 1200,
  'xl': 1440,
  '2xl': 1800,
} as const

export type Breakpoint = keyof typeof breakpoints

export const getMediaQuery = (breakpoint: string): string => {
  const isMax = breakpoint.startsWith('max-')
  const key = (isMax ? breakpoint.slice(4) : breakpoint) as Breakpoint
  const value = breakpoints[key]

  return isMax ? `(max-width: ${value - 1}px)` : `(min-width: ${value}px)`
}
