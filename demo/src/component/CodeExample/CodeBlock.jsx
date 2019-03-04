import React from 'react';
import PropTypes from 'prop-types';
import MarkdownElement from '../MarkdownElement';

const styles = {
    root: {
        background: '#f8f8f8',
        borderTop: 'solid 1px #e0e0e0',
    },
    markdown: {
        overflow: 'auto',
        maxHeight: 1400,
        transition: `max-height 800ms 0ms ease-in-out`,
        marginTop: 0,
        marginBottom: 0,
    },
    markdownRetracted: {
        maxHeight: 0,
    },
    description: {
        background: '#ffffff',
        overflow: 'auto',
        padding: '10px 20px 0',
        marginTop: 0,
        marginBottom: 0,
    },
    codeBlockTitle: {
        cursor: 'pointer',
    },
};

export default function CodeBlock(props) {
    const text = `\`\`\`js
${props.children}
    \`\`\``;

    const descriptionStyle = styles.description;
    let codeStyle = Object.assign({}, styles.markdown, styles.markdownRetracted);

    if (props.expand) {
        codeStyle = styles.markdown;
    }

    return (
        <div>
            <MarkdownElement style={codeStyle} text={text} />
            <MarkdownElement style={descriptionStyle} text={props.description} />
        </div>
    );
}

CodeBlock.propTypes = {
    children: PropTypes.string,
    description: PropTypes.string,
    expand: PropTypes.bool,
};

CodeBlock.defaultProps = {
    children: PropTypes.string,
    description: '',
    expand: false,
};
