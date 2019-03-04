import React, { Component } from 'react';
import { Form } from 'antd';
import New from '@bnq/component-ui/New';

const WrappedAdvancedNew = Form.create()(New);
export default class Example extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    _addNew=(params) => {
        console.log(params);
    }

    render() {
        const newData = [
            {
                id: 'input',
                name: 'input',
                isRequired: 'true',
                isBlock: true,
            },
            {
                id: 'datepicker',
                name: 'datepicker',
                type: 'datepicker',
                isRequired: 'true',
                isBlock: true,
            },
            {
                id: 'textarea',
                name: 'textarea',
                type: 'textarea',
                isRequired: 'true',
                isBlock: true,
            },
            {
                id: 'radio',
                name: 'radio',
                type: 'radio',
                isRequired: 'true',
                isBlock: true,
                data: [
                    {
                        id: 1,
                        name: '正常',
                    },
                    {
                        id: 2,
                        name: '禁止',
                    },
                ],
            },
            {
                id: 'checkbox',
                name: 'checkbox',
                type: 'checkbox',
                isRequired: 'true',
                isBlock: true,
                data: [
                    {
                        id: 1,
                        name: 'react',
                    },
                    {
                        id: 2,
                        name: 'vue',
                    },
                ],
            },
        ];
        return (
            <WrappedAdvancedNew
                newData={newData}
                addNew={this._addNew}
                isHideSubmit={false}
                isHideBack={false}
            />
        );
    }
}
