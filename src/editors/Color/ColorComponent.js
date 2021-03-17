import React, { useState } from 'react'

import { SketchPicker } from 'react-color'

import World from '../../ecs'

const updateTarget = (component, value) => {
  component.target.r = value.r / 255
  component.target.g = value.g / 255
  component.target.b = value.b / 255

  component.update()
}

const Component = ({ entity }) => {
  const { color } = World.getEntity(entity).c

  const [rgb, setRGB] = useState({ r: color.r, g: color.g, b: color.b })

  return <div className="color editor">
    <h3>Color</h3>
    <SketchPicker color={rgb} onChange={val => { setRGB(val.rgb); updateTarget(color, val.rgb) }} />
  </div>
}

export default Component
