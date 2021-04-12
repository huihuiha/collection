
function insertSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        const temp = arr[i]
        let j = i
        while (j > 0) {
            if (arr[j - 1] < temp) {
                this[j] = this[j - 1]
            } else {
                break
            }
            j--
        }
        arr[j] = temp
    }

}