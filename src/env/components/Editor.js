import World, { Component } from '../Ape'

class Editor extends Component {}

Editor.properties = {
  value: '',
}

World.registerComponent(Editor)

export default Editor