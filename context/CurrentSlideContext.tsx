import React, { createContext, useContext, useState } from 'react'
import { useStoredSlide } from '../hooks/useStorage'

type CurrentSlideContextType = {
  currentSlide: number
  setSlide: React.Dispatch<React.SetStateAction<number>>
  currentStep: number
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>
  steps: number[]
  setSteps: React.Dispatch<React.SetStateAction<number[]>>
  addStep: (number) => unknown
  removeStep: (number) => unknown
  clearSteps: () => unknown
}

export const CurrentSlideContext = createContext<CurrentSlideContextType>({
  currentSlide: 0,
  setSlide: () => {},
  currentStep: 0,
  addStep: () => {},
  removeStep: () => {},
  setCurrentStep: () => {},
  setSteps: () => {},
  clearSteps: () => {},
  steps: [],
})

export function CurrentSlideProvider({ children }) {
  let getStoredSlide = useStoredSlide()

  // Grab initial slide from hash (#) in URL
  let initialSlide =
    process.browser && window.location.hash
      ? parseInt(window.location.hash.replace('#', ''), 10)
      : 0

  // If no url state, check the storage. Default to 0, the first slide.
  if (!initialSlide) {
    initialSlide = getStoredSlide() || 0
  }

  let [currentSlide, setSlide] = useState<number>(initialSlide)
  let [currentStep, setCurrentStep] = useState<number>(0)
  let [steps, setSteps] = useState<number[]>([])

  let addStep = (id: number) => {
    setSteps((prevSteps) => [...new Set([...prevSteps, id])])
  }

  let removeStep = (id) => {
    setSteps((prevSteps) => [...prevSteps.filter((prevStep) => prevStep !== id)])
  }

  let clearSteps = () => {
    setSteps([])
    setCurrentStep(0)
  }

  return (
    <CurrentSlideContext.Provider
      value={{
        currentSlide,
        setSlide,
        currentStep,
        setCurrentStep,
        steps,
        setSteps,
        addStep,
        removeStep,
        clearSteps,
      }}
    >
      {children}
    </CurrentSlideContext.Provider>
  )
}

export const useCurrentSlide = () => useContext(CurrentSlideContext)
