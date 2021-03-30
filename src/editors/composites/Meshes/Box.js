import React from 'react'

import Wrapper from '../../../helpers/FieldsetWrapper'

import Name           from '../../components/Name'
import Color          from '../../components/Color'
import BoxSize        from '../../components/BoxSize'
import Position       from '../../components/Position'
import Rotation       from '../../components/Rotation'
import Wireframe      from '../../components/Wireframe'
import Visibility     from '../../components/Visibility'
import CastShadows    from '../../components/CastShadows'
import BoxSegments    from '../../components/BoxSegments'
import ReceiveShadows from '../../components/ReceiveShadows'

const Component = ({ entity }) =>
  <form
    className="box editor"
    id={`${entity}-component-editor`}
    onSubmit={e => e.preventDefault()}
  >
    <h3>General</h3>
    <Name entity={entity} />
    <Wrapper label="Visible"   child={<Visibility entity={entity} />} />
    <Wrapper label="Wireframe" child={<Wireframe  entity={entity} />} />
    <div className="section-boundary" />
    <h3>Material</h3>
    <Color entity={entity} type="Box" />
    <div className="section-boundary" />
    <h3>Shadows</h3>
    <Wrapper label="Cast"    child={<CastShadows    entity={entity} type="Box" />} />
    <Wrapper label="Receive" child={<ReceiveShadows entity={entity} type="Box" />} />
    <div className="section-boundary" />
    <h3>Mesh</h3>
    <BoxSize     entity={entity} />
    <BoxSegments entity={entity} />
    <Position    entity={entity} type="Box" />
    <Rotation    entity={entity} type="Box" />
  </form>

export default Component
