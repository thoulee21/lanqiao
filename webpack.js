const regsrc = /(src=")(.*)(")/g
const reghtml = /(href=")(.*)(")/g
let html = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
html = html.replace(regsrc, `$1${webpack.output.publicPath}$2$3`);
html = html.replace(reghtml, `$1${webpack.output.publicPath}$2$3`);
fs.writeFileSync(path.resolve(webpack.output.path + '/' + 'index.html'), html)