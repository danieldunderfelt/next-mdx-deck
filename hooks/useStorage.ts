import { useEffect, useState } from 'react'
import { useCurrentSlide } from '../context/CurrentSlideContext'

const keys = {
  slide: 'next-mdx-deck-slide',
}

export const useStorage = () => {
  let { currentSlide, setSlide } = useCurrentSlide()
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

    if (isNaN(newValue)) {
      return
    }

    if (e.key === keys.slide) {
      setSlide(newValue)
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
  }, [focused, currentSlide])
}
