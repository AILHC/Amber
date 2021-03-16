import React, { useState } from 'react'

import World from '../../ecs/Ape'

import Toggle from '../../ui/Toggle/ToggleComponent'

const Component = ({ entity }) => {
  const { castShadows } = World.getEntity(entity).c

  const [cast, setCast] = useState(castShadows.value)

  return <div className="cast_shadows editor">
    <Toggle field="Cast Shadows" label="Cast Shadows" checked={cast} toggle={() => { setCast(!cast); castShadows.update({ value: !cast }) }} />
  </div>
}

export default Component
