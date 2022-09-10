// import { render, screen, fireEvent } from '@testing-library/react'
import {shallow} from 'enzyme';
import TodoList from '../components/TodoList/index';
import { Input } from '@tarojs/components';
import toJson from 'enzyme-to-json'
describe('TodoList 列表组件', () => {
  test('TodoList 列表组件样式发生变化的时候，做出提示', () => {
    const wrapper = shallow(<TodoList list={[]} />);
    expect(toJson(wrapper)).toMatchSnapshot()
  });

  test('当 list 属性元素多少项的时候，根据子元素 show属性判断展示多少项', () => {
    const list = [
        {show: true, value: 1},
        {show: false, value: 2},
        {show: true, value: 3},
        {show: true, value: 4}
    ]
    const wrapper = shallow(<TodoList list={list} />);
    const items = wrapper.find('.item');
    expect(items.length).toBe(3)
  });

  test('当有list列表有可以展示的元素 > 0，则下方列表展显示的数量', () => {
    let list = [
        {show: true, value: 1},
        {show: false, value: 2},
        {show: true, value: 3},
        {show: true, value: 4}
    ]
    const wrapper = shallow(<TodoList list={list}/>);
    const countWrapper = wrapper.find('.count');
    expect(countWrapper.props().children).toBe(3);
  });

  test('当list列表没有可展示的元素的时候，下方展示数量为0，且列表没有元素', () => {
    const wrapper = shallow(<TodoList list={[]}/>);
    expect(+wrapper.find('.count').text()).toBe(0);
    expect(wrapper.find('.item').length).toBe(0);
  });

  test('接收父组件传递过来的删除事件 handleDeleteItem，点击元素后面的删除按钮，则执行', () => {
    let list = [
        {show: true, value: 1},
        {show: true, value: 2},
        {show: true, value: 3},
        {show: true, value: 4}
    ]
    const fn = jest.fn()
    const wrapper = shallow(<TodoList list={list} handleDeleteItem={fn} />);
    const btns = wrapper.find('.btn');
    btns.at(1).simulate('click');
    expect(fn).toBeCalledTimes(1)
  });
})