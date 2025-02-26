const fs = require("fs");
const path = require("path");

/**
 * 扫描指定目录，计算不同文件类型的占比
 * @param {string} directoryPath 目录路径
 * @param {Array} fileExtensionArr 需要考虑的文件后缀列表
 * @returns 包含每个单独元素的 filename、percentage 的数组列表
 */
function scanFiles(directoryPath, fileExtensionArr) {
    //TODO：待补充代码
    if (!fs.existsSync(directoryPath)) {
        return `目录路径 ${directoryPath} 不存在`;
    }
    if (!Array.isArray(fileExtensionArr)) {
        return "fileExtensionArr 必须是数组类型";
    }

    let res = fileExtensionArr.map((ext) => ({
        filename: ext,
        percentage: 0.0,
    }));
    res.push({
        filename: "other",
        percentage: 0.0,
    })

    const readDir = (path) => {
        const files = fs.readdirSync(path);

        files.forEach((item) => {
            const itemPath = path + "/" + item;
            if (fs.statSync(itemPath).isDirectory()) {
                readDir(itemPath);
            } else {
                const fileExt = item.split(".").pop();
                const fileSize = fs.statSync(itemPath).size;
                console.log(item, fileExt, fileSize);
                if (fileExtensionArr.includes(fileExt)) {
                    const index = fileExtensionArr.indexOf(fileExt);
                    res[index].percentage += fileSize;
                } else {
                    res[res.length - 1].percentage += fileSize;
                }
            }
        });
    };

    readDir(directoryPath);

    const totalSize = res.reduce((acc, item) => acc + item.percentage, 0);
    res = res.map((item) => ({
        filename: item.filename,
        percentage: ((item.percentage / totalSize) * 100).toFixed(2).toString(),
    }));

    return res;
}

// 单元测试代码
const directoryPath = "./knowledgePoints";
const fileExtensionArr = ["js", "css", "cpp", "java", "html"];
const res = scanFiles(directoryPath, fileExtensionArr);
console.log(res);
