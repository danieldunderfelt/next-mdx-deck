import React, { ReactElement } from 'react'

export function useSpeakerNotes(children: ReactElement[]) {
  let generatedNotes = []
  let notesCount = 0

  // Filter down children by only Slides
  React.Children.forEach(children, (child) => {
    // Check for <hr> element to separate slides
    const childType = child && child.props && (child.props.mdxType || [])

    if (childType && childType.includes('hr')) {
      notesCount += 1
      return
    }

    // Check if it's a SpeakerNotes component
    if (childType && childType.includes('SpeakerNotes')) {
      if (!Array.isArray(generatedNotes[notesCount])) {
        generatedNotes[notesCount] = []
      }
      generatedNotes[notesCount].push(child)
    }
  })

  return generatedNotes
}
