import { useState, useMemo } from 'react'

import World, { autoNameIfPlaceholder } from '../../env'

import InlineNormalizedSlider from '../../ui/InlineNormalizedSlider'

import Wrapper from '../../helpers/FieldsetWrapper'

const updateTarget = (entity, component, property, value, modifier) => {
  const { helpers } = World.getEntity(entity).c

  component.value = value
  component.target[property] = value * modifier

  component.update()

  for (const h of helpers?.value)
    h.update()
}

const LightProperty = ({
  name,
  type,
  entity,
  modifier = 1,
}) => {
  const clazz = entity.toLowerCase().replace(/\s+/g, '_'),
        n     = name.toLowerCase(),
        p     = World.getEntity(entity).c[n]

  let [v, setV] = useState(undefined)

  useMemo(() => {
    v = p.value

    setV(v)
  }, [entity])

  return <Wrapper
    label={name}
    child={<InlineNormalizedSlider
      scope={clazz}
      label={n}
      value={v}
      update={val => {
        setV(val)
        updateTarget(entity, p, n, val, modifier)
        autoNameIfPlaceholder(`${type}Light`, entity)
      }}
    />}
  />
}

export default LightProperty
