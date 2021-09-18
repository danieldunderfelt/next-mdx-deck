import { useCallback, useEffect, useState } from 'react'
import { useCurrentSlide } from '../context/CurrentSlideContext'

const keys = {
  slide: 'next-mdx-deck-slide',
  step: 'next-mdx-deck-step',
}

export const useStorage = () => {
  let { currentSlide, setSlide, currentStep, setCurrentStep } = useCurrentSlide()
  let [focused, setFocused] = useState(false)

  /**
   * Checks when user enters (focus) or
   * leaves (blur) browser window/tab
   */
  let handleFocus = () => setFocused(true)
  let handleBlur = () => setFocused(false)

  /**
   * Updates route or context with local storage data
   * from event listener
   * @param {*} e
   */
  let handleStorageChange = (e) => {
    let newValue = parseInt(e.newValue, 10)
    console.log(newValue)

    if (isNaN(newValue)) {
      return
    }

    switch (e.key) {
      case keys.slide:
        setSlide(newValue)
        break
      case keys.step:
        setCurrentStep(newValue)
        break
    }
  }

  useEffect(() => {
    setFocused(document.hasFocus())
  }, [])

  useEffect(() => {
    if (process.browser) {
      if (!focused) {
        window.addEventListener('storage', handleStorageChange)
      }

      window.addEventListener('focus', handleFocus)
      window.addEventListener('blur', handleBlur)
    }
    return () => {
      if (process.browser) {
        if (!focused) {
          window.removeEventListener('storage', handleStorageChange)
        }

        window.removeEventListener('focus', handleFocus)
        window.removeEventListener('blur', handleBlur)
      }
    }
  }, [focused])

  /**
   * Sync localstorage with changes to slides or pages
   */
  useEffect(() => {
    if (!focused) {
      return
    }

    localStorage.setItem(keys.slide, String(currentSlide))
    localStorage.setItem(keys.step, String(currentStep))
  }, [currentSlide, currentStep, focused])
}

export function useStoredSlide() {
  return useCallback(() => {
    if (!process.browser) {
      return undefined
    }

    let storedSlideIndex = localStorage.getItem(keys.slide)
    return storedSlideIndex ? parseInt(storedSlideIndex, 10) : undefined
  }, [])
}
