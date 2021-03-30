import World, { System } from '../Ape'

class UpdatePosition extends System {
  init() {
    this.mainQuery = this.createQuery().fromAll('Position')
  }

  update(tick) {
    const entities = this.mainQuery.refresh().execute()

    for (const entity of entities) {
      const component = entity.getOne('Position')

      component.target.set(
        component.x,
        component.y,
        component.z,
      )

      component.update()
    }
  }
}

// World.registerSystem('frame', UpdatePosition)

export default UpdatePosition