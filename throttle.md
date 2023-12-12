# throttle

## Implement throttle function

```ts
type Throttle = (fn: Function, wait: number) => Function
```

### Test cases

```js
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

let count = 0
const fn = () => count++
const tfn = throttle(fn, 1000)

tfn()
await sleep(100)
tfn()
await sleep(100)
console.assert(count === 1)
await sleep(500)
tfn()
console.assert(count === 1)
await sleep(500)
tfn()
console.assert(count === 2)

console.log('Test execution completed')
```


## Consider the return value of the target function

```ts
type FunctionReturnsNonUndefined = (...args: unknown[]) => string | number | boolean | object
type Throttle = (fn: FunctionReturnsNonUndefined, wait: number) => FunctionReturnsNonUndefined
```

### Test cases

```js
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

const fn = () => `${new Date().toISOString()}`
const tfn = throttle(fn, 1000)

const r1 = tfn()
await sleep(500)
const r2 = tfn()
console.assert(r1 === r2 )
await sleep(1000)
const r3 = tfn()
console.assert(r1 !== r3)

console.log('Test execution completed')
```

## Implement throttle function that throttles by key, also consider the return value of the target function

```ts
type FunctionReturnsNonUndefined = (...args: unknown[]) => string | number | boolean | object
type KeyGetter = (...args: unknown[]) => string
type ThrottleByKey = (fn: FunctionReturnsNonUndefined, wait: number, getKey: KeyGetter) => FunctionReturnsNonUndefined
```

### Test cases

```js
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

const fn = (p) => `${new Date().toISOString()}`
const tfn = throttleByKey(fn, 1000, (p) => `${p}`)

const r1 = tfn(1)
await sleep(100)
const r2 = tfn(1)
await sleep(100)
const r3 = tfn(2)
console.assert(r1 === r2)
console.assert(r1 !== r3)
await sleep(500)
const r4 = tfn(2)
console.assert(r3 === r4)
await sleep(1000)
const r5 = tfn(1)
console.assert(r1 !== r5)
console.assert(r4 !== r5)

console.log('Test execution completed')
```