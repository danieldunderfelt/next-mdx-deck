import React, { ReactElement, useMemo } from 'react'

export function useMdxSlides(children: ReactElement[]) {
  return useMemo(() => {
    let generatedSlides = []
    let slideCount = 0

    // Filter down children by only Slides
    React.Children.forEach(children, (child) => {
      // Check for <hr> element to separate slides
      const childType = child && child.props && (child.props.mdxType || [])

      if (childType && childType.includes('hr')) {
        slideCount += 1
        return
      }

      // Check if it's a SpeakerNotes component
      if (childType && !childType.includes('SpeakerNotes')) {
        // Add slide content to current generated slide
        if (!Array.isArray(generatedSlides[slideCount])) {
          generatedSlides[slideCount] = []
        }

        generatedSlides[slideCount].push(child)
      }
    })

    return generatedSlides
  }, [children])
}
