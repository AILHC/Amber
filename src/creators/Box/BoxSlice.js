import { createSlice } from '@reduxjs/toolkit'

import {
  Mesh,
  Color,
  BoxGeometry,
} from 'three'

import * as THREE from 'three'

import World from '../../ecs/Ape'

import { scene } from '../../Scene'

import { registerEditableEntity } from '../../EntityEditor/EntityEditorSlice'

const slice = createSlice({
  name: 'Box',
  initialState: {
    r: 0,
    g: 255,
    b: 0,
    width:  1,
    height: 1,
    depth:  1,
    material: 'MeshLambertMaterial',
    x: 0,
    y: 0,
    z: 0,
  },
  reducers: {
    setSize:     (state, { payload }) => ({ ...state, ...payload }),
    setColor:    (state, { payload }) => ({ ...state, ...payload }),
    setPosition: (state, { payload }) => ({ ...state, ...payload }),
    setMaterial: (state, { payload }) => ({ ...state, material: payload }),
  }
})

export const {
  setSize,
  setColor,
  setMaterial,
  setPosition,
} = slice.actions

export default slice.reducer

export const create = (color, size, material, position) => dispatch => {
  const geometry = new BoxGeometry(size.width, size.height, size.depth)
  const mat      = new THREE[material]({ color: new Color(color.r / 255, color.g / 255, color.b / 255) })
  const mesh     = new Mesh(geometry, mat)

  mesh.position.set(position.x, position.y, position.z)
  
  World.createEntity({
    id: 'box',
    c: {
      rotation: {
        type: 'Rotation',
        x: mesh.rotation.x,
        y: mesh.rotation.y,
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
      castShadows: {
        type: 'CastShadows',
        value: mesh.castShadow,
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

  registerEditableEntity('box')(dispatch)
}