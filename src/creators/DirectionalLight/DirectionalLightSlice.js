import { createSlice } from '@reduxjs/toolkit'

import {
  Color,
  Object3D,
  DirectionalLight,
} from 'three'

import World from '../../ecs/Ape'

import { scene } from '../../Scene'

import { registerEditableEntity } from '../../EntityEditor/EntityEditorSlice'

const slice = createSlice({
  name: 'DirectionalLight',
  initialState: {
    id: '',
    r: 255,
    g: 255,
    b: 255,
    intensity: 1,
  },
  reducers: {
    setId:        (state, { payload }) => ({ ...state, id: payload }),
    setColor:     (state, { payload }) => ({ ...state, ...payload.rgb }),
    setIntensity: (state, { payload }) => ({ ...state, intensity: payload }),
  }
})

export const {
  setId,
  setColor,
  setIntensity
} = slice.actions

export default slice.reducer

export const create = (id, color, intensity) => dispatch => {
  const light = new DirectionalLight(new Color(color.r / 255, color.g / 255, color.b / 255), intensity)
  const obj = new Object3D()

  light.target = obj
  
  obj.position.set(0, 1, -1)

  World.createEntity({
    id,
    c: {
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
    }
  })
  
  scene.add(obj)
  scene.add(light)

  registerEditableEntity(id)(dispatch)
}