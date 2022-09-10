import { View, Input, Button } from '@tarojs/components';
import { useState } from 'react';
import './index.scss';

const Header = ({
    addItem,
}) => {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (value) => {
        setInputValue(value);
    }

    const handleAddItem = () => {
        handleInputChange('');
        addItem({ show: true, value: inputValue });
    }

    return (
        <View className='header-wrap'>
            <Input
                className='input'
                type="text"
                placeholder='请输入todo事件'
                onInput={(e) => handleInputChange(e.detail.value)}
                value={inputValue}
            />
            <Button className='btn add-btn' onClick={handleAddItem}>添加</Button>
        </View>
    )
}
export default Header;