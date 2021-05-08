import { autoNameIfPlaceholder } from '../../../env'

const doUpdateTarget = (position, axis, value) => {
  position[axis]        = value
  position.target[axis] = value

  position.update()
}

const common = (entity, position, type) => ({
  max:  5,
  min: -5,

  type:  'Slider',
  scope: 'Position',

  updateTarget: (axis, value) => {
    doUpdateTarget(position, axis, value)
    autoNameIfPlaceholder(type, entity)
  },
})

export default common