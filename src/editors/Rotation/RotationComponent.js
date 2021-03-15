import React from 'react'

import {
} from './RotationStyles'

const Component = ({
  rotateX,
  rotateY,
  setRotateX,
  setRotateY,
}) =>
  <div className="container-fluid">
    <div className="row">
      <h3 className="col-12">Rotation Speed</h3>
    </div>
    <div className="row">
      <p className="col-2">X</p>
      <p className="col-10">{rotateX}</p>
    </div>
    <div className="row">
      <input className="col-12" type="range" id="rotate-x" min={0} max={100} step={0.000001} value={rotateX} onChange={e => setRotateX(e.target.value)} />
    </div>
    <div className="row">
      <p className="col-2">Y</p>
      <p className="col-10">{rotateY}</p>
    </div>
    <div className="row">
      <input className="col-12" type="range" id="rotate-y" min={0} max={100} step={0.000001} value={rotateY} onChange={e => setRotateY(e.target.value)} />
    </div>
  </div>

export default Component
