import {shallow,mount} from 'enzyme';
import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Common1 from '../src/component/common1/index'
import Common2 from '../src/component/common2/index'
Enzyme.configure({ adapter: new Adapter() });
import renderer from 'react-test-renderer';

test('test common1', () => {
    const props = {
        // Jest 提供的mock 函数
        text:'test--'
    }

    const component = renderer.create(
        <Common1 {...props}>Facebook</Common1>,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    const filterWrapperTest = mount(<Common1 {...props} />);
    console.log(filterWrapperTest.find('.test').at(0).props(),'=====')
    expect(filterWrapperTest.find('.test').length).toBe(1);
    expect(filterWrapperTest.find('.test').at(0).props().children).toBe('test--');
});

test('test common2', () => {
    const props = {

    }

    const component = renderer.create(
        <Common2 {...props}>Facebook</Common2>,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    const filterWrapperTest = mount(<Common2 {...props} />);
    console.log(filterWrapperTest.find('div').at(0).props(),'=====')
    expect(filterWrapperTest.find('div').length).toBe(1);
    expect(filterWrapperTest.find('div').at(0).props().children).toBe('common2---');
});
