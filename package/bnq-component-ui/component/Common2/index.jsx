import React, { Component } from 'react';
import { array } from 'prop-types';
import { Button } from 'antd';
import { Remote } from '../../../../demo/src/util';


import './index.less';

class Common2 extends Component {
    static propTypes = {
        /**
         * 测试object
         */
        _array: array,

    };

    static defaultProps = {
        _array: ['test1', '测试1'],
    };

    handleClick = () => {
        Remote.get('delivery/order/queryOrderList').then((res) => {
            console.info(res);
        });
    };

    render() {
        return (
            <div>
                我是一个测试组件2
                {
                    this.props._array.map((item) => {
                        return <div key={item}>{item}</div>;
                    })
                }
                <Button
                    onClick={this.handleClick}
                >测试2按钮</Button>
            </div>
        );
    }
}

export default Common2;
