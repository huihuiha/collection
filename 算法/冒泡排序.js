



Array.prototype.buddleSort = function () {
    for (let j = 0; j < this.length - 1; j++) {
        for (let i = 0; i < this.length - 1 - j; i++) {
            if (this[i] > this[i + 1]) {
                let temp = this[i]
                this[i] = this[i + 1]
                this[i +1] = temp
            }
        }
    }
    return this
}


let arr = [6, 3, 2, 1, 3, 44]

console.log(arr.buddleSort())