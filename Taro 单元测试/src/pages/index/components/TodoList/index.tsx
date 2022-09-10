import { View, Button } from '@tarojs/components';
import { useMemo } from 'react';
import './index.scss';

const TodoList = ({
    list,
    handleDeleteItem
}) => {
    // 数量展示
    const count = useMemo(() => {
        let count = 0;
        list.forEach(item => {
            if (item.show) {
                count++
            }
        })
        return count;
    }, [list])


    return (
        <View className='todo-list-wrap'>
            {
                list.map((item, index) => (
                    item.show ? (
                        <View key={item} className='item-wrap'>
                            <View className='item' key={item.value}>{item.value}</View>
                            <Button className='btn' onClick={() => handleDeleteItem(index)}>删除</Button>
                        </View>
                    ) : ''
                ))
            }
            <View className="count">{count}</View>
        </View>
    )
}
export default TodoList;