import React from 'react'
import styled from 'styled-components'

const StyledSlide = styled.div`
  width: 100%;
`

type PropTypes = {
  id?: number
  className?: string
}

const Slide: React.FC<PropTypes> = ({ children, id, className }) => {
  return (
    <StyledSlide id={id} className={className}>
      {children}
    </StyledSlide>
  )
}

export default Slide
