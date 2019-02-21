import React from 'react';
import PropTypes from 'prop-types';
import { parse } from 'react-docgen';
import MarkdownElement from './MarkdownElement';


function ReadMeDescription(props) {
    const {
        code,
    } = props;

    let text = '';
    const componentInfo = parse(code) || {};
    text = `## ${componentInfo.displayName || '无组件名注释'}
${componentInfo.description || '无组件说明注释'}`;

    return (
        <div>
            <MarkdownElement text={text} />
        </div>
    );
}

ReadMeDescription.propTypes = {
    code: PropTypes.string,
};
ReadMeDescription.defaultProps = {
    code: '',
};

export default ReadMeDescription;
