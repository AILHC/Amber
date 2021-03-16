import { createSlice } from '@reduxjs/toolkit'

import {
  Color,
  Object3D,
  DirectionalLight,
} from 'three'

import World from '../../ecs/Ape'

import { scene } from '../../Scene'

const slice = createSlice({
  name: 'DirectionalLight',
  initialState: {
    color: '#fff',
    intensity: 1,
  },
  reducers: {
    setColor:     (state, { payload }) => ({ ...state, color:     payload.hex }),
    setIntensity: (state, { payload }) => ({ ...state, intensity: payload     }),
  }
})

export const {
  setColor,
  setIntensity
} = slice.actions

export default slice.reducer

export const create = (color, intensity) => () => {
  const light = new DirectionalLight(new Color(color), intensity)
  const obj = new Object3D()

  light.target = obj
  
  obj.position.set(0, 1, -1)

  World.createEntity({
    id: 'DirectionalLight',
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
    }
  })
  
  scene.add(obj)
  scene.add(light)
}