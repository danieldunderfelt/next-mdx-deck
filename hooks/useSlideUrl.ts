import { useRouter } from 'next/router'
import { useCurrentSlide } from '../context/CurrentSlideContext'
import { useEffect } from 'react'
import { useMode } from '../context/ModeContext'

export function useSlideUrl() {
  let router = useRouter()
  let { mode } = useMode()
  let { currentSlide } = useCurrentSlide()

  useEffect(() => {
    let currentQuery = router.query || {}

    if (!currentQuery.mode || currentQuery.mode !== mode) {
      router.push(
        {
          pathname: router.pathname,
          query: { ...currentQuery, mode },
        },
        undefined,
        {
          shallow: true,
        }
      )
    }
  }, [mode, router])

  useEffect(() => {
    window.location.hash = `#${currentSlide}`
  }, [currentSlide])
}
