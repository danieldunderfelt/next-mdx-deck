import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useCurrentSlide } from '../context/CurrentSlideContext'

const keys = {
  slide: 'next-mdx-deck-slide',
  page: 'next-mdx-deck-page',
}

export const useStorage = () => {
  let { currentSlide, setSlide } = useCurrentSlide()
  let router = useRouter()

  let currentPage =
    router.query && 'slide' in router.query && parseInt(router.query.slide as string, 10)

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
    let n = e.newValue
    let syncedSlide = localStorage.getItem(keys.slide)

    // if (focused) return
    if (Number.isNaN(n)) {
      return
    }

    switch (e.key) {
      case keys.slide:
        setSlide(parseInt(n, 10))
        break
      default:
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
    localStorage.setItem(keys.page, String(currentPage))
  }, [focused, currentSlide, currentPage])
}
