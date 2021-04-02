# Use Block / With Statement
  
## Examples
1. A `use` block is a function that takes one or more objects.
2. The `use()` function returns a new function (this is why we do `use(obj)(func)`).
3. Your function will have access to all the properties of the passed in object directly.
4. In this example `const x` is not being changed at all, the `x` inside `use` block is a copy only.
```js
function calc() {
  const x = 4
  const y = 3
  
  const new_y = use({x,y})(() => {
    x /= 4
    y = x + y
    return y
  })
  return {x, y: new_y}
}
```
  
1. A `use` block is a `with` statement under the hood.
2. Each parameter ({num}, Math) in `use({num}, Math)` is merged into your scope.
3. From your code block you can call all the properties or functions of `Math`.
4. Closure code outside of your `use` block is not available unless passed in directly.
```js
function calc_but_harder() {
  const num = 5 
  
  const new_num = use({num}, Math)(() => {
    const diff = cos(num) * num
    num -= diff
    return abs(num)
  })
  return {original: num, result: new_num}
}
```
  
References:  
Andrea Giammarchi, @/Simon_, Brian Will, Jonathan Blow
