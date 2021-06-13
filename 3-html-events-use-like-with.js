// concept
async function withly(obj, func) {
  return new Promise((resolve, reject) => {
    const element = Object.defineProperties(document.createElement("div"), {
      ...Object.getOwnPropertyDescriptors(obj),
      resolve: { enumerable: true, value: resolve },
      reject: { enumerable: true, value: reject }
    })
    element.result = undefined
    element.setAttribute("onclick", `try { resolve(result = (${func})()) } catch (e) { reject(e) }`)
    element.click()
  })
}

export function use(...args) {
  const element = document.createElement("div")
  args.forEach(obj => Object.defineProperties(element, Object.getOwnPropertyDescriptors(obj)))
  element[Symbol.for("html-with")] = undefined
  return fn => {
    element.setAttribute("onclick", `this[Symbol.for("html-with")] = (${fn})()`)
    element.click()
    return element[Symbol.for("html-with")]
  }
}
