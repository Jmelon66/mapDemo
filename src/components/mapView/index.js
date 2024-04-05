/*
 * @Author: jmelon66 961255554@qq.com
 * @Date: 2024-04-04 10:18:12
 * @LastEditors: jmelon66 961255554@qq.com
 * @LastEditTime: 2024-04-04 10:37:22
 * @FilePath: \mapDemoJS\src\components\mapView\index.js
 * @Description: 主函数
 */
import ImgM from './manager/imageM'
class MapView {
  // 地图文件
  mapImage = null
  constructor(element, options) {
    // 偷懒参数
    Object.keys(options).forEach((k) => {
      const item = options[k]
      if (typeof item !== 'function') {
        this[k] = item
      }
    })
    this.initCanvas(element)
  }
  // 初始化canvas
  async initCanvas(element) {
    const canvas = document.createElement('canvas')
    canvas.id = 'map_view_entity'
    canvas.style.position = 'absolute'
    canvas.style.left = '0'
    canvas.style.top = '0'
    canvas.style.width = '100%'
    canvas.style.height = '100%'
    this.mapImage = ImgM.loadImageByNameAsync('map')
    // const ctx= canvas.getContext('2d')
    element.appendChild(canvas)
  }
}
export default MapView
