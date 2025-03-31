import { deburr } from 'lodash-es'

const arrayToTuples = <T>(items: T[]) => {
  const tuples = []

  for (let i = 0; i < items.length; i += 2) {
    if (i + 1 < items.length) {
      tuples.push([items[i], items[i + 1]])
    }
    else {
      tuples.push([items[i]])
    }
  }

  return tuples
}

const calculateAspectRatio = (width: number, height: number, newWidth: number = 100): string => {
  const aspectRatioWidth = newWidth
  const aspectRatioHeight = Math.round((height / width) * aspectRatioWidth)

  return `${aspectRatioWidth}:${aspectRatioHeight}`
}

const ratioDimensions = (
  ratio: Luca.TAspectRatios | string | number,
): Luca.ImageDimensions => {
  const parts = ratio.toString().split(':').map((num: string): number => Number(num))

  return {
    width: parts[0],
    height: parts[1],
  }
}

const wait = (ms: number = 0) => new Promise(resolve => setTimeout(resolve, ms))

const requestDelay = async <T>(promise: T, ms: number = 1000) => {
  const [p] = await Promise.all([promise, wait(ms)])

  return p
}

const safeKebabCase = (str: string) =>
  deburr(str)
    .replace(/[^a-z0-9\s]/gi, '')
    .replace(/\s+/g, '-')
    .toLowerCase()
    .trim()

const validAspectRatio = (ratio: string | number = '') => {
  const pattern = /[0-9.]+:[0-9.]+/g

  return pattern.test(String(ratio))
}

export {
  arrayToTuples,
  calculateAspectRatio,
  ratioDimensions,
  requestDelay,
  safeKebabCase,
  validAspectRatio,
  wait,
}
