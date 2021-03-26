import React from 'react'

import Wrapper from '../../../helpers/FieldsetWrapper'

import Color      from '../../components/Color'
import Shadows    from '../../components/Shadows'
import Position   from '../../components/Position'
import Rotation   from '../../components/Rotation'
import Visibility from '../../components/Visibility'

const Component = ({ entity }) =>
  <form className="box editor" id={`${entity}-component-editor`}>
    <Wrapper label="Visibility" child={<Visibility entity={entity} />} />
    <Shadows  entity={entity} />
    <Position entity={entity} />
    <Rotation entity={entity} />
    <Color    entity={entity} />
  </form>

export default Component
