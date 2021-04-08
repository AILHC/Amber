import Angle    from '../../components/Angle'
import Decay    from '../../components/Decay'
import Distance from '../../components/Distance'
import Penumbra from '../../components/Penumbra'

import ShadowMapResolution from '../../components/ShadowMapResolution'

import Light from './Core'

const SpotLight = ({ entity }) =>
  <Light type="Spot" entity={entity}>
    <h3>Light</h3>
    <Angle    entity={entity} type="Spot" />
    <Decay    entity={entity} type="Spot" />
    <Distance entity={entity} type="Spot" />
    <Penumbra entity={entity} type="Spot" />
    <div className="section-boundary" />
    <h3>Shadows</h3>
    <ShadowMapResolution entity={entity} type="Spot" />
  </Light>

export default SpotLight
