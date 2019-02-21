const { parse } = require('react-docgen');
const parseDoctrine = require('doctrine').parse;
const recast = require('recast').parse;
const fs = require('fs');
const path = require('path');

function getDeprecatedInfo(type) {
    const deprecatedPropType = 'deprecated(PropTypes.';

    const indexStart = type.raw.indexOf(deprecatedPropType);

    if (indexStart !== -1) {
        return {
            propTypes: type.raw.substring(indexStart + deprecatedPropType.length, type.raw.indexOf(',')),
            explanation: recast.parse(type.raw).program.body[0].expression.arguments[1].value,
        };
    }

    return false;
}

function generatePropType(type) {
    switch (type.name) {
        case 'func':
            return 'function';

        case 'custom':
            // eslint-disable-next-line
            const deprecatedInfo = getDeprecatedInfo(type);

            if (deprecatedInfo !== false) {
                return generatePropType({
                    // eslint-disable-next-line
                    name: deprecatedInfo.propTypes,
                });
            }

            return type.raw;

        case 'enum':
        case 'union':
            // eslint-disable-next-line
            const values = type.value.map((v) => { return v.value || v.name; }).join('<br>&nbsp;');
            return `${type.name}:<br>&nbsp;${values}<br>`;

        default:
            return type.name;
    }
}

function generateDescription(required, description, type) {
    let deprecated = '';

    if (type.name === 'custom') {
        const deprecatedInfo = getDeprecatedInfo(type);

        if (deprecatedInfo) {
            deprecated = `*Deprecated*. ${deprecatedInfo.explanation}<br><br>`;
        }
    }

    const parsed = parseDoctrine(description);

    // two new lines result in a newline in the table. all other new lines
    // must be eliminated to prevent markdown mayhem.
    const jsDocText = parsed.description.replace(/\n\n/g, '<br>').replace(/\n/g, ' ');

    if (parsed.tags.some((tag) => { return tag.title === 'ignore'; })) return null;
    let signature = '';

    if (type.name === 'func' && parsed.tags.length > 0) {
    // Remove new lines from tag descriptions to avoid markdown errors.
        parsed.tags.forEach((tag) => {
            if (tag.description) {
                tag.description = tag.description.replace(/\n/g, ' ');
            }
        });

        // Split up the parsed tags into 'arguments' and 'returns' parsed objects. If there's no
        // 'returns' parsed object (i.e., one with title being 'returns'), make one of type 'void'.
        const parsedLength = parsed.tags.length;
        let parsedArgs = [];
        let parsedReturns;

        if (parsed.tags[parsedLength - 1].title === 'returns') {
            parsedArgs = parsed.tags.slice(0, parsedLength - 1);
            parsedReturns = parsed.tags[parsedLength - 1];
        } else {
            parsedArgs = parsed.tags;
            parsedReturns = { type: { name: 'void' } };
        }

        signature += '<br><br>**Signature:**<br>`function(';
        signature += parsedArgs.map((tag) => { return `${tag.name}: ${tag.type.name}`; }).join(', ');
        signature += `) => ${parsedReturns.type.name}<br>`;
        signature += parsedArgs.map((tag) => { return `*${tag.name}:* ${tag.description}`; }).join('<br>');
        if (parsedReturns.description) {
            signature += `<br> *returns* (${parsedReturns.type.name}): ${parsedReturns.description}`;
        }
    }

    return `${deprecated} ${jsDocText}${signature}`;
}

function translateMd(code) {
    // let requiredProps = 0;

    const componentInfo = parse(code);
    let text = `## ${componentInfo.displayName || '无组件名注释'}
${componentInfo.description || '无组件说明注释'}
### 属性
| 参数 | 类型 | 默认值 | 说明 |
|:-----|:-----|:-----|:-----|\n`;

    for (let key in componentInfo.props) {
        if (componentInfo.props[key]) {
            const prop = componentInfo.props[key];
            const description = generateDescription(prop.required, prop.description, prop.type);
            if (description === null) continue;
            let defaultValue = '';
            if (prop.defaultValue) {
                defaultValue = prop.defaultValue.value.replace(/\n/g, '');
            }
            if (prop.required) {
                key = `<span style="color: #31a148">${key}*</span>`;
                // requiredProps += 1;
            }
            if (prop.type.name === 'custom') {
                if (getDeprecatedInfo(prop.type)) {
                    key = `~~${key}~~`;
                }
            }
            text += `| ${key} | ${generatePropType(prop.type)} | ${defaultValue} | ${description} |\n`;
        }
    }
    // eslint-disable-next-line
    // const requiredPropFootnote = (requiredProps === 1) ? '* required property'
    //     : (requiredProps > 1) ? '* required properties'
    //         : '';
    return text;
}

function genMd(src, outdir) {
    fs.readdirSync(src).forEach((item) => {
        const code = fs.readFileSync(`${src}/${item}/index.jsx`, 'utf-8');
        const text = translateMd(code);
        if (!fs.existsSync(outdir)) {
            fs.mkdirSync(outdir);
        }
        fs.writeFileSync(`${outdir}/${item}.md`, text);
    });
}

genMd(path.resolve(process.cwd(), 'component'), path.resolve(process.cwd(), 'md'));
