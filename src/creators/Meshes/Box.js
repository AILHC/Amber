import React, { useState } from 'react'

import {
  Mesh,
  Color,
  BoxGeometry,
} from 'three'

import * as THREE from 'three'

import World, { RegisterEditableEntity } from '../../ecs'

import { scene } from '../../Scene'

import UIText   from '../../ui/Text'
import UIColor  from '../../ui/Color'
import UIObject from '../../ui/Object'
import UISelect from '../../ui/Select'

import UIWrapper from '../../helpers/FieldsetWrapper'

import { materials } from '../helpers'

const create = (id, color, size, material, position, shadows) => {
  const geometry = new BoxGeometry(size.width, size.height, size.depth)
  const mat      = new THREE[`Mesh${material}Material`]({ color: new Color(color.r / 255, color.g / 255, color.b / 255) })
  const mesh     = new Mesh(geometry, mat)

  mesh.position.set(position.x, position.y, position.z)
  mesh.castShadow    = shadows.cast
  mesh.receiveShadow = shadows.receive
  
  World.createEntity({
    id,
    c: {
      editor: {
        type:  'Editor',
        value: 'Box',
      },
      rotation: {
        type: 'Rotation',
        x: mesh.rotation.x,
        y: mesh.rotation.y,
        z: mesh.rotation.z,
        target: mesh.rotation,
      },
      position: {
        type: 'Position',
        x: mesh.position.x,
        y: mesh.position.y,
        z: mesh.position.z,
        target: mesh.position,
      },
      color: {
        type: 'Color',
        r: color.r,
        g: color.g,
        b: color.b,
        target: mesh.material.color,
      },
      visibility: {
        type:   'Visibility',
        visible: mesh.visible,
        target:  mesh,
      },
      receiveShadows: {
        type:  'ReceiveShadows',
        value:  mesh.receiveShadow,
        target: mesh,
      },
      castShadows: {
        type:  'CastShadows',
        value:  mesh.castShadow,
        target: mesh,
      },
    }
  })
  
  scene.add(mesh)

  RegisterEditableEntity(id)
}

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

const Component = () => {
  const [id, setId] = useState('')
  const [size, setSize] = useState({ width: 1, height: 1, depth: 1 })
  const [color, setColor] = useState({ r: 0, g: 255, b: 0 })
  const [material, setMaterial] = useState('Standard')
  const [position, setPosition] = useState({ x: 0, y: 0, z: 0 })
  const [castShadows, setCastShadows] = useState(true)
  const [receiveShadows, setReceiveShadows] = useState(true)

  const shadows = {
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
    <UIWrapper label="Name"     child={<UIText   scope="Box" label="name"     value={id}       update={setId}                           />} />
    <UIWrapper label="Material" child={<UISelect scope="Box" label="material" value={material} update={setMaterial} options={materials} />} />

    <UIObject fullLabels scope="Box" label="Shadows" fields={shadowFields} summaryConverter={convertShadowFieldsSummary} />

    <UIColor scope="Box" value={color} update={setColor} />

    <UIObject scope="Box" label="Size"     fields={sizeFields}     />
    <UIObject scope="Box" label="Position" fields={positionFields} />

    <button className="btn btn-primary" onClick={doCreate}>Create</button>
  </form>
}

export default Component
