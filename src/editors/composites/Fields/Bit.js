import React, { useEffect } from 'react'

import { reset } from '../../../env'

import Wrapper from '../../../helpers/FieldsetWrapper'

import Name       from '../../components/Name'
import Position   from '../../components/Position'
import Rotation   from '../../components/Rotation'
import Visibility from '../../components/Visibility'

const BitField = ({ entity }) => {
  useEffect(() => reset())

  return <form
    className="plane editor"
    id={`${entity}-component-editor`}
    onSubmit={e => e.preventDefault()}
  >
    <h3>General</h3>
    <Name entity={entity} />
    <Wrapper label="Visible"   child={<Visibility entity={entity} />} />
    <div className="section-boundary" />
    <h3>Mesh</h3>
    <Position entity={entity} type="BitField" />
    <Rotation entity={entity} type="BitField" />
  </form>
}

export default BitField
