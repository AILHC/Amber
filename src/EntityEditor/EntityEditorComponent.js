import React from 'react'

import {
} from './EntityEditorStyles'

const Component = ({
  rotateX,
  rotateY,
  setRotateX,
  setRotateY,
}) =>
  <div>
    <input type="range" id="rotate-x" min={0} max={100} step={0.000001} value={rotateX} onChange={e => setRotateX(e.target.value)} />
    <input type="range" id="rotate-y" min={0} max={100} step={0.000001} value={rotateY} onChange={e => setRotateY(e.target.value)} />
  </div>

export default Component
