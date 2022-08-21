import { Input, Select } from 'antd';
import React from 'react';
import { SearchValue } from '../pages/Home';
import Icon from './Icon';

type Props = {
    first?: boolean,
    index: number,
    count: number,
    onRemove: () => void,
    onChange: (index: number, newData: SearchValue) => void,
    data: SearchValue
}

function SearchField({ first, index, count, onRemove, onChange, data }: Props) {

    const changeData = (key: keyof SearchValue, value: any) => {
        const newData = { ...data };
        newData[key] = value as never;
        onChange(index, newData);
    }

    return (<>
        <div className='flex my-2 gap-2 items-center'>

            {data.indented ?
                <div className="w-6"></div>
                : null}

            <div className="min-w-6 text-green-600 cursor-pointer" onClick={() => changeData("indented", !data.indented)}>
                <Icon name={data.indented ? 'arrow-left-fill' : 'arrow-right-fill'} />
            </div>
            {!first ?
                <div className="w-28">
                    <Select defaultValue="AND" className="w-full" value={data.operator} onChange={(v) => changeData("operator", v)}>
                        <Select.Option value="+">E</Select.Option>
                        <Select.Option value=" ">OU</Select.Option>
                        <Select.Option value="-">E NÃO</Select.Option>
                    </Select>
                </div>
                : null}
            <Input
                required
                placeholder='Digite uma ou mais palavras-chave'
                value={data.query}
                onChange={(ev) => changeData('query', ev.target.value)}
            />
            {count > 1 ?
                <div className="min-w-6 text-red-600 cursor-pointer" onClick={onRemove}>
                    <Icon name='close-circle-fill' />
                </div>
                : null}
        </div>
    </>);
}

export default SearchField;
