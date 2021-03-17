import World from './Ape'

import C from './components'
import S from './systems'

export default World

export const Components = C
export const Systems    = S

const frame = World.createEntity({
  id: 'frame',
  c: {
    time: {
      type: 'CurrentFrame',
    }
  }
})

let epoch = Date.now(), lastFrame = epoch

const { time } = frame.c

const loop = t => {
  const delta = t - lastFrame

  time.update({
    epoch,
    time: t,
    deltaTime: delta,
    deltaFrame: delta / 16.667
  })

  World.runSystems('frame')

  lastFrame = t

  requestAnimationFrame(loop)
}

loop(lastFrame)