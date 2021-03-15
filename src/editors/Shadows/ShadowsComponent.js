import React from 'react'

import Toggle from '../../ui/Toggle/ToggleComponent'

// import {
// } from './ShadowsStyles'

const common = {
  field: 'Shadows'
}

const Component = ({
  castShadow,
  receiveShadow,
  toggleCastShadow,
  toggleReceiveShadow,
}) =>
  <div className="shadows editor">
    <Toggle label="Cast Shadows"    checked={castShadow}    toggle={toggleCastShadow}    {...common} />
    <Toggle label="Receive Shadows" checked={receiveShadow} toggle={toggleReceiveShadow} {...common} />
  </div>

export default Component
