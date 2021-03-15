import React from 'react'

import {
} from './HasMeshStyles'

const Component = ({
  visible,
  castShadow,
  receiveShadow,
}) =>
  <div>
    <h3>Mesh Data</h3>
    <dl>
      <dt>Visible</dt>
      <dd>{visible ? 'Yes' : 'No'}</dd>
      <dt>Cast Shadows</dt>
      <dd>{castShadow ? 'Yes' : 'No'}</dd>
      <dt>Receive Shadows</dt>
      <dd>{receiveShadow ? 'Yes' : 'No'}</dd> 
    </dl>
  </div>

Component.displayName = 'HasMesh'

export default Component
