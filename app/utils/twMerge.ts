import { extendTailwindMerge } from 'tailwind-merge'

export const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        'text-12',
        'text-13',
        'text-14',
        'text-15',
        'text-16',
        'text-18',
        'text-20',
        'text-22',
      ],
      'text-color': [
        'text-white',
        'text-black',
        'text-offblack',
        'text-orange',
        'text-orange-light',
        'text-warm-grey',
        'text-rich-brown',
      ],
    },
  },
})
