import React from 'react';
import MarkdownElement from '../../../MarkdownElement';
import HomeReadmeText from '!raw-loader!./README.md';

const HomePage = () => {
    return (
        <div>
            <div>
                <MarkdownElement text={HomeReadmeText} />
            </div>
        </div>
    );
};

export default HomePage;
