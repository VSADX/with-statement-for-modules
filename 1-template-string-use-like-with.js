// from https://gist.github.com/0kku/d67e9a685bde9c159ff3bc4c4ee923b1
// by   https://github.com/0kku
export function use(...objects) {
  const values = [];
  const keys = (objects.flatMap(object => {
      const prototypeChain = [];
      do {
        prototypeChain.unshift(object);
      } while (object = Object.getPrototypeOf(object));
      return prototypeChain;
    })
    .flatMap(object => {
      const keys = Object.getOwnPropertyNames(object);
      values.push(...keys.map(key => object[key]));
      return keys;
    })
  );

  return (strings, ...slots) => new Function(
    ...keys,
    strings.reduce((a, b, i) => a + String(slots[i]) + b),
  )(...values);
}

if(false) console.log(
  use(Math, {a: 2})`
    return valueOf.call(PI * a);
  `
);
