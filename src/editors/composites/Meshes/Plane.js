import React from 'react'

import Wrapper from '../../../helpers/FieldsetWrapper'

import Color          from '../../components/Color'
import Position       from '../../components/Position'
import Rotation       from '../../components/Rotation'
import Visibility     from '../../components/Visibility'
import ReceiveShadows from '../../components/ReceiveShadows'

const Component = ({ entity }) =>
  <form className="plane editor" id={`${entity}-component-editor`}>
    <Wrapper label="Visibility"      child={<Visibility     entity={entity}                   />} />
    <Wrapper label="Receive Shadows" child={<ReceiveShadows entity={entity} showLabel={false} />} />
    <Position   entity={entity} />
    <Rotation   entity={entity} />
    <Color      entity={entity} />
  </form>

export default Component
