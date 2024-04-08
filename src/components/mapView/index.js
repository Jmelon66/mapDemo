/*
 * @Author: jmelon66 961255554@qq.com
 * @Date: 2024-04-04 10:18:12
 * @LastEditors: git config user.name && git config user.email
 * @LastEditTime: 2024-04-08 11:10:56
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
    canvas.width = element.clientWidth
    canvas.height = element.clientHeight
    this.mapImage = await ImgM.loadImageByNameAsync('map')
    element.appendChild(canvas)
    setTimeout(() => {
      console.log(this.mapImage, canvas.width, canvas.height)
      const ctx = canvas.getContext('2d')
      ctx.globalCompositeOperation = 'destination-over'
      ctx.drawImage(this.mapImage, 0, 0, canvas.width, canvas.height)
    }, 500)
  }
}
export default MapView
