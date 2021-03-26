import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faSave,
  faTrashUndoAlt,
} from '@fortawesome/pro-duotone-svg-icons'

const styles = {
  '--fa-primary-color':     'var(--primary-button-background-color)',
  '--fa-secondary-color':   'var(--form-section-background-color)',
  '--fa-primary-opacity':   'var(--primary-button-primary-opacity)',
  '--fa-secondary-opacity': 'var(--primary-button-secondary-opacity)'
}

const Component = ({ reset, create, createDisabled }) =>
  <div className="btn-toolbar d-flex justify-content-center" role="toolbar" aria-label="Actions available for this Direcitonal Light">
    <div className="btn-group me-2" role="group" aria-label="Undo">
      <button className="btn btn-primary" onClick={e => { reset(); e.preventDefault( ) }}>
        <FontAwesomeIcon icon={faTrashUndoAlt} size="3x" style={styles} />
      </button>
    </div>
    <div className="btn-group" role="group" aria-label="Save">
      <button className="btn btn-primary" onClick={e => { create(); e.preventDefault() }} disabled={createDisabled}>
        <FontAwesomeIcon icon={faSave} size="3x" style={styles} />
      </button>
    </div>
  </div>

export default Component