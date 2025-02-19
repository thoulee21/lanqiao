class XSet extends Set {
    /**
     * 与一个或多个集合的并集
     * @param sets 元素类型为 XSet 的数组
     * @returns {XSet} 返回并集集合，类型为 XSet
     */
    union(...sets) {
        return XSet.union(this, ...sets);
    }

    /**
     * 与一个或多个集合的交集
     * @param sets 元素类型为 XSet 的数组
     * @returns {XSet} 返回交集集合，类型为 XSet
     */
    intersection(...sets) {
        return XSet.intersection(this, ...sets);
    }

    /**
     * 与一个集合的差异
     * @param set 类型为 XSet 的集合
     * @returns {XSet} 返回差集集合，类型为 XSet
     */
    difference(set) {
        return XSet.difference(this, set);
    }

    /**
    * 返回两个集合的差集 a-b
    * @param a 类型为 XSet 的集合
    * @param b 类型为 XSet 的集合
    * @returns {XSet} 返回差集集合，类型为 XSet
    */
    static difference(a, b) {
        // TODO：待补充代码 目标 1
        const arrA = Array.from(a);
        const diff = arrA.filter((item) => !b.has(item));

        return new XSet(diff); // 修改此处为函数的正确返回值 
    }
    /**
     * 返回两个或多个集合的交集
     * @param a 类型为 XSet 的集合
     * @param bSets 元素类型为 XSet 的数组
     * @returns {XSet} 返回交集集合，类型为 XSet
     */
    static intersection(a, ...bSets) {
        // TODO：待补充代码 目标 2
        const arrA = Array.from(a);
        const inter = arrA.filter((item) => {
            for (let b of bSets) {
                if (!b.has(item)) {
                    return false;
                }
            }
            return true;
        });

        return new XSet(inter); // 修改此处为函数的正确返回值
    }

    /**
    * 返回两个或多个集合的并集
    * @param a 类型为 XSet 的集合
    * @param bSets 元素类型为 XSet 的数组
    * @returns {XSet} 返回并集集合，类型为 XSet
    */
    static union(a, ...bSets) {
        // TODO：待补充代码 目标 3

        return new XSet(); // 修改此处为函数的正确返回值 
    }

}


const a = new XSet([1, 2, 3]);
const b = new XSet([2, 3, 4]);
const c = new XSet([3, 4, 5]);

console.debug('目标 1');
console.log(a.difference(b)); // XSet { 1 }
console.log(b.difference(a)); // XSet { 4 }

console.debug('目标 2');
console.log(XSet.intersection(a, b)); // XSet { 2, 3 }
console.log(XSet.intersection(a, b, c)); // XSet { 3 }
