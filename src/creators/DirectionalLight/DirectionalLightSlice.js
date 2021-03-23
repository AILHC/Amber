import { createSlice } from '@reduxjs/toolkit'

import {
  Color,
  Object3D,
  DirectionalLight,
  DirectionalLightHelper,
} from 'three'

import World from '../../ecs/Ape'

import { scene } from '../../Scene'

import { registerEditableEntity } from '../../EntityEditor/EntityEditorSlice'

const initialState = {
  id: '',
  r: 255,
  g: 255,
  b: 255,
  x: 50,
  y: 50,
  z: 50,
  lookAtX: 0,
  lookAtY: -1,
  lookAtZ: 0,
  intensity: 1,
}

const slice = createSlice({
  name: 'DirectionalLight',
  initialState,
  reducers: {
    setId:        (state, { payload }) => ({ ...state, id:        payload }),
    setIntensity: (state, { payload }) => ({ ...state, intensity: payload }),

    setColor:          (state, { payload }) => ({ ...state, ...payload }),
    setRotation:       (state, { payload }) => ({ ...state, ...payload }),
    setLookAtPosition: (state, { payload }) => ({ ...state, ...payload }),

    clear: () => initialState,
  }
})

export const {
  setId,
  setColor,
  setRotation,
  setIntensity,
  setLookAtPosition,
} = slice.actions

const {
  clear
} = slice.actions

export default slice.reducer

export const create = (id, color, rotation, lookAt, intensity) => dispatch => {
  const light  = new DirectionalLight(new Color(color.r / 255, color.g / 255, color.b / 255), intensity)
  const obj    = new Object3D()
  const helper = new DirectionalLightHelper(light)

  light.position.set(0, 0, 0)

  light.target = obj
  
  obj.position.set(lookAt.x, lookAt.y, lookAt.z)

  World.createEntity({
    id,
    c: {
      editor: {
        type: 'Editor',
        value: 'DirectionalLight',
      },
      intensity: {
        type: 'Intensity',
        value: light.intensity,
        target: light,
      },
      visibility: {
        type: 'Visibility',
        value: light.visible,
        target: light,
      },
      castShadows: {
        type: 'CastShadows',
        value: light.castShadow,
        target: light,
      },
      color: {
        type: 'Color',
        r: color.r,
        g: color.g,
        b: color.b,
        target: light.color,
      },
      rotation: {
        type: 'Rotation',
        x: -50 + rotation.x,
        y: rotation.y,
        z: rotation.z,
        target: obj,
      },
      helper: {
        type: 'Helper',
        value: helper,
      }
    }
  })
  
  scene.add(obj)
  scene.add(light)
  scene.add(helper)

  registerEditableEntity(id)(dispatch)

  dispatch(clear())
}