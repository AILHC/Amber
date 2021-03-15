import React from 'react'

import Toggle from '../../ui/Toggle/ToggleComponent'

const Component = ({
  visible,
  toggleVisible,
}) =>
  <div className="visibility editor">
    <Toggle field="Visibility" label="Visible" checked={visible} toggle={toggleVisible} />
  </div>

Component.displayName = 'Visibility'

export default Component
