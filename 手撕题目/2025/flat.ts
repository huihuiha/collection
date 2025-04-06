function flat(arr: any[]) {
  const newArr: any[] = [];

  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      newArr.push(...flat(arr[i]));
    } else {
      newArr.push(arr[i]);
    }
  }

  return newArr;
}

const res = flat([1, 2, 3, [4, 5, 6, [7, 8, [9]]]]);
console.log(res);
