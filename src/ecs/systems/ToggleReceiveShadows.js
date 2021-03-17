import World, { System } from '../Ape'

class ToggleReceiveShadows extends System {
  init() {
    this.mainQuery = this.createQuery().fromAll('ReceiveShadows')
  }

  update(tick) {
    const entities = this.mainQuery.refresh().execute()

    for (const entity of entities) {
      const component = entity.getOne('ReceiveShadows')

      component.target.receiveShadow = component.value

      component.update()
    }
  }
}

World.registerSystem('frame', ToggleReceiveShadows)

export default ToggleReceiveShadows