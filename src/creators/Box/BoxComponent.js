import React from 'react'

import Text   from '../../ui/Text'
import Color  from '../../ui/Color'
import Object from '../../ui/Object'
import Select from '../../ui/Select'

import Wrapper from '../../helpers/FieldsetWrapper'

const sizeCommon = {
  scope: 'Box',
  min: 0.1,
  max: 5,
}

const positionCommon = {
  scope: 'Box',
  min: -5,
  max: 5,
}

const materials = [
  'Basic',
  'Lambert',
  'Normal',
  'Phong',
  'Physical',
  'Standard',
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
}) => {
  const sizeFields = [{
    type: 'Slider',
    label: 'width',
    value: size.width,
    update: val => setSize({ ...size, width: val }),
    ...sizeCommon,
  }, {
    type: 'Slider',
    label: 'height',
    value: size.height,
    update: val => setSize({ ...size, height: val }),
    ...sizeCommon,
  }, {
    type: 'Slider',
    label: 'depth',
    value: size.depth,
    update: val => setSize({ ...size, depth: val }),
    ...sizeCommon,
  }]

  const positionFields = [{
    type: 'Slider',
    label: 'X',
    value: position.x,
    update: val => setPosition({ ...position, x: val }),
    ...positionCommon,
  }, {
    type: 'Slider',
    label: 'Y',
    value: position.y,
    update: val => setPosition({ ...position, y: val }),
    ...positionCommon,
  }, {
    type: 'Slider',
    label: 'Z',
    value: position.z,
    update: val => setPosition({ ...position, z: val }),
    ...positionCommon,
  }]

  return <form className="box creator">
    <Wrapper name="Name"     child={<Text   scope="Box" name="name"     value={id}       update={setId}                           />} />
    <Wrapper name="Material" child={<Select scope="Box" name="material" value={material} update={setMaterial} options={materials} />} />

    <Color  scope="Box" value={color} update={setColor} />

    <Object scope="Box" name="Size"     fields={sizeFields}     />
    <Object scope="Box" name="Position" fields={positionFields} />

    <button
      className="btn btn-primary"
      onClick={e => { create(id, color, size, material, position); e.preventDefault() }}
    >Create</button>
  </form>
}

export default Component
