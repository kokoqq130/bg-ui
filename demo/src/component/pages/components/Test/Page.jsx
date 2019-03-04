import React from 'react';
import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import ReadMeDescription from '../../../ReadMeDescription';
import MarkdownElement from '../../../MarkdownElement';
import Common2ReadmeText from '!raw-loader!./README.md';
import Common2ExampleCode from '!raw-loader!./ExampleIcon';
import common2Code from '!raw-loader!@bk/component-ui/Common2';
import Common2ExampleIcon from './ExampleIcon';

const Test = () => {
    return (
        <div>
            <div>
                <ReadMeDescription code={common2Code} />
                <CodeExample
                    code={Common2ExampleCode}
                    title="测试基本"
                >
                    <Common2ExampleIcon />
                </CodeExample>
                <PropTypeDescription code={common2Code} />
                <MarkdownElement text={Common2ReadmeText} />
            </div>
        </div>
    );
};

export default Test;
