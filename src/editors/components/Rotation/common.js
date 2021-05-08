import { autoNameIfPlaceholder } from '../../../env'

import convert from './convert'

const doUpdateTarget = (rotation, axis, value) => {
  const denormalized = (((value - 50) * .02) * Math.PI)

  rotation[axis]        = denormalized
  rotation.target[axis] = denormalized
}

const common = (entity, rotation, val, type) => ({
  max:  Math.PI,
  min: -Math.PI,

  type:  'NormalizedSlider',
  scope: 'Rotation',

  displayLabel: true,
  displayValue: convert(val),

  updateTarget: (axis, value) => {
    doUpdateTarget(rotation, axis, value)
    autoNameIfPlaceholder(type, entity)
  },
})

export default common