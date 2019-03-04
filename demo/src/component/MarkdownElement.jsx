import React, { Component } from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';
import Highlight from 'highlight.js';

require('./mui-github-markdown.css');

const styles = {
    root: {
        marginTop: 20,
        marginBottom: 20,
        padding: '0 10px',
    },
};

/* eslint-disable */
class MarkdownElement extends Component {
    static propTypes = {
        style: PropTypes.object,
        text: PropTypes.string.isRequired,
    };
    static defaultProps = {
        text: '',
    };

    componentWillMount() {
        marked.setOptions({
            gfm: true,
            tables: true,
            breaks: false,
            pedantic: false,
            sanitize: false,
            smartLists: true,
            smartypants: false,
            highlight(code, lang) {
                return Highlight.highlight(lang || 'javascript', code).value;
            },
        });
    }

    render() {
        const {
            style,
            text,
        } = this.props;

        return (
            <div
                style={Object.assign({}, styles.root, style)}
                className="markdown-body"
                dangerouslySetInnerHTML={{__html: marked(text)}}
            />
        );
    }
}
/* eslint-enable */
export default MarkdownElement;
