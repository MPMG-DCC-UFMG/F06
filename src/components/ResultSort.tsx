import { Button, Popover, Select } from 'antd';
import React, { useState } from 'react';
import Icon from './Icon';

type Props = {
}

function ResultSort({ }: Props) {

  const [sort, setSort] = useState<string[]>([]);

  const addSort = () => setSort([...sort, ""]);
  const removeSort = (index: number) => setSort(sort.filter((item, i) => i !== index));

  const content = (
    <div>
      {sort.map((item, i) =>
        <div className="my-2 flex">
          <Select className='w-full' size='small'>
            <Select.Option key="data-asc">Data da reclamação - Mais recentes primeiro</Select.Option>
            <Select.Option key="data-desc">Data da reclamação - Mais antigas primeiro</Select.Option>
            <Select.Option key="relevancia-asc">Relevância - Ascendente</Select.Option>
            <Select.Option key="relevancia-desc">Relevância - Descendente</Select.Option>
            <Select.Option key="empresa-asc">Empresa - Ascendente</Select.Option>
            <Select.Option key="empresa-desc">Empresa - Descendente</Select.Option>
          </Select>
          <div className="w-6 text-center text-red-600 cursor-pointer" onClick={() => removeSort(i)}>
            <Icon name='close-circle-fill' />
          </div>
        </div>
      )}
      <div className="my-2">
        <Button type='dashed' size="small" className='w-full' onClick={addSort}>Adicionar</Button>
      </div>
    </div>
  );

  return (<>
    <Popover content={content} title="Ordenar resultados" trigger="click">
      <Icon name='sort-desc' className='cursor-pointer' />
    </Popover>
  </>);
}

export default ResultSort;
