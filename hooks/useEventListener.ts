import { useEffect } from 'react'

export default function useEventListener(
  eventName: string,
  handler: (evt: unknown) => unknown,
  element?: Element
) {
  const windowEl = process.browser ? window : null
  const eventEl = element ?? windowEl

  useEffect(
    () => {
      let isSupported = eventEl && eventEl.addEventListener

      if (!isSupported) {
        return
      }

      // Add event listener
      eventEl.addEventListener(eventName, handler)

      // Remove event listener on cleanup
      return () => {
        eventEl.removeEventListener(eventName, handler)
      }
    },
    [eventName, eventEl, handler] // Re-run if eventName or element changes
  )
}
