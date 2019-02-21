const fs = require('fs');
const path = require('path');


function genIndex(src) {
    let text = '';
    fs.readdirSync(src).forEach((item) => {
        if (item === 'index.js') {
            return;
        }
        text = `${text}
export { default as ${item} } from './${item}';
`;
    });
    fs.unlinkSync(`${src}/index.js`);
    fs.writeFileSync(`${src}/index.js`, text);
}

genIndex(path.resolve(process.cwd(), 'component'));
