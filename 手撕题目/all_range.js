let arr = [1, 2, 3]

// 无重复
function all_range(arr) {
    const res = []
    const dict = {}
    function process(path) {
        if (path.length === arr.length) {
            res.push(path.slice())
            return
        }
        for (let num of arr) {
            if (dict[num]) { continue }
            path.push(num)
            dict[num] = true
            process(path)
            path.pop()
            dict[num] = false
        }
    }
    process([])

    return res
}


// 有重复
const permuteUnique = (nums) => {
    const res = [];
    const len = nums.length;
    const used = new Array(len);
    nums.sort((a, b) => a - b); // 升序排序

    const helper = (path) => {
        if (path.length == len) { // 个数选够了
            res.push(path.slice()); // path的拷贝 加入解集
            return;                 // 结束当前递归 结束当前分支
        }

        for (let i = 0; i < len; i++) { // 枚举出所有的选择
            if (nums[i - 1] == nums[i] && i - 1 >= 0 && !used[i - 1]) { // 避免产生重复的排列
                continue;
            }
            if (used[i]) {      // 这个数使用过了，跳过。
                continue;
            }
            path.push(nums[i]); // make a choice
            used[i] = true;     // 记录路径上做过的选择
            helper(path);       // explore，基于它继续选，递归
            path.pop();         // undo the choice
            used[i] = false;    // 也要撤销一下对它的记录
        }
    };

    helper([]);
    return res;
};

console.log(all_range(arr))