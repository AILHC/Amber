import React from 'react'

import World from '../ecs'

import Editors from '../editors/composites'

import Select from '../ui/Select'

const Component = ({
  currentEntity,
  setCurrentEntity,
  editableEntities,
}) => {
  let options = [], Editor

  for (const editable of editableEntities) {
    options.push(editable)

    if (editable === currentEntity) {
      const matched = World.getEntity(currentEntity)

      Editor = Editors[matched.types.Editor.values().next().value.value]
    }
  }

  return options.length > 0 ?
    <div className="edit-entity">
      <div className="type shadow rounded">
        <Select scope="Edit" label="Entity" value={currentEntity} options={options} update={setCurrentEntity} />
      </div>
      {Editor ? <Editor entity={currentEntity} /> : null}
    </div>
    :
    null
}

export default Component
