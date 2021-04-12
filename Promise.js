class KPromise {
    constructor(handle) {
        this['status'] = 'pending'
        this['result'] = undefined
        this.resolveFnQueue = []
        this.rejectFnQueue = []
        handle(this._resolve.bind(this), this._reject.bind(this))
    }
    _resolve(val) {
        this['status'] = 'fulfilled'
        this['result'] = val

        const run = () => {
            let cb
            while (cb = this.resolveFnQueue.shift()) {
                cb && cb(val)
            }
        }
        setTimeout(run, 0);
    }

    _reject(err) {
        this['status'] = 'rejected'
        this['result'] = err

        const run = () => {
            let cb
            while (cb = this.rejectFnQueue.shift()) {
                cb && cb(err)
            }
        }
        setTimeout(run, 0);
    }

    then(onResolve, onReject) {
        return new KPromise((resolve, reject) => {

            const resolveFn = (val) => {
                let res = onResolve && onResolve(val)
                if (res instanceof KPromise) {
                    res.then(resolve)
                } else {
                    resolve(res)
                }
            }

            this.resolveFnQueue.push(resolveFn) 

            const rejectFn = (err) => {
                onReject && onReject(err)
                reject(err)
            }

            this.rejectFnQueue.push(rejectFn)

        })
    }

}




let p1 = new Promise((resolve, reject) => {

})

p1.then(res => {

})