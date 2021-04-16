let p1 = new Promise((resolve) => {
    setTimeout(() => {
        resolve(1)
    }, 2000)
})


let p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject(2)
    }, 3000)
})

let p3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(3)
    }, 1000)
})


Promise.myall = function (arr) {
    if (!Array.isArray(arr)) {
        console.error('传入参数需要是数组')
        return
    }
    return new Promise((resolve, reject) => {
        let num = 0
        let len = arr.length
        let res = new Array(len)
        for (let i = 0; i < len; i++) {
            Promise.resolve(arr[i]).then(val => {
                num++
                res[i] = val
                if (num === len) {
                    resolve(res)
                }
            }).catch(error => {
                reject(error)
            })
        }
    })
}


Promise.allSettled = function (arr) {
    return new Promise((resolve, reject) => {
        const len = arr.length
        let num = 0
        const res = []
        for (let i = 0; i < len; i++) {
            let obj = {}
            Promise.resolve(arr[i]).then(val => {
                obj['status'] = 'fulfilled'
                obj['value'] = val
                num++
                res[i] = obj
                if (num === len) {
                    return resolve(res)
                }
            }).catch(e => {
                obj['status'] = 'rejected'
                obj['reason'] = e
                num++
                res[i] = obj
                if (num === len) {
                    return resolve(res)
                }
            })

        }
    })
}



Promise.allSettled([p1, p2, p3]).then(val => {
    console.log(val)
})