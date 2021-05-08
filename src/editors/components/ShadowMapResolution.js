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
    backgroundColor: 'var(--library-background-color)',
    border: 'none',
    boxShadow: 'none',
    borderTopRightRadius: '.25rem',
    borderBottomRightRadius: '.25rem',
    ':hover': {
      borderColor: 'transparent',
      boxShadow: 'none',
    }
  }),
  menu: provided => ({
    ...provided,
    backgroundColor: 'var(--library-background-color)',
    border: 'none',
    color: 'var(--library-text-color)',
    zIndex: 100,
    boxShadow: 'none',
  }),
  groupHeading: provided => ({
    ...provided,
    fontWeight: 900,
    paddingLeft: '.75rem',
    color: 'var(--library-group-heading-text-color)',
  }),
  option: (provided, state) => ({
    ...provided,
    color: `var(--library-text-color${state.isSelected ? '-inverted' : ''})`,
    backgroundColor: state.isSelected ? 'var(--library-option-hover-background-color)' : 'transparent',
    ':hover': {
      ...provided,
      backgroundColor: 'var(--library-option-hover-background-color)',
      color: 'var(--library-text-color-inverted)',
    }
  }),
  input: provided => ({
    ...provided,
    color: 'var(--library-text-color)',
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
