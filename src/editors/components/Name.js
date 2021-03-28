import React, { useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave          } from '@fortawesome/pro-duotone-svg-icons'

import {
  RenameEntity,
  EntitiesByEcsId,
} from '../../ecs'

import Text from '../../ui/Text'

import Wrapper from '../../helpers/FieldsetWrapper'

const styles = {
  '--fa-primary-color':     'var(--primary-button-background-color)',
  '--fa-secondary-color':   'var(--form-section-background-color)',
  '--fa-primary-opacity':   'var(--primary-button-primary-opacity)',
  '--fa-secondary-opacity': 'var(--primary-button-secondary-opacity)'
}

const Component = ({ entity }) => {
  const [id, setId] = useState(EntitiesByEcsId[entity])

  const value = id === ':placeholder:' ? '' : id

  return <Wrapper label="Name" child={
      <div className="col g-0">
        <div className="row">
          <Text columns={10} scope={entity} label="name" value={value} update={setId} />
          <div className="col-2 g-0 save-name">
            <button
              type="button"
              disabled={value.length <= 1}
              className="btn btn-primary"
              onClick={e => {
                RenameEntity({ EcsId: entity, EditorId: id })
                e.preventDefault()
              }}
            >
              <FontAwesomeIcon icon={faSave} style={styles} />
            </button>
          </div>
        </div>
      </div>
    } />
}

export default Component
