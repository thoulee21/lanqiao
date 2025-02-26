// 完善 getPossiblePasswords 函数，该函数接受两个参数：
// max：密码数组中的最大数字
// count：密码数组的长度
// 该方法返回值为一个二维数组，里面包含所有的可能解密的数组。
// 解密的数组从1开始，无需考虑二维数组中包含的数组顺序以及密码数组中数字的顺序。
// 即[[2,4],[3,4]]跟[[4,3],[4,2]] 是一样的
function getPossiblePasswords(max, count) {
    // 存储最终结果的数组
    const result = [];

    // 递归函数来生成组合
    function generateCombinations(current, start) {
        // 当current数组长度等于count时，找到一个有效组合
        if (current.length === count) {
            result.push([...current]);
            return;
        }

        // 从start开始遍历，避免重复组合
        for (let i = start; i <= max; i++) {
            current.push(i);
            generateCombinations(current, i + 1);
            current.pop();
        }
    }

    // 从空数组开始生成组合，起始数字为1
    generateCombinations([], 1);
    return result;
}

// 测试
console.log(getPossiblePasswords(4, 2))
