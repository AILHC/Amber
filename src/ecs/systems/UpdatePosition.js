import World, { System } from '../Ape'

class UpdatePosition extends System {
  init() {
    this.mainQuery = this.createQuery().fromAll('Position')
  }

  update(tick) {
    const entities = this.mainQuery.execute()

    for (const entity of entities) {
      const component = entity.getOne('Position')

      component.target.x = component.x
      component.target.y = component.y
      component.target.z = component.z

      component.update()
    }
  }
}

World.registerSystem('frame', UpdatePosition)

export default UpdatePosition