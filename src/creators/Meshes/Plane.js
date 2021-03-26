import React, { useState } from 'react'

import {
  Mesh,
  Color,
  PlaneGeometry,
} from 'three'

import * as THREE from 'three'

import World, { RegisterEditableEntity }  from '../../ecs'

import { scene } from '../../Scene'

import UIText   from '../../ui/Text'
import UIColor  from '../../ui/Color'
import UIObject from '../../ui/Object'
import UIToggle from '../../ui/Toggle'
import UISelect from '../../ui/Select'

import UIWrapper from '../../helpers/FieldsetWrapper'

import { materials } from '../helpers'

const create = (id, color, size, material, position, receiveShadows) => {
  const geometry = new PlaneGeometry(size.width, size.depth)
  const mat      = new THREE[`Mesh${material}Material`]({ color: new Color(color.r / 255, color.g / 255, color.b / 255) })
  const mesh     = new Mesh(geometry, mat)

  mesh.position.set(position.x, position.y, position.z)
  mesh.rotation.set(-(Math.PI / 2), 0, 0)
  mesh.receiveShadow = receiveShadows
  
  World.createEntity({
    id,
    c: {
      editor: {
        type: 'Editor',
        value: 'Plane',
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
        type: 'Visibility',
        visible: mesh.visible,
        target: mesh,
      },
      receiveShadows: {
        type: 'ReceiveShadows',
        value: mesh.receiveShadow,
        target: mesh,
      },
    }
  })
  
  scene.add(mesh)

  RegisterEditableEntity(id)
}

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

const Component = () => {
  const [id, setId] = useState('')
  const [size, setSize] = useState({ width: 5, depth: 5 })
  const [color, setColor] = useState({ r: 0, g: 255, b: 0 })
  const [material, setMaterial] = useState('Standard')
  const [position, setPosition] = useState({ x: 0, y: -2, z: 0 })
  const [receiveShadows, setReceiveShadows] = useState(true)

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
    <UIWrapper label="Name"            child={<UIText   scope="Plane" label="name"     value={id}             update={setId}                                    />} />
    <UIWrapper label="Receive Shadows" child={<UIToggle scope="Plane" label="receive"  value={receiveShadows} update={() => setReceiveShadows(!receiveShadows)} />} />
    <UIWrapper label="Material"        child={<UISelect scope="Plane" label="material" value={material}       update={setMaterial} options={materials}          />} />

    <UIColor scope="Plane" value={color} update={setColor} />

    <UIObject scope="Plane" label="Size"     fields={sizeFields}     />
    <UIObject scope="Plane" label="Position" fields={positionFields} />

    <button className="btn btn-primary" onClick={doCreate}>Create</button>
  </form>
}

export default Component
