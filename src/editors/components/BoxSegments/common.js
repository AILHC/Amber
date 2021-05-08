import {
  BoxGeometry,
  WireframeGeometry,
} from 'three'

import World, {
  autoNameIfPlaceholder
} from '../../../env'

const doUpdateTarget = (entity, segments, axis, value) => {
  const { size } = World.getEntity(entity).c

  let resized = { ...segments }

  resized[axis] = value

  const updated = new BoxGeometry(
    size.width,
    size.height,
    size.depth,

    resized.wide,
    resized.high,
    resized.deep,
  )

  segments.target.children[0].geometry.dispose()
  segments.target.children[1].geometry.dispose()

  segments[axis] = value

  segments.target.children[0].geometry = updated
  segments.target.children[1].geometry = new WireframeGeometry(updated)

  segments.update()
}

const common = (entity, segments) => ({
  max: 10,
  min:  1,
  step: 1,

  type:  'Slider',
  scope: 'Segments',

  updateTarget: (axis, value) => {
    doUpdateTarget(entity, segments, axis, value)
    autoNameIfPlaceholder('Box', entity)
  },
})

export default common