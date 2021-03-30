import React from 'react'

import Wrapper from '../../../helpers/FieldsetWrapper'

import Name           from '../../components/Name'
import Color          from '../../components/Color'
import Position       from '../../components/Position'
import Rotation       from '../../components/Rotation'
import PlaneSize      from '../../components/PlaneSize'
import Wireframe      from '../../components/Wireframe'
import Visibility     from '../../components/Visibility'
import PlaneSegments  from '../../components/PlaneSegments'
import ReceiveShadows from '../../components/ReceiveShadows'

const Component = ({ entity }) =>
  <form className="plane editor" id={`${entity}-component-editor`} onSubmit={e => e.preventDefault()}>
    <h3>General</h3>
    <Name entity={entity} />
    <Wrapper label="Visible"   child={<Visibility entity={entity} />} />
    <Wrapper label="Wireframe" child={<Wireframe  entity={entity} />} />
    <div className="section-boundary" />
    <h3>Material</h3>
    <Color entity={entity} type="Plane" />
    <div className="section-boundary" />
    <h3>Shadows</h3>
    <Wrapper label="Receive" child={<ReceiveShadows entity={entity} type="Plane" />} />
    <div className="section-boundary" />
    <h3>Mesh</h3>
    <PlaneSize     entity={entity} />
    <PlaneSegments entity={entity} />
    <Position      entity={entity} type="Plane" />
    <Rotation      entity={entity} type="Plane" />
  </form>

export default Component
