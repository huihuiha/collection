





function debounce(fn, wait, immediate) {
    let timer = null
    return function () {
        const context = this
        const args = arguments
        timer && clearTimeout(timer)
        if (immediate) {
            const now = !timer
            timer = setTimeout(() => {
                timer = null
            }, wait)
            now && fn.apply(context, args)
        } else {
            timer = setTimeout(() => {
                fn.apply(context, args)
            }, wait)
        }
    }
}