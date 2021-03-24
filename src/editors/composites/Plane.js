import React from 'react'

import Wrapper from '../../helpers/FieldsetWrapper'

import Color      from '../components/Color'
import Position   from '../components/Position'
import Rotation   from '../components/Rotation'
import Visibility from '../components/Visibility'

const Component = ({ entity }) =>
  <form className="plane editor" id={`${entity}-component-editor`}>
    <Wrapper name="Visibility" child={<Visibility entity={entity} />} />
    <Position   entity={entity} />
    <Rotation   entity={entity} />
    <Color      entity={entity} />
  </form>

export default Component
