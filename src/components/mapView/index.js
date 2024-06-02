/*
 * @Author: jmelon66 961255554@qq.com
 * @Date: 2024-04-04 10:18:12
 * @LastEditors: git config user.name && git config user.email
 * @LastEditTime: 2024-06-02 18:01:38
 * @FilePath: \mapDemoJS\src\components\mapView\index.js
 * @Description: 主函数
 */
import './index.less'
import ImgM from './manager/imageM'
class MapView {
  dom = null
  canvas = null
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
    const pdom = document.createElement('div')
    const canvas = document.createElement('canvas')
    pdom.className = '_map_view'
    canvas.id = 'map_view_entity'
    canvas.style.position = 'absolute'
    canvas.style.left = '0'
    canvas.style.top = '0'
    canvas.style.width = '100%'
    canvas.style.height = '100%'
    canvas.width = element.clientWidth
    canvas.height = element.clientHeight
    this.mapImage = await ImgM.loadImageByNameAsync('map')
    pdom.appendChild(canvas)
    element.appendChild(pdom)
    // 初始化
    this.canvas = canvas
    this.dom = element
    this.draw(canvas)
    this.initListener(pdom)
  }

  draw(canvas) {
    const ctx = canvas.getContext('2d')
    ctx.globalCompositeOperation = 'destination-over'
    ctx.drawImage(this.mapImage, 0, 0, canvas.width, canvas.height)
  }
  // 鼠标状态 0 无，1 拖动
  mouseType = 0
  initListener(element) {
    element.addEventListener('mousedown', this.mousedownListener.bind(this))
    element.addEventListener('mousemove', this.mousehoverListener.bind(this))
    window.addEventListener('mouseup', this.mouseupListener.bind(this))
    element.addEventListener('mouseleave', this.mouseleaveListener.bind(this))
    element.addEventListener('wheel', this.wheelListener.bind(this))
  }
  // 事件监听
  mouseClientX = 0
  mouseClientY = 0
  translateX = 0
  translateY = 0
  mousedownListener(e) {
    this.mouseType = 1
    e.stopPropagation()
    console.log('click')
    this.mouseClientX = e.clientX
    this.mouseClientY = e.clientY
  }
  animationIndex = 0
  mousehoverListener(e) {
    if (this.mouseType !== 1) return
    this.translateX += e.clientX - this.mouseClientX
    this.translateY += e.clientY - this.mouseClientY
    this.mouseClientX = e.clientX
    this.mouseClientY = e.clientY
    if (!this.animationIndex) {
      this.animationIndex = requestAnimationFrame(this.dragCanvas.bind(this))
    }
  }
  mouseupListener(e) {
    console.log('up')
    this.mouseType = 0
  }
  mouseleaveListener(e) {
    this.mouseType = 0
  }
  // 滚轮
  wheelListener(e) {
    if (e.deltaY > 0) {
      this.zoom -= 0.1
    } else {
      this.zoom += 0.1
    }
    if (this.zoom > 15) {
      this.zoom = 15
    }
    if (this.zoom < 0.5) {
      this.zoom = 0.5
    }
    if (!this.animationIndex) {
      this.animationIndex = requestAnimationFrame(this.dragCanvas.bind(this))
    }
  }
  // css拖动
  zoom = 1
  dragCanvas() {
    // 防止多次刷新
    cancelAnimationFrame(this.animationIndex)
    this.animationIndex = null
    const { canvas } = this
    canvas.style.transform = `translateX(${this.translateX}px) translateY(${this.translateY}px) scale(${this.zoom})`
  }
  zoomCanvas() {}
}
export default MapView
