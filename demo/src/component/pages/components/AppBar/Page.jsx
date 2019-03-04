import React from 'react';
import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import ReadMeDescription from '../../../ReadMeDescription';
import MarkdownElement from '../../../MarkdownElement';
import Common1ReadmeText from '!raw-loader!./README.md';
import Common1ExampleCode from '!raw-loader!./ExampleIcon';
import common1Code from '!raw-loader!@bk/component-ui/Common1';
import Common1ExampleIcon from './ExampleIcon';

const TestPage = () => {
    console.info(common1Code);
    return (
        <div>
            <div>
                <ReadMeDescription code={common1Code} />
                <CodeExample
                    code={Common1ExampleCode}
                    title="基本示例"
                >
                    <Common1ExampleIcon />
                </CodeExample>
                <PropTypeDescription code={common1Code} />
                <MarkdownElement text={Common1ReadmeText} />
            </div>
        </div>
    );
};

export default TestPage;
