import React, { Component } from 'react';
import { string } from 'prop-types';


import './index.less';

class Common1 extends Component {
    static propTypes = {
        /**
         * 测试string
         */
        text: string,

    };

    static defaultProps = {
        text: '测试1测1试',
    };

    render() {
        const {
            text,
        } = this.props;
        return (
            <div className="test">{text || 'test'}</div>
        );
    }
}

export default Common1;
