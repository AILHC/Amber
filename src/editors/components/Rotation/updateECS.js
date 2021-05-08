const updateECS = (rotation, value) => {
  rotation.x = value._x
  rotation.y = value._y
  rotation.z = value._z

  rotation.update()
}

export default updateECS