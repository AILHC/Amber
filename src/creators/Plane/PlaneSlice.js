import { createSlice } from '@reduxjs/toolkit'

import {
  Mesh,
  Color,
  PlaneGeometry,
} from 'three'

import * as THREE from 'three'

import World from '../../ecs/Ape'

import { scene } from '../../Scene'

import { registerEditableEntity } from '../../EntityEditor/EntityEditorSlice'

const initialState = {
  id: '',
  r: 0,
  g: 255,
  b: 0,
  width:  1,
  height: 1,
  material: 'MeshLambertMaterial',
  x: 0,
  y: 0,
  z: 0,
}

const slice = createSlice({
  name: 'Plane',
  initialState,
  reducers: {
    setSize:     (state, { payload }) => ({ ...state, ...payload }),
    setColor:    (state, { payload }) => ({ ...state, ...payload }),
    setPosition: (state, { payload }) => ({ ...state, ...payload }),
    setId:       (state, { payload }) => ({ ...state, id:       payload }),
    setMaterial: (state, { payload }) => ({ ...state, material: payload }),
    clear:       () => initialState
  }
})

export const {
  setId,
  setSize,
  setColor,
  setMaterial,
  setPosition,
} = slice.actions

const {
  clear
} = slice.actions

export default slice.reducer

export const create = (id, color, size, material, position) => dispatch => {
  const geometry = new PlaneGeometry(size.width, size.height)
  const mat      = new THREE[material]({ color: new Color(color.r / 255, color.g / 255, color.b / 255) })
  const mesh     = new Mesh(geometry, mat)

  mesh.position.set(position.x, position.y, position.z)
  
  World.createEntity({
    id,
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

  registerEditableEntity(id)(dispatch)

  dispatch(clear())
}