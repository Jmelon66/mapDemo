const imageO = {
  map: new URL('../assets/map.png', import.meta.url).href
}
const ImgM = {
  imageO,
  loadImageByNameAsync(name) {
    const image = new Image()
    return new Promise((resolve) => {
      image.src = imageO[name]
      image.onload = function () {
        resolve(image)
      }
    })
  }
}
export default ImgM
