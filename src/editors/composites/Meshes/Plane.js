import React from 'react'

import Wrapper from '../../../helpers/FieldsetWrapper'

import Name           from '../../components/Name'
import Color          from '../../components/Color'
import Position       from '../../components/Position'
import Rotation       from '../../components/Rotation'
import Wireframe      from '../../components/Wireframe'
import Visibility     from '../../components/Visibility'
import ReceiveShadows from '../../components/ReceiveShadows'

const Component = ({ entity }) =>
  <form className="plane editor" id={`${entity}-component-editor`}>
    <Name entity={entity} />

    <Wrapper label="Visible"         child={<Visibility     entity={entity} />} />
    <Wrapper label="Wireframe"       child={<Wireframe      entity={entity} />} />
    <Wrapper label="Receive Shadows" child={<ReceiveShadows entity={entity} />} />

    <Position   entity={entity} />
    <Rotation   entity={entity} />
    <Color      entity={entity} />
  </form>

export default Component
