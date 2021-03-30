import World, { Component } from '../Ape'

class ShadowMapResolution extends Component {}

ShadowMapResolution.properties = {
  width:  0,
  height: 0,
  target: null,
}

World.registerComponent(ShadowMapResolution)

export default ShadowMapResolution