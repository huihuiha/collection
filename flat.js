

let arr = [1, 3, 4, [3, 4, 6, [7999, [99]]]]
// 方式一
// function flat(arr) {
//     let res = []
//     for (let i = 0; i < arr.length; i++) {
//         if (Array.isArray(arr[i])) {
//             res = res.concat(flat(arr[i]))
//         } else {
//             res.push(arr[i])
//         }
//     }
//     return res
// }


// 方式二
// function flat(arr) {
//     return arr.reduce((pre, cur, arr) => {
//         if (Array.isArray(cur)) {
//             return pre.concat(flat(cur))
//         } else {
//             pre.push(cur)
//             return pre
//         }
//     }, [])
// }

let res = flat(arr)
console.log(res)