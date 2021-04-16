


function chooseSort(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        let minIndex = 0
        for (let j = i; j < arr.length; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j
            }
        }
        const temp = this[i]
        this[i] = this[minIndex]
        this[minIndex] = temp
    }
}
