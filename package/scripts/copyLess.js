const fs = require('fs');
const path = require('path');


const conponentsPath = path.resolve(process.cwd(), './component');
const outPath = path.resolve(process.cwd(), './lib');
const copyFile = ['.less', '.png', '.gif', '.svg'];

function copy(src, outdir) {
    fs.readdirSync(src).forEach((item) => {
        const curPath = `${src}/${item}`;
        if (fs.statSync(curPath).isDirectory()) {
            copy(curPath, outdir);
        } else {
            const extname = path.extname(curPath);
            if (copyFile.includes(extname)) {
                const targetPath = curPath.replace(conponentsPath, outdir);
                if (!fs.existsSync(path.dirname(targetPath))) {
                    fs.mkdirSync(path.dirname(targetPath));
                }

                fs.copyFileSync(curPath, targetPath);
            }
        }
    });
}

copy(conponentsPath, outPath);
