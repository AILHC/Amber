import React from 'react'

import Color from '../../components/Color'

import Light from './Core'

const HemisphereLight = ({ entity }) =>
  <Light
    type="Hemisphere"
    entity={entity}
    rotates={false}
    includeColor={false}
  >
    <div className="section-boundary" />
    <h3>Colors</h3>
    <Color entity={entity} field="skyColor"    label="Sky"    type="HemisphereLight" />
    <Color entity={entity} field="groundColor" label="Ground" type="HemisphereLight" />
  </Light>

export default HemisphereLight
