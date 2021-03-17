import World, { System } from '../Ape'

class UpdateMaterialColor extends System {
  init() {
    this.mainQuery = this.createQuery().fromAll('MaterialColor')
  }

  update(tick) {
    const entities = this.mainQuery.refresh().execute()

    for (const entity of entities) {
      const component = entity.getOne('MaterialColor')

      component.target.r = component.r
      component.target.g = component.g
      component.target.b = component.b

      component.update()
    }
  }
}

World.registerSystem('frame', UpdateMaterialColor)

export default UpdateMaterialColor