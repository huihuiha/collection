import { View } from '@tarojs/components'
import './index.scss'

// components
import Header from './components/Header';
import TodoList from './components/TodoList';
import { useState } from 'react';

const Index = () => {
  const [list, setList] = useState([]);

  const handleAddItem = (item) => {
    const newList = [...list, item]
    setList(newList);
  }

  const handleDeleteItem = (index) => {
    const newList = [...list];
    newList.splice(index, 1);
    setList(newList);
  }

  return (
    <View className='index'>
      <Header addItem={handleAddItem}></Header>
      <TodoList list={list} handleDeleteItem={handleDeleteItem}></TodoList>
    </View>
  )

}
export default Index;

