import React from 'react'

import Position            from '../../components/Position'
import ShadowVolume        from '../../components/ShadowVolume'
import LightRotation       from '../../components/LightRotation'
import ShadowMapResolution from '../../components/ShadowMapResolution'

import ShadowCaster from './CanCastShadows'

const Component = ({ entity }) => {
  const shadowFields = [
    <ShadowMapResolution entity={entity} type="Directional" />,
    <ShadowVolume        entity={entity} type="Directional" />,
  ]

  return <ShadowCaster type="Directional" entity={entity} fields={shadowFields}>
    <h3>Geometry</h3>
    <Position      entity={entity} type="DirectionalLight" />
    <LightRotation entity={entity} type="Directional" />
  </ShadowCaster>
}

export default Component
