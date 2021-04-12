function quick(arr) {
    if (arr.length <= 1) { return arr }
    const len = arr.length
    let target = arr[0]
    const rightArr = []
    const leftArr = []
    for (let i = 1; i < len; i++) {
        if (arr[i] > target) {
            rightArr.push(arr[i])
        } else {
            leftArr.push(arr[i])
        }
    }
    let sort = quick(leftArr)
    sort.push(target)
    sort = sort.concat(quick(rightArr))
    return sort
}

let a = quick([1, 4, 62, 4, 6, 2, 4, 7])
console.log(a);