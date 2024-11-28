const fs = require('fs');
const path = require('path');

function generateStaticFilesMap(dir) {
    // TODO：待补充代码  
    let fileMap = {}

    const ls = (currentPath) => {
        const fileItems = fs.readdirSync(currentPath);

        fileItems.forEach((file) => {
            const itemPath = path.join(currentPath, file)
            const stat = fs.statSync(itemPath)

            if (stat.isDirectory()) {
                ls(itemPath);
            } else {
                const relPath = path.relative(dir, itemPath);
                fileMap[`/${relPath}`] = {
                    filePath: itemPath,
                    // contentType: getContentType(itemPath)
                }
            }
        })
    }

    ls(dir)
    console.debug(fileMap)
    return fileMap;
}

function getDirectoryInfo(dirPath) {
    const result = {};

    function readDir(currentPath) {
        const items = fs.readdirSync(currentPath);

        items.forEach(item => {
            const itemPath = path.join(currentPath, item);
            const stat = fs.statSync(itemPath);

            if (stat.isDirectory()) {
                readDir(itemPath);
            } else {
                const relativePath = path.relative(dirPath, itemPath);
                const urlPath = `/${relativePath.replace(/\\/g, '/')}`;
                result[urlPath] = {
                    relativePath: relativePath,
                    filePath: itemPath,
                    contentType: 'application/octet-stream'
                };
            }
        });
    }

    readDir(dirPath);
    return result;
}

const dirPath = __dirname; // 当前目录
// const directoryInfo = getDirectoryInfo(dirPath);
const directoryInfo = generateStaticFilesMap(dirPath);
console.log(directoryInfo);
