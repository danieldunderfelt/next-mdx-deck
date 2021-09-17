import React, { createContext, useContext, useState } from 'react'
import { useStorage } from '../hooks/useStorage'

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
  useStorage()

  // Grab initial slide from hash (#) in URL
  const initialSlide =
    process.browser && window.location.hash ? parseInt(window.location.hash.replace('#', '')) : 0

  const [currentSlide, setSlide] = useState<number>(initialSlide)
  const [currentStep, setCurrentStep] = useState<number>(0)
  const [steps, setSteps] = useState<number[]>([])

  const addStep = (id: number) => {
    setSteps((prevSteps) => [...new Set([...prevSteps, id])])
  }

  const removeStep = (id) => {
    setSteps((prevSteps) => [...prevSteps.filter((prevStep) => prevStep !== id)])
  }

  const clearSteps = () => {
    setSteps([])
    setCurrentStep(0)
  }

  console.log('rendering context', currentStep, steps)

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
