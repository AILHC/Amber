import World, { Component } from '../Ape'

class CastShadows extends Component {}

CastShadows.properties = {
  value: false,
  target: null,
}

World.registerComponent(CastShadows)

export default CastShadows