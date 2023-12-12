export function throttleByKey(fn, wait, getKey) {
    const lastRunMap = new Map()
    const resultMap = new Map()
    return function (...args) {
        const key = getKey.call(null, ...args)
        const lastRun = lastRunMap.get(key)
        const now = new Date().getTime()
        if (!lastRun || now - lastRun > wait) {
            const result = fn.call(this, ...args)
            lastRunMap.set(key, now)
            resultMap.set(key, result)
        }
        return resultMap.get(key)
    }
}

export const throttle = (fn, wait) => throttleByKey(fn, wait, () => '')
