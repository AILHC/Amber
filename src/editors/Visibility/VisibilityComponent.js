import React, { useState } from 'react'

import World from '../../ecs/Ape'

import Toggle from '../../ui/Toggle/ToggleComponent'

const updateTarget = (component, value) => {
  component.target.visible = value

  component.update()
}

const Component = ({ entity }) => {
  const { visibility } = World.getEntity(entity).c

  const [visible, setVisible] = useState(visibility.value)

  return <div className="visibility editor">
    <Toggle field="Visibility" label="Visible" checked={visible} toggle={() => { setVisible(!visible); updateTarget(visibility, !visible) }} />
  </div>
}

export default Component
