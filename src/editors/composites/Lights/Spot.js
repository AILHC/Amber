import React from 'react'

import LightRotation from '../../components/LightRotation'

import ShadowCaster from './Core'

const Component = ({ entity }) =>
  <ShadowCaster type="spot" entity={entity}>
    <LightRotation entity={entity} />
  </ShadowCaster>

export default Component
