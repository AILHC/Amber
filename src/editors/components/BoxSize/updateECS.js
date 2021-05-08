const updateECS = (size, value) => {
  size.x = value.x
  size.y = value.y
  size.z = value.z

  size.update()
}

export default updateECS