import React, { Component } from 'react';
import {
    object, func, array, string,
} from 'prop-types';
import { Button } from 'antd';


import './index.less';

class Common2 extends Component {
    static propTypes = {
        /**
         * 测试object
         */
        object,
        /**
         * 测试func
         *  @param {object} event TouchTap event targeting the left `IconButton`.
         *  @param {object} event TouchTap event targeting the left `IconButton`.
         */
        func,
        /**
         * 测试array
         */
        array,
        /**
         * 测试string
         */
        string,

    };

    static defaultProps = {
        object: { test: '测试哦' },
        func: (obj1, obj2) => {
            return `${obj1} ${obj2}`;
        },
        array: ['test1', 'test2'],
        string: '测试测试',
    };

    render() {
        return (
            <div>
                我是一个测试组件2
                <Button>测试2按钮</Button>
            </div>
        );
    }
}

export default Common2;
