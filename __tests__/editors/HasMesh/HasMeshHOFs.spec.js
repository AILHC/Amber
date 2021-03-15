import {
} from '../../src/editors/HasMesh/HasMeshHocs'

describe('The HasMesh Hocs', () => {
  describe('hocs function', () => {
    it('is a higher order function', () => {
      expect(typeof myHoc()).toEqual('function')
    })
  })
})