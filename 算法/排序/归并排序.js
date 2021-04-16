



function mergeSort() {

    const rec = (arr) => {
        if (arr.length === 1) { return arr }
        const mid = Math.floor(arr.length / 2)
        const left = arr.slice(0, mid)
        const right = arr.slice(mid, arr.length)
        const orderLeft = rec(left)
        const orderRight = rec(right)
        const res = []
        while (orderLeft.length || orderRight.length) {
            if (orderRight.length && orderLeft.length) {
                if (orderLeft[0] <= orderRight[0]) {
                    res.push(orderLeft.shift())
                } else {
                    res.push(orderRight.shift())
                }
            }else if (orderRight.length) {
                res.push(orderRight.shift())
            }else{
                res.push(orderLeft.shift())
            }
        }
        return res
    }


}



