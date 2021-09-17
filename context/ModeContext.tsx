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
  const [mode, setMode] = useState<Modes>(Modes.SLIDESHOW)
  const router = useRouter()
  const newMode = router.query.mode as string

  useEffect(() => {
    if (newMode && Object.values(Modes).includes(newMode as Modes)) {
      setMode(newMode as Modes)
    }
  }, [newMode])

  return <ModeContext.Provider value={{ mode, setMode }}>{children}</ModeContext.Provider>
}

export const useMode = () => useContext(ModeContext)
