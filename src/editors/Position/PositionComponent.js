import React from 'react'

import {
} from './PositionStyles'

const Component = ({
  x,
  y,
  z,
  setX,
  setY,
  setZ,
}) =>
  <div className="container-fluid">
    <div className="row">
      <h3 className="col-12">Position</h3>
    </div>
    <div className="row">
      <p className="col-2">X</p>
      <p className="col-10">{x}</p>
    </div>
    <div className="row">
      <input className="col-12" type="range" id="position-x" min={-5} max={5} step={0.000001} value={x} onChange={e => setX(e.target.value)} />
    </div>
    <div className="row">
      <p className="col-2">Y</p>
      <p className="col-10">{y}</p>
    </div>
    <div className="row">
      <input className="col-12" type="range" id="position-y" min={-5} max={5} step={0.000001} value={y} onChange={e => setY(e.target.value)} />
    </div>
    <div className="row">
      <p className="col-2">Z</p>
      <p className="col-10">{z}</p>
    </div>
    <div className="row">
      <input className="col-12" type="range" id="position-z" min={-5} max={5} step={0.000001} value={z} onChange={e => setZ(e.target.value)} />
    </div>
  </div>

Component.displayName = 'Position'

export default Component
