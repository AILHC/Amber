import React from 'react'

import Wrapper from '../../../helpers/FieldsetWrapper'

import Name       from '../../components/Name'
import Color      from '../../components/Color'
import Shadows    from '../../components/Shadows'
import Position   from '../../components/Position'
import Rotation   from '../../components/Rotation'
import Wireframe  from '../../components/Wireframe'
import Visibility from '../../components/Visibility'

const Component = ({ entity }) =>
  <form className="box editor" id={`${entity}-component-editor`}>
    <Name entity={entity} />

    <Wrapper label="Visible"   child={<Visibility entity={entity} />} />
    <Wrapper label="Wireframe" child={<Wireframe  entity={entity} />} />

    <Shadows   entity={entity} />
    <Position  entity={entity} />
    <Rotation  entity={entity} />
    <Color     entity={entity} />
  </form>

export default Component
