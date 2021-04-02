import React from 'react'

import ShadowVolume        from '../../components/ShadowVolume'
import ShadowMapResolution from '../../components/ShadowMapResolution'

import ShadowCaster from './CanCastShadows'

const Component = ({ entity }) => {
  const shadowFields = [
    <ShadowMapResolution entity={entity} type="Directional" />,
    <ShadowVolume        entity={entity} type="Directional" />,
  ]

  return <ShadowCaster type="Directional" entity={entity} fields={shadowFields} />
}

export default Component
