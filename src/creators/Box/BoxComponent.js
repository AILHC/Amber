import React from 'react'

import Text   from '../../ui/Text'
import Color  from '../../ui/Color'
import Object from '../../ui/Object'
import Select from '../../ui/Select'

import Wrapper from '../../helpers/FieldsetWrapper'

import { materials } from '../helpers'

const sizeCommon = {
  type: 'Slider',
  scope: 'Box',
  min: 0.1,
  max: 5,
}

const positionCommon = {
  type: 'Slider',
  scope: 'Box',
  min: -5,
  max: 5,
}

const shadowsCommon = {
  type: 'Toggle',
  scope: 'Box',
  showLabel: true,
}

const convertShadowFieldsSummary = value => value ? 'yes' : 'no'

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
  castShadows,
  receiveShadows,
  setCastShadows,
  setReceiveShadows,
}) => {
  let shadows = {
    cast:    castShadows,
    receive: receiveShadows
  }

  const doCreate = e => {
    create(
      id,
      color,
      size,
      material,
      position,
      shadows
    )

    e.preventDefault()
  }

  const sizeFields = [{
    label: 'width',
    value: size.width,
    update: val => setSize({ ...size, width: val }),
    ...sizeCommon,
  }, {
    label: 'height',
    value: size.height,
    update: val => setSize({ ...size, height: val }),
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

  const shadowFields = [{
    label: 'cast',
    value: castShadows,
    update: () => setCastShadows(!castShadows),
    ...shadowsCommon,
  }, {
    label: 'receive',
    value: receiveShadows,
    update: () => setReceiveShadows(!receiveShadows),
    ...shadowsCommon,
  }]

  return <form className="box creator">
    <Wrapper label="Name"     child={<Text   scope="Box" label="name"     value={id}       update={setId}                           />} />
    <Wrapper label="Material" child={<Select scope="Box" label="material" value={material} update={setMaterial} options={materials} />} />

    <Object fullLabels scope="Box" label="Shadows" fields={shadowFields} summaryConverter={convertShadowFieldsSummary} />

    <Color scope="Box" value={color} update={setColor} />

    <Object scope="Box" label="Size"     fields={sizeFields}     />
    <Object scope="Box" label="Position" fields={positionFields} />

    <button className="btn btn-primary" onClick={doCreate}>Create</button>
  </form>
}

export default Component
