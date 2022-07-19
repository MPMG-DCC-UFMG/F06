import { Input, Select } from 'antd';
import React from 'react';
import Icon from './Icon';

type Props = {
    first?: boolean,
    count: number,
    onRemove: () => void
}

function SearchField({ first, count, onRemove }: Props) {
    return (<>
        <div className='flex my-2 gap-2 items-center'>
            {!first ?
                <div className="w-28">
                    <Select defaultValue="AND" className="w-full">
                        <Select.Option value="AND">E</Select.Option>
                        <Select.Option value="OR">OU</Select.Option>
                        <Select.Option value="NOT">E NÃO</Select.Option>
                    </Select>
                </div>
                : null}
            <Input.TextArea placeholder='Digite uma ou mais palavras-chave' autoSize />
            {count > 1 ?
                <div className="min-w-6 text-red-600 cursor-pointer" onClick={onRemove}>
                    <Icon name='close-circle-fill' />
                </div>
                : null}
        </div>
    </>);
}

export default SearchField;
