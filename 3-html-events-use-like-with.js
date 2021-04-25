// concept
function withly(obj, func) {
    const element = Object.defineProperties(document.createElement("div"), Object.getOwnPropertyDescriptors(obj))
    element.result = undefined
    element.setAttribute("onclick", `result = (${func})()`)
    element.click()
    return element.result
}

export use(...args) {
  const element = document.createElement("div")
  args.forEach(obj => Object.defineProperties(element, Object.getOwnPropertyDescriptors(obj)))
  element[Symbol.for("html-with")] = undefined
  return fn => {
    element.setAttribute("onclick", `this[Symbol.for("html-with")] = (${fn})()`)
    element.click()
    return element[Symbol.for("html=with")]
  }
}
