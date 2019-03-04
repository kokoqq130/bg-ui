import React from 'react';
import { mount } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Common1 from './index';
import renderer from 'react-test-renderer';

Enzyme.configure({ adapter: new Adapter() });

test('test common1', () => {
    const props = {
        // Jest 提供的mock 函数
        text: 'test--'
    }

    const component = renderer.create(
        <Common1 {...props}>Facebook</Common1>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    const filterWrapperTest = mount(<Common1 {...props} />);
    console.log(filterWrapperTest.find('.test').at(0).props(), '=====')
    expect(filterWrapperTest.find('.test').length).toBe(1);
    expect(filterWrapperTest.find('.test').at(0).props().children).toBe('test--');
});
