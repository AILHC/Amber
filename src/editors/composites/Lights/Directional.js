import React from 'react'

import ShadowVolume        from '../../components/ShadowVolume'
import ShadowMapResolution from '../../components/ShadowMapResolution'

import ShadowCaster from './ShadowCaster'

const DirectionalLight = ({ entity }) => {
  const shadowFields = [
    <ShadowMapResolution entity={entity} type="Directional" />,
    <ShadowVolume        entity={entity} type="Directional" />,
  ]

  return <ShadowCaster type="Directional" entity={entity} fields={shadowFields} />
}

export default DirectionalLight
