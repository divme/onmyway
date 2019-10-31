/**
 * Created by Administrator on 2019/10/24 0024.
 */
class Event {
    constructor() {
        this.cache = {}
    }
    on(type, fn) {
        const fns = this.cache[type] ? this.cache[type] : []
        if (fns.indexOf(fn) === -1) {
            fns.push(fn)
        }
        return this
    }
    trigger(type, data) {
        const fns = this.cache[type]
        if (fns) {
            fns.forEach( res => res(data))
        }
        return this
    }
    off(type, fn) {
        const fns = this.cache(type)
        if (fns && fn && fns.indexOf(fn) >= 0) {
            const index = fns.indexOf(fn)
            fns.splice(index, 1)
        } else {
            fns.length = 0
        }
    }
}