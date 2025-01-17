import Victor from 'victor'
import Shape from './Shape'

export default class Point extends Shape {
  constructor() {
    super('Point')
  }

  getInitialState() {
    return {
      ...super.getInitialState(),
      ...{
        type: 'point',
        autosize: false,
        startingWidth: 1,
        startingHeight: 1,
        canTransform: false,
        shouldCache: false,
        canChangeSize: false,
        repeatEnabled: false,
      }
    }
  }

  getVertices(state) {
    return [new Victor(0.0, 0.0)]
  }
}
