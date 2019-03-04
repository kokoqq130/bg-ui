import React, { Component } from 'react';
import {
    func, array, bool,
} from 'prop-types';
import {
    Form, Input, Button, Select, DatePicker, InputNumber, Checkbox, Switch, Radio,
} from 'antd';
import './index.less';

const FormItem = Form.Item;
const { Option } = Select;
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;
const { TextArea } = Input;
export default class New extends Component {
    static propTypes = {
        /**
          *id:必填，表单控件唯一标志(getFieldDecorator的第一个参数id)
          *name:搜索参数的解释(表单的左边label)
          *type:表单类型，默认为text
          *data: 当表单为select,checkbox,radio时,data为表单的数据
          *placeholder: 同antd中的placeholder
          *isRequired:true|false是否必填
          *isHidePleaseSelect: true|false
         */
        newData: array,
        /**
         * 表单提交事件
         */
        addNew: func,
        /**
         * 是否显示提交按钮
         */
        isHideSubmit: bool,
        /**
         * 是否显示返回按钮
         */
        isHideBack: bool,

    }

    static defaultProps = {
        newData: [{
            id: '', name: '', type: '', isHidePleaseSelect: false, isRequired: true, data: [{ value: '', text: '' }],
        }],
        addNew: (params) => {
            console.log(params);
        },
        isHideSubmit: false,
        isHideBack: false,
    }

    constructor(props) {
        super(props);
        this.state = {
            checkBoxValues: [],
        };
    }

    _getFields=() => {
        const { getFieldDecorator } = this.props.form;
        const that = this;
        return that.props.newData.map((option, i) => {
            if (option.isHide === 'true') { // 隐藏的条目
                return (
                    <div key={i.toString()} style={{ display: 'none' }} />
                );
            }
            const decoratorRules = option.type === 'switch' ? {
                valuePropName: 'checked',
                initialValue: option.initialValue,
            } : {
                rules: [{
                    required: option.isRequired, message: '不能为空！',
                }],
                initialValue: option.initialValue,
            };
            return (
                <FormItem
                    label={option.name}
                    key={i.toString()}
                    style={{ display: option.isBlock ? 'block' : 'inline-block' }}
                >
                    {getFieldDecorator(`${option.id}`, decoratorRules)(
                        that._getFormItem(option),
                    )}
                </FormItem>
            );
        });
    }

    _getFormItem=(option) => {
        switch (option.type) {
            case 'select':
                return (
                    <Select disabled={option.disabled} className="select">
                        {option.isHidePleaseSelect ? null : <Option key="undefined" value="undefined">请选择</Option>}
                        {option.data && option.data.map((item, key) => {
                            return <Option key={key.toString()} value={item.id}>{item.name}</Option>;
                        })}
                    </Select>
                );
            case 'datepicker':
                return <DatePicker disabled={option.disabled} format="YYYY-MM-DD" />;
            case 'switch':
                return <Switch disabled={option.disabled} checkedChildren="是" unCheckedChildren="否" />;
            case 'checkbox':
                return (
                    <CheckboxGroup
                        disabled={option.disabled}
                        name={option.id}
                        onChange={(checkedValues) => { return this.setState({ checkBoxValues: checkedValues }); }}
                    >
                        {option.data && option.data.map((item, key) => {
                            return <Checkbox key={key.toString()} value={item.id}>{item.name}</Checkbox>;
                        })}
                    </CheckboxGroup>);
            case 'radio':
                return (
                    <RadioGroup disabled={option.disabled} name={option.id}>
                        {option.data && option.data.map((item, key) => {
                            return <Radio
                                key={key.toString()}
                                value={item.id}
                                disabled={option.isDisabled}
                            >
                                {item.name}
                            </Radio>;
                        })}
                    </RadioGroup>
                );
            case 'textarea':
                return <TextArea disabled={option.disabled} cols={30} rows={4} />;
            case 'number':
                return <InputNumber disabled={option.disabled} min={option.min} max={option.max} />;
            case 'hidden':
                return <Input type="hidden" />;
            default:
                return <Input
                    disabled={option.disabled}
                    placeholder={option.placeholder}
                    type={option.type === 'password' ? 'password' : ''}
                />;
        }
    }

    _handelRegister=(e) => {
        e.preventDefault();// 阻止默认事件
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // 如果有CheckBox类型的，将true改成1，undefined改为0
                const datas = this.props.newData;
                if (datas) {
                    datas.forEach((data) => {
                        if (data.type === 'checkbox') {
                            const value = values[data.id];
                            values[data.id] = value ? 1 : 0;
                        }
                        if (data.type === 'switch') {
                            const value = values[data.id];
                            values[data.id] = value ? 1 : 0;
                        }
                        if (data.type === 'select') {
                            const value = values[data.id];
                            values[data.id] = value === 'undefined' ? undefined : value;
                        }
                        if (data.type === 'radio') {
                            // let value = values[data.id];
                            values[data.id] = this.state.checkBoxValues;
                        }
                        if (data.type === 'datepicker') {
                            const value = values[data.id];
                            values[data.id] = value.format('YYYY-MM-DD HH:mm:ss');
                        }
                    });
                }
                // console.log('newForm接口处理后参数:', values);
                this.props.addNew(values);
            }
        });
    }

    _handleBack=() => {
        // this.props.history.goBack();
        window.history.go(-1);
    }

    render() {
        return (
            <Form
                layout="inline"
                className="new-form"
                onSubmit={this._handelRegister}
            >
                {/* 此处动态生成表单域 */}
                {this._getFields()}
                <div className="btnItem">
                    {this.props.isHideSubmit ? '' : <Button type="primary" htmlType="submit">提交</Button>}
                    {this.props.isHideBack ? '' : <Button className="reset" onClick={this._handleBack}>返回</Button>}
                </div>
            </Form>
        );
    }
}
// New.propTypes = {
//     /**
//    * 测试object
//    */
//     object,
//     /**
//    * 测试func
//    *  @param {object} event TouchTap event targeting the left `IconButton`.
//    *  @param {object} event TouchTap event targeting the left `IconButton`.
//    */
//     func,
//     /**
//    * 测试array
//    */
//     array,
//     /**
//    * 测试string
//    */
//     string,

// };

// New.defaultProps = {
//     object: { test: '测试1' },
//     func: (obj1, obj2) => {
//         return `${obj1} ${obj2}`;
//     },
//     array: ['test1', 'test2'],
//     string: '测试1测1试',
// };
