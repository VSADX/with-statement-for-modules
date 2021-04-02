function use(...args) {
  
    const compiledObj = args.reduce((obj, arg) =>
        Object.getOwnPropertyNames(arg)
          .map(name => [name, arg[name]])
          .forEach(([name, value]) => 
            obj[name] = (value && value.apply && value.bind) ?
                value.bind(arg) : value) || obj, {})
    
    return (f) => Function(
            `with(this) { return (${
                f.toString().replace("{", "{'use strict';")
            })() }`).call(compiledObj)
}
