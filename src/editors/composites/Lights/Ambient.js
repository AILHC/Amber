import React from 'react'

import Light from './Core'

const AmbientLight = ({ entity }) =>
  <Light type="Ambient" entity={entity} rotates={false} />

export default AmbientLight
