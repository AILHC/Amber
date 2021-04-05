import React, { useState, useMemo } from 'react'

import World, { autoNameIfPlaceholder } from '../../env'

import InlineNormalizedSlider from '../../ui/InlineNormalizedSlider'

import Wrapper from '../../helpers/FieldsetWrapper'

const updateTarget = (component, value) => {
  component.value = value
  component.target.decay = value * 10

  component.update()
}

const Decay = ({
  type,
  entity,
}) => {
  const clazz = entity.toLowerCase().replace(/\s+/g, '_')

  const { decay } = World.getEntity(entity).c

  let [strength, setStrength] = useState(undefined)

  useMemo(() => {
    strength = decay.value

    setStrength(strength)
  }, [entity, strength])

  return <Wrapper
    label="Decay"
    child={<InlineNormalizedSlider
      scope={clazz}
      label="decay"
      value={strength}
      update={val => {
        setStrength(val)
        updateTarget(decay, val)
        autoNameIfPlaceholder(type, entity)
      }}
    />}
  />
}

export default Decay
