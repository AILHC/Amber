import World, { System } from '../Ape'

class ToggleVisibility extends System {
  init() {
    this.mainQuery = this.createQuery().fromAll('Visibility')
  }

  update(tick) {
    const entities = this.mainQuery.refresh().execute()

    for (const entity of entities) {
      const component = entity.getOne('Visibility')

      component.target.visible = component.value

      component.update()
    }
  }
}

World.registerSystem('frame', ToggleVisibility)

export default ToggleVisibility