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
  width: 1,
  depth: 1,
  material: 'Lambert',
  x: 0,
  y: 0,
  z: 0,
  receiveShadows: false,
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

    toggleReceiveShadows: state => ({ ...state, receiveShadows: !state.receiveShadows }),

    clear:       () => initialState
  }
})

export const {
  setId,
  setSize,
  setColor,
  setMaterial,
  setPosition,
  toggleReceiveShadows,
} = slice.actions

const {
  clear
} = slice.actions

export default slice.reducer

export const create = (id, color, size, material, position, receiveShadows) => dispatch => {
  const geometry = new PlaneGeometry(size.width, size.depth)
  const mat      = new THREE[`Mesh${material}Material`]({ color: new Color(color.r / 255, color.g / 255, color.b / 255) })
  const mesh     = new Mesh(geometry, mat)

  mesh.position.set(position.x, position.y, position.z)
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

  console.log('hello?', id, mesh)

  registerEditableEntity(id)(dispatch)

  dispatch(clear())
}