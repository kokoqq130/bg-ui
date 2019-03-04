import React, { Component } from 'react';
import { Select, Form } from 'antd';
// import PropTypes from 'prop-types';

const { Option } = Select;
const FormItem = Form.Item;
export default class Cascader extends Component {
    constructor(props) {
        super(props);
        this._handleChange = this._handleChange.bind(this);
    }

    _handleChange = (option, value) => {
        if (option.url && option.relativeFeilds && option.fetchFeilds) {
            // 重置联动中影响到的文本域，通过relativeFeilds来获取影响到的fileds
            option.relativeFeilds.map((i) => {
                const obj = {};
                obj[i] = '';
                this.props.form.setFieldsValue(obj);
                // 重置realtiveFeilds中对应的data(下拉表值);
                this.props.data.map((item) => {
                    if (item.id === i) {
                        item.data = [];
                    }
                    return this.props.data;
                });
                return option.relativeFeilds;
            });
            // 通过fetchFeilds获取Fetch参数，在onSelect事件中，this.props.form获取到的当前事件值不是最新的值，因此需要通过value获取
            const fieldsValue = this.props.form.getFieldsValue(option.fetchFeilds);
            option.fetchFeilds.map((i) => {
                if (i === option.id) {
                    fieldsValue[i] = value;
                }
                return fieldsValue;
            });
            this.props.handleChange(fieldsValue, option);
        }
    }

    render() {
        // 由于在父组件components/new中传入了form,实现父子公用一个form
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                {
                    this.props.data && this.props.data.map((option, i) => {
                        const decorator = {
                            rules: [
                                {
                                    required: option.isRequired,
                                    message: '不能为空',
                                },
                            ],
                            initialValue: option.initialValue,
                        };
                        return (
                            <FormItem label={option.name} key={i.toString()}>
                                {getFieldDecorator(`${option.id}`, decorator)(
                                    <Select onSelect={(value) => { return this._handleChange(option, value); }}>
                                        {option.data && option.data.map((item, key) => {
                                            return (
                                                <Option key={key.toString()} value={item.id || item.code}>
                                                    {item.name}
                                                </Option>
                                            );
                                        })}
                                    </Select>,
                                )}
                            </FormItem>
                        );
                    })
                }
            </div>
        );
    }
}
