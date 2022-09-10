// import { render, screen, fireEvent } from '@testing-library/react'
import {shallow, mount, render} from 'enzyme';
import Index from '../index';
import { Input } from '@tarojs/components';
import toJson, { mountToJson } from 'enzyme-to-json'

import renderer from 'react-test-renderer';

import Nerv, { findDOMNode } from 'nervjs'
import { renderToString } from 'nerv-server'
import { Simulate, renderIntoDocument } from 'nerv-test-utils'

describe('Index 首页', () => {
  test('Index 首页样式发生变化的时候，做出提示', () => {
    const wrapper = shallow(<Index />);
    expect(toJson(wrapper)).toMatchSnapshot()
  });

  test('调用Index页面的addItem方法，传入给toDoList元素数量加1', () => {
    const wrapper = shallow(<Index />);
    const header = wrapper.find('Header');
    const addFn = header.props().addItem;
    addFn({show: true, value: 'TEST测试'});
    const todoList = wrapper.find('TodoList');
    expect(todoList.props().list[0]).toEqual({show: true, value: 'TEST测试'});
  })
})