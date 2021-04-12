

Array.prototype.reduce = function (cb, init) {
    if (typeof cb !== 'function') {
        return new Error('cb需要为函数')
    }
    let pre = init ? init : 0
    const arr = this

    for (let i = 0; i < this.length; i++) {
        pre = cb(pre, arr[i], i, arr)
    }
    return pre
}


