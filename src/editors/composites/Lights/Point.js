import React from 'react'

import ShadowCaster from './CanCastShadows'

const Component = ({ entity }) =>
  <ShadowCaster type="Point" entity={entity} rotates={false} />

export default Component
