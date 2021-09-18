import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Modes } from '../constants/modes'

type ModeContextType = {
  mode: Modes
  setMode: Dispatch<SetStateAction<Modes>>
}

export const ModeContext = createContext<ModeContextType>({
  mode: Modes.SLIDESHOW,
  setMode: () => {},
})

export function ModeProvider({ children }) {
  let [mode, setMode] = useState<Modes>(Modes.SLIDESHOW)
  let router = useRouter()

  // Sync URL mode with mode state.
  useEffect(() => {
    function handleRouteChange() {
      const newMode = router.query.mode as string

      if (newMode && !!Modes[newMode] && newMode !== mode) {
        setMode(Modes[newMode])
      }
    }

    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [])

  return <ModeContext.Provider value={{ mode, setMode }}>{children}</ModeContext.Provider>
}

export const useMode = () => useContext(ModeContext)
