import React, { useEffect, useMemo, useRef } from 'react'
import { useCurrentSlide } from '../context/CurrentSlideContext'
import { motion } from 'framer-motion'

const TRANSLATE_Y_DISTANCE = '-1em'

export const Step = ({ children, order, duration = 0.5 }) => {
  const { currentStep, steps, addStep, removeStep } = useCurrentSlide()

  useEffect(() => {
    if (!steps.includes(order)) {
      addStep(order)
    }
  }, [order, addStep, removeStep])

  let stepIndex = useMemo(() => steps.findIndex((step) => step === order), [order, steps])
  let isVisible = stepIndex >= 0 && stepIndex <= currentStep

  let opacity = isVisible ? 1 : 0
  let translateY = isVisible ? 0 : TRANSLATE_Y_DISTANCE

  return (
    <motion.div
      animate={{ opacity, translateY }}
      transition={{ duration }}
      initial={{ opacity: 0, translateY: TRANSLATE_Y_DISTANCE }}
    >
      {children}
    </motion.div>
  )
}

export default Step
