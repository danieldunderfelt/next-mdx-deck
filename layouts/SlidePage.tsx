import React, { ReactElement } from 'react'
import Slide from '../components/Slide'
import PresentationMode from '../components/PresentationMode'
import Swipeable from '../components/Swipeable'
import { useMode } from '../context/ModeContext'
import { useCurrentSlide } from '../context/CurrentSlideContext'
import { useMdxSlides } from '../hooks/useMdxSlides'
import { useSpeakerNotes } from '../hooks/useSpeakerNotes'
import { useSlideshowNavigation } from '../hooks/useSlideshowNavigation'

const SlidePage: React.FC = ({ children }) => {
  const { currentSlide } = useCurrentSlide()

  const { mode } = useMode()
  let { swipeRight, swipeLeft } = useSlideshowNavigation()

  let slides = useMdxSlides(children as ReactElement[])
  let speakerNotes = useSpeakerNotes(children as ReactElement[])

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
