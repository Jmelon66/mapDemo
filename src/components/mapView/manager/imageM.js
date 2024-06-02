/*
 * @Date: 2024-04-04 10:20:06
 * @LastEditors: git config user.name && git config user.email
 * @LastEditTime: 2024-05-27 14:05:10
 * @FilePath: \mapDemoJS\src\components\mapView\manager\imageM.js
 * @Description:
 * @Author: ms-tlzksaoastkh
 */
const imageO = {
  map: new URL('../assets/map.png', import.meta.url).href
}
function RGBtoHSI([r, g, b]) {
  const R = r / 255
  const G = g / 255
  const B = b / 255
  const max = Math.max(R, G, B)
  const min = Math.min(R, G, B)
  const diff = max - min
  let H = 0
  if (diff === 0) {
    H = 0
  } else if (max === R && G > B) {
    H = (60 * (G - B)) / diff
  } else if (max === R) {
    H = 360 + (60 * (G - B)) / diff
  } else if (max === G) {
    H = 120 + (60 * (B - R)) / diff
  } else if (max === B) {
    H = 240 + (60 * (R - G)) / diff
  }
  const S = max === 0 ? 0 : 1 - min / max
  const I = max
  // const theTa =
  //   R === 0 && G === 0 && B === 0
  //     ? 0
  //     : (Math.acos((R - G + R - B) / 2 / Math.sqrt(Math.pow(R - G, 2) + (R - B) * (G - B))) * 180) /
  //       Math.PI
  // const H = B <= G ? theTa : 360 - theTa
  // const sA = R + G + B
  // const sB = 1 - Math.min(...[R, G, B]) * 3
  // const S = sA === 0 ? 0 : sB / sA
  // const I = (R + G + B) / 3
  return [H, S, I]
}
function HSItoRGB([H, S, I]) {
  const hi = Math.floor([H / 60] % 6)
  const f = H / 60 - hi
  const p = I * (1 - S)
  const q = I * (1 - f * S)
  const t = I * (1 - (1 - f) * S)
  switch (hi) {
    case 0:
      return [I, t, p]
    case 1:
      return [q, I, p]
    case 2:
      return [p, I, t]
    case 3:
      return [p, q, I]
    case 4:
      return [t, p, I]
    case 5:
      return [I, p, q]
  }
  return [0, 0, 0]
  // if (H >= 120 && H <= 240) {
  //   H -= 120
  // } else if (H >= 240 && H <= 360) {
  //   H -= 240
  // }
  // const HA = (H * Math.PI) / 180
  // const ca = Math.cos(Math.PI / 3 - HA)
  // const a1 = I * (1 - S)
  // const a2 = ca === 0 ? 0 : I * (1 + (S * Math.cos(HA)) / ca)
  // const a3 = 3 * I - (a1 + a2)
  // if (H >= 120 && H <= 240) {
  //   return [a1, a2, a3]
  // } else if (H >= 240 && H <= 360) {
  //   return [a3, a1, a2]
  // } else {
  //   return [a2, a3, a1]
  // }
}
function HucChange(imageData, rgbC) {
  const hsiC = RGBtoHSI(rgbC)
  const resA = []
  for (let i = 0; i < imageData.length; i += 4) {
    const rgb = []
    rgb.push(imageData[i])
    rgb.push(imageData[i + 1])
    rgb.push(imageData[i + 2])
    rgb.push(imageData[i + 3])
    const hsi = RGBtoHSI(rgb)
    hsi[0] += hsiC[0]
    // hsi[1] += hsiC[1]
    // hsi[2] += hsiC[2]
    resA.push(...HSItoRGB(hsi).map((n) => Math.floor(n * 255)))
    resA.push(imageData[i + 3])
  }
  return resA
}
const ImgM = {
  imageO,
  loadImageByNameAsync(name) {
    const image = new Image()
    return new Promise((resolve) => {
      image.src = imageO[name]
      image.onload = function () {
        ImgM.fixedImageColor(image).then((res) => {
          resolve(res)
        })
      }
    })
  },
  fixedImageColor(image) {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas')
      canvas.style.width = image.width
      canvas.style.height = image.height
      canvas.width = image.width
      canvas.height = image.height
      const ctx = canvas.getContext('2d')
      console.log(canvas)
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const imageData2 = HucChange(imageData.data, [255, 0, 0])

      console.log(imageData, imageData2)
      const imageD = new ImageData(new Uint8ClampedArray(imageData2), canvas.width, canvas.height)
      ctx.putImageData(imageD, 0, 0)
      const img = new Image()
      img.onload = () => {
        resolve(img)
      }
      img.src = canvas.toDataURL()
    })
  }
}
export default ImgM
