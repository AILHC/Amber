import World, { Component } from '../Ape'

class Helper extends Component {}

Helper.properties = {
  value: null
}

World.registerComponent(Helper)

export default Helper