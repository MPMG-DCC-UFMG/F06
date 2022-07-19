import { Button, Input, Popover, Select, Switch } from 'antd';
import React, { useState } from 'react';
import Icon from './Icon';

type Props = {
}

function ResultExport({ }: Props) {

    const content = (
        <div>
            <div className='my-4'>
                <Switch defaultChecked /> Anonimizar dados dos consumidores
            </div>
            <div className='my-4'>
                <Switch defaultChecked /> Exportar apenas selecionados
            </div>
            <div className='my-4'>
                <Button className='w-full' type='primary'>Exportar</Button>
            </div>
        </div>
    );

    return (<>
        <Popover content={content} title="Linkar busca" trigger="click">
            <Icon name='file-download-fill' className='cursor-pointer' />
        </Popover>
    </>);
}

export default ResultExport;
