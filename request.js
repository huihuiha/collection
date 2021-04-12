




function maxRequest(urls, maxNum, callback) {
    const len = urls.length
    const res = [] // 结果
    let num = 0 // 表示完成的数量

    while (num <= maxNum) {
        next()
    }

    function next() {
        if (num === len) {
            callback(res)
            return
        }
        let cur = num // 表示当前的url索引
        num += 1
        fetch(url).then(val => {
            res[curs[cur]] = val
            if (cur < len) {
                next() // 递归执行
            }
        }).catch(e => {
            res[cur] = e
            if (cur < len) {
                next() // 递归执行
            }
        })
    }
}