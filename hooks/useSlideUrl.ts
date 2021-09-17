import { useRouter } from 'next/router'
import { useCurrentSlide } from '../context/CurrentSlideContext'
import { useCallback, useEffect } from 'react'
import { useMode } from '../context/ModeContext'
import { Modes } from '../constants/modes'

export function useSlideUrl() {
  let router = useRouter()
  let { mode } = useMode()
  let { currentSlide } = useCurrentSlide()

  useEffect(() => {
    router.push(router.pathname, `${router.pathname}?mode=${Modes.SLIDESHOW}#${currentSlide}`, {
      shallow: true,
    })
  }, [mode, router, currentSlide])
}
