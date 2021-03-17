import React, { useState, useMemo } from 'react'

import World from '../../ecs/Ape'

import Toggle from '../../ui/Toggle/ToggleComponent'

const updateTarget = (component, value) => {
  component.value = value
  component.target.visible = value

  component.update()
}

const Component = ({ entity }) => {
  const { visibility } = World.getEntity(entity).c

  let [visible, setVisible] = useState(undefined)

  useMemo(() => {
    visible = visibility.value

    setVisible(visible)
  }, [entity])

  return <div className="visibility editor">
    <Toggle field="Visibility" label="Visible" checked={visible} toggle={() => { setVisible(!visible); updateTarget(visibility, !visible) }} />
  </div>
}

export default Component
