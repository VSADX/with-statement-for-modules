export function use (...contexts) {
  const context = Object.fromEntries(contexts
    .map(context => Object.getOwnPropertyNames(context)
      .map(key => [key, context[key]])).flat())
  const keys = Object.keys(context)
  const getter = `let [{ ${keys} }] = arguments`
  const setter = `Object.assign(arguments[0], { ${keys} })`

  return async fn => (await import(URL.createObjectURL(new Blob([
    `export default async function () {
       ${getter}

       return [await(${fn})(), ${setter}].shift()
    }`
  ], {
    type: 'text/javascript'
  }))))
  .default(context)
}
/** example
async function car_color() {
  const color = "red"
  
  const paused_scope = use({color})

  await paused_scope(() => color = "blue")

  await paused_scope(() => console.log(color)) // blue

  console.log(color) // red

  return paused_scope // now you have the paused scope to run functions against.
}

car_color()
 */
