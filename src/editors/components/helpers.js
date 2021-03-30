export const axis = (
  entity,
  label,
  value,
  fn,
  common = {
    updateTarget: () => {}
  },
) => ({
  ...common,
  label,
  value,
  update: val => {
    fn(val)
    common.updateTarget(entity, label, val)
  },
})