import React, { useState, useMemo } from 'react'

import World from '../../ecs'

import InlineNormalizedSlider from '../../ui/InlineNormalizedSlider'

import Wrapper from '../../helpers/FieldsetWrapper'

const updateTarget = (component, value) => {
  component.value = value
  component.target.intensity = value

  component.update()
}

const Component = ({ entity }) => {
  const clazz = entity.toLowerCase().replace(/\s+/g, '_')

  const { intensity } = World.getEntity(entity).c

  let [strength, setStrength] = useState(undefined)

  useMemo(() => {
    strength = intensity.value

    setStrength(strength)
  }, [entity, strength])

  return <Wrapper
    name="Intensity"
    child={<InlineNormalizedSlider
      scope={clazz}
      name="intensity"
      value={strength}
      update={val => { setStrength(val); updateTarget(intensity, val) }}
    />}
  />
}

export default Component
