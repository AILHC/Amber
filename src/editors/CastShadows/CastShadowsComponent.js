import React, { useState, useMemo } from 'react'

import World from '../../ecs/Ape'

import Toggle from '../../ui/Toggle/ToggleComponent'

const updateTarget = (component, value) => {
  component.value = value
  component.target.castShadow = value

  component.update()
}

const Component = ({ entity }) => {
  const { castShadows } = World.getEntity(entity).c

  let [cast, setCast] = useState(castShadows.value)

  useMemo(() => {
    cast = castShadows.value

    setCast(cast)
  }, [entity])

  return <div className="cast_shadows editor">
    <Toggle field="Cast Shadows" label="Cast Shadows" checked={cast} toggle={() => { setCast(!cast); updateTarget(castShadows, !cast) }} />
  </div>
}

export default Component
