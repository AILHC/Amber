import World, { Component } from '../Ape'

class Penumbra extends Component {}

Penumbra.properties = {
  value:  .5,
  target: null,
}

World.registerComponent(Penumbra)

export default Penumbra