import React from 'react'

import { SketchPicker } from 'react-color'

import Slider from '../../ui/Slider'

const sizeCommon = {
  field: 'Plane',
  min: 0.1,
  max: 5,
}

const positionCommon = {
  field: 'Plane',
  min: -5,
  max: 5,
}

const materials = [
  'LineBasicMaterial',
  'LineDashedMaterial',
  'MeshBasicMaterial',
  'MeshDepthMaterial',
  'MeshDistanceMaterial',
  'MeshLambertMaterial',
  'MeshMatcapMaterial',
  'MeshNormalMaterial',
  'MeshPhongMaterial',
  'MeshPhysicalMaterial',
  'MeshStandardMaterial',
  'MeshToonMaterial',
  'PointsMaterial',
]

const Component = ({
  id,
  size,
  color,
  setId,
  create,
  setSize,
  material,
  position,
  setColor,
  setMaterial,
  setPosition,
}) =>
  <div className="plane creator">
    <h3>Name</h3>
    <input type="text" value={id} placeholder="Give this Plane a name" onChange={e => setId(e.target.value)} />
    <h3>Color</h3>
    <SketchPicker color={color} onChange={val => setColor(val.rgb)} />
    <h3>Size</h3>
    <Slider label="width"  value={size.width}  update={val => setSize({ ...size, width:  val })} {...sizeCommon} />
    <Slider label="height" value={size.height} update={val => setSize({ ...size, height: val })} {...sizeCommon} />
    <h3>Material</h3>
    <select value={material} onChange={e => setMaterial(e.target.value)}>
      {materials.map(m => <option key={m} value={m}>{m}</option>)}
    </select>
    <h3>Position</h3>
    <Slider label="x" value={position.x} update={val => setPosition({ ...position, x: val })} {...positionCommon} />
    <Slider label="y" value={position.y} update={val => setPosition({ ...position, y: val })} {...positionCommon} />
    <Slider label="z" value={position.z} update={val => setPosition({ ...position, z: val })} {...positionCommon} />
    <button onClick={() => create(id, color, size, material, position)}>Create</button>
  </div>

export default Component
