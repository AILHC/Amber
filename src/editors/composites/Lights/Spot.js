import React from 'react'

import Angle    from '../../components/Angle'
import Decay    from '../../components/Decay'
import Distance from '../../components/Distance'
import Penumbra from '../../components/Penumbra'

import ShadowMapResolution from '../../components/ShadowMapResolution'

import ShadowCaster from './Core'

const SpotLight = ({ entity }) =>
  <ShadowCaster type="Spot" entity={entity}>
    <h3>Light</h3>
    <Angle    entity={entity} />
    <Decay    entity={entity} />
    <Distance entity={entity} />
    <Penumbra entity={entity} />
    <div className="section-boundary" />
    <h3>Shadows</h3>
    <ShadowMapResolution entity={entity} type="Spot" />
  </ShadowCaster>

export default SpotLight
