import {
  BoxGeometry,
  WireframeGeometry,
} from 'three'

import World, {
  autoNameIfPlaceholder,
} from '../../../env'

const doUpdateTarget = (entity, size, axis, value) => {
  const { segments } = World.getEntity(entity).c

  let resized = { ...size }

  resized[axis] = value

  const updated = new BoxGeometry(
    resized.width,
    resized.height,
    resized.depth,

    segments.wide,
    segments.high,
    segments.deep,
  )

  size.target.children[0].geometry.dispose()
  size.target.children[1].geometry.dispose()

  size[axis] = value

  size.target.children[0].geometry = updated
  size.target.children[1].geometry = new WireframeGeometry(updated)

  size.update()
}

const common = (entity, size) => ({
  max: 10,
  min:  1,

  type:  'Slider',
  scope: 'Size',

  updateTarget: (axis, value) => {
    doUpdateTarget(entity, size, axis, value)
    autoNameIfPlaceholder('Box', entity)
  },
})

export default common