import React, { useState, useMemo } from 'react'

import Select from 'react-select'

import { ShadowMapResolutions } from '../../creators/helpers'

import World, { autoNameIfPlaceholder } from '../../env'

import UIWrapper from '../../helpers/FieldsetWrapper'

const shadowMapResolutionOptions = Object.keys(ShadowMapResolutions).map(s => ({
  label: s,
  value: ShadowMapResolutions[s],
}))

const styles = {
  container: provided => ({
    ...provided,
    width:    'auto',
    height:   '1.65rem',
    padding:   0,
    display:  'flex',
    flex:      1,
    fontSize: '1rem',
  }),
  control: () => ({
    display: 'flex',
    flex:     1,
  })
}

const updateTarget = (component, value) => {
  component.width  = value
  component.height = value

  component.target.mapSize.width  = value
  component.target.mapSize.height = value

  component.target.map.dispose()
  component.target.map = null

  component.update()
}

const ShadowMapResolution = ({
  type,
  entity,
}) => {
  const { shadowMapResolution } = World.getEntity(entity).c

  let [resolution, setResolution] = useState(undefined)

  useMemo(() => {
    resolution = shadowMapResolution.width

    setResolution(resolution)
  }, [entity, resolution])

  const selected = shadowMapResolutionOptions.find(s => s.value === resolution)

  const ResolutionSelector = <Select
    defaultValue={selected}
    styles={styles}
    options={shadowMapResolutionOptions}
    onChange={(sel, meta) => {
      if (meta.action === 'select-option') {
        setResolution(sel.value)
        updateTarget(shadowMapResolution, sel.value)
      }
      else if (meta.action === 'clear') {
        setResolution(0)
        updateTarget(shadowMapResolution, 0)
      }

      autoNameIfPlaceholder(`${type}Light`, entity)
    }}
  />

  return <UIWrapper label="Resolution" child={ResolutionSelector} />
}

export default ShadowMapResolution
