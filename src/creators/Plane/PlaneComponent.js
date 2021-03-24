import React from 'react'

import Text   from '../../ui/Text'
import Color  from '../../ui/Color'
import Object from '../../ui/Object'
import Toggle from '../../ui/Toggle'
import Select from '../../ui/Select'

import Wrapper from '../../helpers/FieldsetWrapper'

import { materials } from '../helpers'

const sizeCommon = {
  type: 'Slider',
  scope: 'Plane',
  min: 0.1,
  max: 5,
}

const positionCommon = {
  type: 'Slider',
  scope: 'Plane',
  min: -5,
  max: 5,
}

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
  receiveShadows,
  toggleReceiveShadows,
}) => {
  const doCreate = e => {
    create(
      id,
      color,
      size,
      material,
      position,
      receiveShadows
    )

    e.preventDefault()
  }

  const sizeFields = [{
    label: 'width',
    value: size.width,
    update: val => setSize({ ...size, width: val }),
    ...sizeCommon,
  }, {
    label: 'depth',
    value: size.depth,
    update: val => setSize({ ...size, depth: val }),
    ...sizeCommon,
  }]

  const positionFields = [{
    label: 'x',
    value: position.x,
    update: val => setPosition({ ...position, x: val }),
    ...positionCommon,
  }, {
    label: 'y',
    value: position.y,
    update: val => setPosition({ ...position, y: val }),
    ...positionCommon,
  }, {
    label: 'z',
    value: position.z,
    update: val => setPosition({ ...position, z: val }),
    ...positionCommon,
  }]

  return <form className="plane creator">
    <Wrapper label="Name"            child={<Text   scope="Plane" label="name"     value={id}             update={setId}                           />} />
    <Wrapper label="Receive Shadows" child={<Toggle scope="Plane" label="receive"  value={receiveShadows} update={toggleReceiveShadows}            />} />
    <Wrapper label="Material"        child={<Select scope="Plane" label="material" value={material}       update={setMaterial} options={materials} />} />

    <Color scope="Plane" value={color} update={setColor} />

    <Object scope="Plane" label="Size"     fields={sizeFields}     />
    <Object scope="Plane" label="Position" fields={positionFields} />

    <button className="btn btn-primary" onClick={doCreate}>Create</button>
  </form>
}

export default Component
