import React from 'react';
import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import ReadMeDescription from '../../../ReadMeDescription';
import MarkdownElement from '../../../MarkdownElement';
import NewReadmeText from '!raw-loader!./README.md';
import NewExampleCode from '!raw-loader!./ExampleIcon';
import newCode from '!raw-loader!@bnq/component-ui/New';
import NewExampleIcon from './ExampleIcon';

const TestPage = () => {
    return (
        <div>
            <div>
                <ReadMeDescription code={newCode} />
                <CodeExample
                    code={NewExampleCode}
                    title="新建表单组件"
                >
                    <NewExampleIcon />
                </CodeExample>
                <PropTypeDescription code={newCode} />
                <MarkdownElement text={NewReadmeText} />
            </div>
        </div>
    );
};

export default TestPage;
