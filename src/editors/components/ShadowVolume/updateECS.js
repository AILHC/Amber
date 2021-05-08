const updateECS = (shadowVolume, value) => {
  shadowVolume.width  = value.x * 50
  shadowVolume.height = value.z * 50
  shadowVolume.depth  = value.y * 50

  shadowVolume.update()
}

export default updateECS