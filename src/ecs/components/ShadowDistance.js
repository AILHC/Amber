import World, { Component } from '../Ape'

class ShadowDistance extends Component {}

ShadowDistance.properties = {
  value:  0,
  target: null,
}

World.registerComponent(ShadowDistance)

export default ShadowDistance