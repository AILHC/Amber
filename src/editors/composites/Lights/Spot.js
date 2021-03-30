import React from 'react'

import Position      from '../../components/Position'
import LightRotation from '../../components/LightRotation'

import ShadowCaster from './Core'

const Component = ({ entity }) =>
  <ShadowCaster type="Spot" entity={entity}>
    <div className="section-boundary" />
    <h3>Geometry</h3>
    <Position      entity={entity} type="SpotLight" />
    <LightRotation entity={entity} type="Spot" />
  </ShadowCaster>

export default Component
