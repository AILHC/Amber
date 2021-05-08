const updateECS = (position, value) => {
  position.x = value.x
  position.y = value.y
  position.z = value.z

  position.update()
}

export default updateECS