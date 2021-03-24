export const cssify = val => val.toLowerCase().replace(/\s+/g, '_')

export const classes = ({ label, expanded }) =>
  `${cssify(label)} ${expanded ? 'expanded' : 'collapsed'} shadow-sm rounded`

export const idFor = ({ scope, label }) => `${cssify(scope)}-${cssify(label)}`

export const defaultLabelClasses = showLabel => {
  let items = [
    'form-label',
    'col-4',
    'col-form-label',
    'col-form-label-sm',
  ]

  if (showLabel !== true) items.push('visually-hidden')

  return items.join(' ')
}