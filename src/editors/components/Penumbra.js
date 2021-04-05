import React, { useState, useMemo } from 'react'

import World, { autoNameIfPlaceholder } from '../../env'

import InlineNormalizedSlider from '../../ui/InlineNormalizedSlider'

import Wrapper from '../../helpers/FieldsetWrapper'

const updateTarget = (component, value) => {
  component.value = value
  component.target.penumbra = value

  component.update()
}

const Penumbra = ({
  type,
  entity,
}) => {
  const clazz = entity.toLowerCase().replace(/\s+/g, '_')

  const { penumbra } = World.getEntity(entity).c

  let [strength, setStrength] = useState(undefined)

  useMemo(() => {
    strength = penumbra.value

    setStrength(strength)
  }, [entity, strength])

  return <Wrapper
    label="Penumbra"
    child={<InlineNormalizedSlider
      scope={clazz}
      label="penumbra"
      value={strength}
      update={val => {
        setStrength(val)
        updateTarget(penumbra, val)
        autoNameIfPlaceholder(type, entity)
      }}
    />}
  />
}

export default Penumbra
