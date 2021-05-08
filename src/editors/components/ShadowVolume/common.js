import World, {
  autoNameIfPlaceholder,
} from '../../../env'

const doUpdateTarget = (entity, shadowVolume, axis, value) => {
  const { helpers } = World.getEntity(entity).c

  const half = value * .5

  if (axis === 'width') {
    shadowVolume[axis] = value

    shadowVolume.target.left  = half - value
    shadowVolume.target.right = half
  }
  else if (axis === 'height') {
    shadowVolume[axis] = value

    shadowVolume.target.top    = half
    shadowVolume.target.bottom = half - value
  }
  else if (axis === 'depth') {
    shadowVolume[axis] = value

    shadowVolume.target.far = value
  }

  shadowVolume.target.updateProjectionMatrix()
  shadowVolume.update()

  for (const h of helpers.value)
    h.update()
}

const common = (entity, shadowVolume, type) => ({
  max: 500,
  min:   4,

  type:  'Slider',
  scope: 'ShadowVolume',

  updateTarget: (axis, value) => {
    doUpdateTarget(entity, shadowVolume, axis, value)
    autoNameIfPlaceholder(`${type}Light`, entity)
  },
})

export default common