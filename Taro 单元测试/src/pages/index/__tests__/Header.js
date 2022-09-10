import {shallow} from 'enzyme';
import Header from '../components/Header/index';
import { Input } from '@tarojs/components';
import toJson from 'enzyme-to-json'
describe('Header 头部组件', () => {
  test('Header 样式发生变化的时候，做出提醒', () => {
    const wrapper = shallow(<Header />);
    expect(toJson(wrapper)).toMatchSnapshot()
  });

  test('input 框默认提示文案为 请输入todo事件', () => {
    const wrapper = shallow(<Header />);
    const input = wrapper.find('.input');
   expect(input.props().placeholder).toBe('请输入todo事件');
  });

  test('输入框输入内容时，inputValue 值发生改变', () => {
    const fn = jest.fn();
    const wrapper = shallow(<Header/>);
    const input = wrapper.find('.input');
    input.simulate('input', {
      detail: {
        value: 'GGG'
      }
    });
    const newInput = wrapper.find('.input');
    expect(newInput.props().value).toBe('GGG');
  });

  test('点击添加按钮，触发父组件传递过来的 handleAddItem 事件', () => {
    let count = 'TDD';
    const fn = jest.fn();
    const wrapper = shallow(<Header addItem={fn} />);
    const btn = wrapper.find('.btn');
    btn.simulate('click');
    expect(fn).toHaveBeenCalledTimes(1);
  });

  test('点击添加按钮，清空输入框的文案', () => {
    let count = 'TDD';
    const fn = jest.fn();
    const wrapper = shallow(<Header inputValue={count} handleInputChange={fn} addItem={fn} />);
    const btn = wrapper.find('.btn');
    btn.simulate('click');
    const input = wrapper.find('.input');
    // console.log(toJson(input))
    expect(input.props().value).toBe('');
  });
})
