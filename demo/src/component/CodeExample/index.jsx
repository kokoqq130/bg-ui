import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { parse } from 'react-docgen';
import { Card, Icon, Tooltip } from 'antd';
import CodeBlock from './CodeBlock';

export default class CodeExample extends Component {
    constructor() {
        super();
        this.state = {
            expand: false,
        };
    }

    handleExpand = () => {
        this.setState((preState) => {
            return { expand: !preState.expand };
        });
    };

    render() {
        const {
            children,
            code,
            component,
            exampleBlockStyle,
            layoutSideBySide,
        } = this.props;
        const { expand } = this.state;

        const styles = {
            root: {
                backgroundColor: '#fff',
                marginBottom: 32,
            },
            exampleBlock: {
                borderRadius: '0 0 2px 0',
                padding: '14px 24px 24px',
                margin: 0,
                width: layoutSideBySide ? '45%' : null,
                float: layoutSideBySide ? 'right' : null,
            },
        };
        const docs = component ? parse(code) : {};

        return (
            <Card
                title={this.props.title}
                extra={(
                    <Tooltip
                        title={expand ? '收起代码' : '展开代码'}
                    >
                        <span className="expand_button" onClick={this.handleExpand}>
                            <Icon type={expand ? 'menu-unfold' : 'menu-fold'} />
                        </span>
                    </Tooltip>
                )}
            >
                <CodeBlock
                    expand={expand}
                    description={this.props.description || docs.description}
                >
                    {code}
                </CodeBlock>
                <div style={Object.assign(styles.exampleBlock, exampleBlockStyle)}>
                    {children}
                </div>
            </Card>
        );
    }
}

CodeExample.propTypes = {
    /* eslint-disable */
    children: PropTypes.node,
    code: PropTypes.string,
    component: PropTypes.bool,
    description: PropTypes.string,
    exampleBlockStyle: PropTypes.object,
    layoutSideBySide: PropTypes.bool,
    title: PropTypes.string,
};

CodeExample.defaultProps = {
    component: true,
};
