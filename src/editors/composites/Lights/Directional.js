import React from 'react'

import ShadowVolume        from '../../components/ShadowVolume'
import LightRotation       from '../../components/LightRotation'
import ShadowMapResolution from '../../components/ShadowMapResolution'

import ShadowCaster from './CanCastShadows'

const Component = ({ entity }) => {
  const shadowFields = [
    <ShadowVolume        entity={entity} />,
    <ShadowMapResolution entity={entity} />,
  ]

  return <ShadowCaster type="directional" entity={entity} fields={shadowFields}>
    <LightRotation entity={entity} />
  </ShadowCaster>
}

export default Component
