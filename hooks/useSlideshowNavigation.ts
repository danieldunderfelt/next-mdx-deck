import useEventListener from './useEventListener'
import { useCallback } from 'react'
import { useCurrentSlide } from '../context/CurrentSlideContext'
import { Modes } from '../constants/modes'
import { useMode } from '../context/ModeContext'

const NEXT = [13, 32, 39]
const PREV = 37
const PRESENTER = 80

export function useSlideshowNavigation(slidesCount) {
  const { setSlide, steps, currentStep, setCurrentStep, clearSteps } = useCurrentSlide()
  const { mode, setMode } = useMode()

  let navigate = useCallback(
    ({ keyCode, altKey }) => {
      // Handle Presentation Mode shortcut
      if (altKey) {
        if (keyCode === PRESENTER) {
          if (mode === Modes.SPEAKER) {
            setMode(Modes.SLIDESHOW)
          } else {
            setMode(Modes.SPEAKER)
          }
          return false
        }
      }

      // Handle slide changes
      if (NEXT.indexOf(keyCode) !== -1) {
        // Do we have Steps inside the slide? Navigate those first
        if (steps.length > 0 && currentStep < steps.length - 1) {
          return setCurrentStep((prevStep) => Math.min(steps.length, prevStep + 1))
        }

        // Otherwise go to next slide
        setSlide((prevState) => Math.min(slidesCount, prevState + 1))
        clearSteps()
      } else if (keyCode === PREV) {
        // Do we have Steps inside the slide? Navigate those first
        if (steps.length > 0 && currentStep !== 0) {
          return setCurrentStep((prevStep) => Math.max(0, prevStep - 1))
        }

        // Otherwise go to prev slide
        setSlide((prevState) => Math.max(0, prevState - 1))
        clearSteps()
      }
    },
    [mode, steps, currentStep, slidesCount]
  )

  const swipeLeft = () => {
    navigate({ keyCode: NEXT[0] })
  }

  const swipeRight = () => {
    navigate({ keyCode: PREV })
  }

  useEventListener('keydown', navigate)

  return { swipeLeft, swipeRight }
}
