import World, { System } from '../Ape'

class UpdateRotation extends System {
  init() {
    this.mainQuery = this.createQuery().fromAll('Rotation')
  }

  update(tick) {
    const   entities    = this.mainQuery.execute()
    const { deltaTime } = this.world.getEntity('frame').c.time

    for (const entity of entities) {
      const component = entity.getOne('Rotation')

      component.target.x += component.x * deltaTime * .0001
      component.target.y += component.y * deltaTime * .0001

      component.update()
    }
  }
}

World.registerSystem('frame', UpdateRotation)

export default UpdateRotation