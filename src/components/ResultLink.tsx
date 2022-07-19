import { Button, Input, Popover, Select } from 'antd';
import React, { useState } from 'react';
import Icon from './Icon';

type Props = {
}

function ResultLink({ }: Props) {

    const content = (
        <div>
            <Input value='https://buscador.procon.mpmg.gov.br/serasa%20+(=...' />
        </div>
    );

    return (<>
        <Popover content={content} title="Linkar busca" trigger="click">
            <Icon name='link' className='cursor-pointer' />
        </Popover>
    </>);
}

export default ResultLink;
