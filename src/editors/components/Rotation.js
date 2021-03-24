import React, { useState, useMemo } from 'react'

import World from '../../ecs'

import Object from '../../ui/Object'

const common = {
  max:  Math.PI,
  min: -Math.PI,
  scope: 'Rotation',
  displayLabel: true,
}

const updateTarget = (component, axis, value) => {
  const denormalized = ((value - 50) * .02) * Math.PI

  component[axis]        = denormalized
  component.target[axis] = denormalized

  component.update()
}

const convert = val => `${Math.round(((val - 50) * 2) * 1.8)}°`

const Component = ({ entity }) => {
  const { rotation } = World.getEntity(entity).c

  let [x, setX] = useState(50)
  let [y, setY] = useState(50)
  let [z, setZ] = useState(50)

  useMemo(() => {
    x = (((rotation.x / Math.PI) * .5) + .5) * 100
    y = (((rotation.y / Math.PI) * .5) + .5) * 100
    z = (((rotation.z / Math.PI) * .5) + .5) * 100

    setX(x)
    setY(y)
    setZ(z)
  }, [entity, x, y, z])

  const rotationFields = [{
    type: 'NormalizedSlider',
    label: 'x',
    value: x,
    displayValue: convert(x),
    update: val => { setX(val); updateTarget(rotation, 'x', val) },
    ...common,
  }, {
    type: 'NormalizedSlider',
    label: 'y',
    value: y,
    displayValue: convert(y),
    update: val => { setY(val); updateTarget(rotation, 'y', val) },
    ...common,
  }, {
    type: 'NormalizedSlider',
    label: 'z',
    value: z,
    displayValue: convert(z),
    update: val => { setZ(val); updateTarget(rotation, 'z', val) },
    ...common,
  }]

  return <Object label="Rotation" fields={rotationFields} summaryConverter={convert} />
}

export default Component
