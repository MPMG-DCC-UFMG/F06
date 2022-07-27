import { Card, Checkbox, DatePicker, Input, Select } from 'antd';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import React from 'react';

const { RangePicker } = DatePicker;

type Props = {
  sourceValues: string[],
  sourceValuesChange: (checkedValues: CheckboxValueType[]) => void;
}

function SearchPanel({ sourceValues, sourceValuesChange }: Props) {
  return (<div className='-my-4'>
    <Card size='small' title="Bases de dados" className='my-4'>
      <Checkbox.Group
        value={sourceValues}
        onChange={sourceValuesChange}
        options={[
          { label: "Procon", value: "procon" },
          { label: "Reclame Aqui", value: "reclame_aqui" },
          { label: "Consumidor.gov.br", value: "consumidor_gov" }
        ]} />
    </Card>

    <Card size='small' title="Período" className='my-4'>
      <RangePicker />
    </Card>

    <Card size='small' title="Categorias" className='my-4'>
      <div className="my-2">
        <Select
          mode="multiple"
          allowClear
          placeholder="Todas as categorias"
          className='w-full'
        >
          <Select.Option key="Teste 1">Teste 1</Select.Option>
          <Select.Option key="Teste 2">Teste 2</Select.Option>
          <Select.Option key="Teste 3">Teste 3</Select.Option>
          <Select.Option key="Teste 4">Teste 4</Select.Option>
          <Select.Option key="Teste 5">Teste 5</Select.Option>
        </Select>
      </div>
    </Card>

    <Card size='small' title="Lugar" className='my-4'>
      <div className="my-2">
        <Input />
      </div>
    </Card>

  </div>);
}

export default SearchPanel;
