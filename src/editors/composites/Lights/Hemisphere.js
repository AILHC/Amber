import React from 'react'

import Color from '../../components/Color'

import Light from './Core'

const Component = ({ entity }) =>
  <Light
    type="directional"
    entity={entity}
    color={{ field: 'skyColor', label: 'Sky' }}
  >
    <Color entity={entity} field="groundColor" label="Ground" />
  </Light>

export default Component
