import React from 'react'

import ShadowCaster from './CanCastShadows'

import Position from '../../components/Position'

const Component = ({ entity }) =>
  <ShadowCaster type="Point" entity={entity}>
    <h3>Geometry</h3>
    <Position entity={entity} type="PointLight" />
  </ShadowCaster>

export default Component
