const length = 3;
let randomStr = '';

for (let i = 0; i < length; i++) {
    // 97 -> 'a' 122 -> 'z'
    // 65 -> 'A' 90 -> 'Z'
    const randomCharCode = Math.floor(Math.random() * 26) + 97;
    randomStr += String.fromCharCode(randomCharCode);
}
// randomStr = randomStr.toLowerCase();
console.log(randomStr);