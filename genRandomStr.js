const length = 3;
let randomStr = '';

for (let i = 0; i < length; i++) {
    const randomCharCode = Math.floor(Math.random() * 26) + 65;
    randomStr += String.fromCharCode(randomCharCode);
}
randomStr = randomStr.toLowerCase();
console.log(randomStr);