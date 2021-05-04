# Use Block / With Statement
Say we have a long function
```js
function signup(email_input, password_input) {
  
  // sometimes our functions can have a lot of variables like this
  
  const email = email_input.value
  const password = password_input.value
  const auth_root = "https://..."
  const auth_avail = "/auth/can_signup"
  const auth_signup = "/auth/signup"
  
  // we might not even know where they are used
  // sometimes we don't know if some might be totally unused
  
  let email_already_exists = false
  let password_too_easy = false
  let unknown_server_error;  

  // part of the problem is, all these inner functions can 
  // use all the variables above. there's no way to know
  // which are used where unless we read through each function.
  
  const is_password_long_enough = () => { ... }
  const is_password_too_close_to_email = () => { ... }
  const is_password_too_simple = () => { ... }
  const is_email_already_taken = () => { ... }
  const try_to_signup = () => { ... }
}
```
So, introducing the `use block` into JavaScript
```js
use({email,auth_root,auth_avail})(is_email_already_taken)
```
  
## How to use it.
1. A `use` block is a function that takes one or more objects.
2. The `use()` function returns a new function (this is why we do `use(obj)(func)`).
3. Your function will have access to all the properties of the passed in object directly.
4. In this example `const x` is not being changed at all, the `x` inside `use` block is a copy only.
```js
function calc() {
  const z = 5
  const x = 4
  let y = 3
  
  // since we only "use" `x` then `y`
  // we know our function never uses `z`
  //
  y = use({x,y})(() => {
    x /= 4
    y = x + y
    return y
  })

  return {x, y}
}
```
  
### Wait, so we can make inner functions that have no closure scope?? 
1. Yep, a `use` block is safe from closure scope.
2. Place `use` blocks if you want inner functions that are "pure".
3. The block can only see **the properties** of the objects passed in - also globals.
```js
function burger_kind() {
  const burger = "Jalapeño"
  
  // nothing is passed into our `use` block
  use({})(() => {
    
    try {
      burger = "Cheese"
    } 
    catch (error) {
      // the console will print "error" 
      // the use block does not know about `burger`
      // it only knows of things passed in or globals
      //
      console.log("error")
    }
  })
}
```
  
### Passing in multiple objects.
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
  
### Exporting local variables / Returning the function but paused
```js
function car_color() {
  const color = "red"
  
  const paused_scope = use({color})

  paused_scope(() => color = "blue")

  paused_scope(() => console.log(color)) // blue

  console.log(color) // red

  return paused_scope // now you have the paused scope to run functions against.
}
``` 
  
References:  
Andrea Giammarchi, @/Simon_, Brian Will, Jonathan Blow
