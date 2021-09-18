import React, { ReactElement } from 'react'
import Slide from '../components/Slide'
import PresentationMode from '../components/PresentationMode'
import Swipeable from '../components/Swipeable'
import { useMode } from '../context/ModeContext'
import { useCurrentSlide } from '../context/CurrentSlideContext'
import { useMdxSlides } from '../hooks/useMdxSlides'
import { useSpeakerNotes } from '../hooks/useSpeakerNotes'
import { useSlideshowNavigation } from '../hooks/useSlideshowNavigation'
import { useSlideUrl } from '../hooks/useSlideUrl'
import { useStorage } from '../hooks/useStorage'

const SlidePage: React.FC = ({ children }) => {
  useSlideUrl()
  useStorage()

  let { currentSlide } = useCurrentSlide()
  let { mode } = useMode()

  let slides = useMdxSlides(children as ReactElement[])
  let speakerNotes = useSpeakerNotes(children as ReactElement[])

  let { swipeRight, swipeLeft } = useSlideshowNavigation(slides.length)

  return (
    <Swipeable onSwipedLeft={swipeLeft} onSwipedRight={swipeRight}>
      <PresentationMode mode={mode} notes={speakerNotes} currentSlide={currentSlide}>
        <div id="slide" style={{ width: '100%' }}>
          <Slide>{slides[currentSlide]}</Slide>
        </div>
      </PresentationMode>
    </Swipeable>
  )
}

export default SlidePage
