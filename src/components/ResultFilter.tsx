import { Button, Input, Popover, Select } from 'antd';
import React, { useState } from 'react';
import Icon from './Icon';

type Props = {
}

function ResultFilter({ }: Props) {

    const content = (
        <div>
            <Input placeholder='Digite qualquer coisa aqui...' />
        </div>
    );

    return (<>
        <Popover content={content} title="Filtrar busca" trigger="click">
            <Icon name='filter-fill' className='cursor-pointer' />
        </Popover>
    </>);
}

export default ResultFilter;
