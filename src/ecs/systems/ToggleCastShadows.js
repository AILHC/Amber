import World, { System } from '../Ape'

class ToggleCastShadows extends System {
  init() {
    this.mainQuery = this.createQuery().fromAll('CastShadows')
  }

  update(tick) {
    const entities = this.mainQuery.refresh().execute()

    for (const entity of entities) {
      const component = entity.getOne('CastShadows')

      component.target.castShadow = component.value

      component.update()
    }
  }
}

World.registerSystem('frame', ToggleCastShadows)

export default ToggleCastShadows