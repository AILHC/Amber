import World, { System } from '../Ape'

class UpdateMaterialColor extends System {
  init() {
    this.mainQuery = this.createQuery().fromAll('MaterialColor')
  }

  update(tick) {
    const entities = this.mainQuery.execute()

    for (const entity of entities) {
      const component = entity.getOne('MaterialColor')

      component.target.color = {
        r: component.r,
        g: component.g,
        b: component.b,
      }

      component.update()
    }
  }
}

World.registerSystem('frame', UpdateMaterialColor)

export default UpdateMaterialColor