


function format(num) {
    var reg = /\d{1,3}(?=(\d{3})+$)/g;
    return (num + '').replace(reg, '$&,');
}

function format(num) {
    let str = String(num)
    let res = ''
    for (let i = str.length - 1, j = 1; i >= 0; i--, j++) {
        if (j % 3 === 0 && i !== 0) {
            res += str[i] + ','
            continue
        }
        res += str[i]
    }
    return res.split('').reverse().join('')
}


function format(num) {
    var str = num + '';
    // ["8", "7", "6", "5", "4", "3", "2", "1"]
    return str.split("").reverse().reduce((prev, next, index) => {
        return ((index % 3) ? next : (next + ',')) + prev;
    })
}



console.log(format(123456789));