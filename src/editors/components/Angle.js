import React, { useState, useMemo } from 'react'

import World, { autoNameIfPlaceholder } from '../../env'

import InlineNormalizedSlider from '../../ui/InlineNormalizedSlider'

import Wrapper from '../../helpers/FieldsetWrapper'

const updateTarget = (component, value) => {
  component.value = value
  component.target.angle = value * (Math.PI * .5)

  component.update()
}

const Angle = ({
  type,
  entity,
}) => {
  const clazz = entity.toLowerCase().replace(/\s+/g, '_')

  const { angle } = World.getEntity(entity).c

  let [strength, setStrength] = useState(undefined)

  useMemo(() => {
    strength = angle.value

    setStrength(strength)
  }, [entity, strength])

  return <Wrapper
    label="Angle"
    child={<InlineNormalizedSlider
      scope={clazz}
      label="angle"
      value={strength}
      update={val => {
        setStrength(val)
        updateTarget(angle, val)
        autoNameIfPlaceholder(type, entity)
      }}
    />}
  />
}

export default Angle
