import React, {
  useMemo,
  useState,
} from 'react'

import World from '../../../env'

import Object from '../../../ui/Object'

import { axis } from '../helpers'

import common from './common'

const BoxSegments = ({ entity }) => {
  const { segments } = World.getEntity(entity).c

  let [wide, setWide] = useState(undefined)
  let [high, setHigh] = useState(undefined)
  let [deep, setDeep] = useState(undefined)

  useMemo(() => {
    wide = segments.wide
    high = segments.high
    deep = segments.deep

    setWide(wide)
    setHigh(high)
    setDeep(deep)
  }, [entity])

  return <Object
    label="Segments"
    entity={entity}
    fields={[
      axis('wide', wide, setWide, common(entity, segments)),
      axis('high', high, setHigh, common(entity, segments)),
      axis('deep', deep, setDeep, common(entity, segments)),
    ]}
  />
}

export default BoxSegments
