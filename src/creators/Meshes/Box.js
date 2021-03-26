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

import ActionToolbar from '../ActionToolbar'

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

const axis = (label, context, fn, type) => ({
  type,
  label,
  scope: 'Box',
  value: context[label],
  update: val => fn({ ...context, [label]: val }),
})

const convert = value => value ? 'yes' : 'no'

const Component = () => {
  const [id,             setId            ] = useState('')
  const [size,           setSize          ] = useState({ width: 1, height: 1, depth: 1 })
  const [color,          setColor         ] = useState({ r: 0, g: 255, b: 0 })
  const [material,       setMaterial      ] = useState('Standard')
  const [position,       setPosition      ] = useState({ x: 0, y: 0, z: 0 })
  const [castShadows,    setCastShadows   ] = useState(true)
  const [receiveShadows, setReceiveShadows] = useState(false)

  const shadows = {
    cast:    castShadows,
    receive: receiveShadows
  }

  const reset = () => {
    setId            ('')
    setSize          ({ width: 1, height: 1, depth: 1 })
    setColor         ({ r: 0, g: 255, b: 0 })
    setPosition      ({ x: 0, y:   0, z: 0 })
    setMaterial      ('Standard')
    setCastShadows   (true)
    setReceiveShadows(false)
  }

  const sizeFields = [
    { ...axis('width',  size, setSize, 'Slider'), min: .1, max: 5 },
    { ...axis('height', size, setSize, 'Slider'), min: .1, max: 5 },
    { ...axis('depth',  size, setSize, 'Slider'), min: .1, max: 5 },
  ]

  const positionFields = [
    { ...axis('x', position, setPosition, 'Slider'), min: -5, max: 5 },
    { ...axis('y', position, setPosition, 'Slider'), min: -5, max: 5 },
    { ...axis('z', position, setPosition, 'Slider'), min: -5, max: 5 },
  ]

  const shadowFields = [
    { ...axis('cast',    shadows, () => setCastShadows(!shadows.cast),       'Toggle'), displayValue: convert(shadows.cast   ), showLabel: true },
    { ...axis('receive', shadows, () => setReceiveShadows(!shadows.receive), 'Toggle'), displayValue: convert(shadows.receive), showLabel: true },
  ]

  return <form className="box creator">
    <UIWrapper label="Name"     child={<UIText   scope="Box" label="name"     value={id}       update={setId}                           />} />
    <UIWrapper label="Material" child={<UISelect scope="Box" label="material" value={material} update={setMaterial} options={materials} />} />

    <UIObject fullLabels scope="Box" label="Shadows" fields={shadowFields} summaryConverter={convert} />

    <UIColor scope="Box" value={color} update={setColor} />

    <UIObject scope="Box" label="Size"     fields={sizeFields}     />
    <UIObject scope="Box" label="Position" fields={positionFields} />

    <ActionToolbar reset={reset} create={() => create(id, color, size, material, position, shadows)} createDisabled={id.length <= 1} />
  </form>
}

export default Component
