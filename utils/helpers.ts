import { deburr } from 'lodash-es'

const calculateAspectRatio = (width: number, height: number, newWidth: number = 100): string => {
  const aspectRatioWidth = newWidth
  const aspectRatioHeight = Math.round((height / width) * aspectRatioWidth)

  return `${aspectRatioWidth}:${aspectRatioHeight}`
}

const ratioDimensions = (
  ratio: App.TAspectRatios | string | number,
): App.ImageDimensions => {
  const parts = ratio.toString().split(':').map((num: string): number => Number(num))

  return {
    width: parts[0],
    height: parts[1],
  }
}

const safeKebabCase = (str: string) =>
  deburr(str)
    .replace(/[^a-z0-9\s]/gi, '')
    .replace(/\s+/g, '-')
    .toLowerCase()
    .trim()

const wait = (ms: number = 0) => new Promise(resolve => setTimeout(resolve, ms))

const requestDelay = async <T>(promise: T, ms: number = 1000) => {
  const [p] = await Promise.all([promise, wait(ms)])

  return p
}

const validAspectRatio = (ratio: string | number = '') => {
  const pattern = /[0-9.]+:[0-9.]+/

  return pattern.test(String(ratio))
}

const inOutQuart = (t: number): number => {
  if (t < 0.5) {
    return 8 * t * t * t * t
  }
  return 1 - (-2 * t + 2) ** 4 / 2
}

const scrollToWithEasing = (target: number | string, duration: number = 1000, scrollToBottom: boolean = false): void => {
  let targetPosition: number

  if (typeof target === 'string') {
    const element = document.getElementById(target)
    if (!element) {
      console.warn(`Element with id "${target}" not found`)
      return
    }
    targetPosition = scrollToBottom
      ? element.offsetTop + element.offsetHeight - window.innerHeight
      : element.offsetTop
  }
  else {
    targetPosition = target
  }

  const startPosition = window.scrollY
  const distance = targetPosition - startPosition
  const startTime = performance.now()

  const animateScroll = (currentTime: number) => {
    const elapsedTime = currentTime - startTime
    const progress = Math.min(elapsedTime / duration, 1)
    const easedProgress = inOutQuart(progress)

    window.scrollTo(0, startPosition + distance * easedProgress)

    if (progress < 1) {
      requestAnimationFrame(animateScroll)
    }
  }

  requestAnimationFrame(animateScroll)
}

export {
  calculateAspectRatio,
  ratioDimensions,
  requestDelay,
  safeKebabCase,
  scrollToWithEasing,
  validAspectRatio,
  wait,
}
