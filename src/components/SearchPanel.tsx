import { Card, Checkbox, DatePicker, Input, Select } from 'antd';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import React from 'react';
import { Endpoint } from '../constants/endpoints';
import useFetch from '../hooks/useFetch';

const { RangePicker } = DatePicker;

type Props = {
  sourceValues: string[],
  sourceValuesChange: (checkedValues: CheckboxValueType[]) => void;
  searchDateChange: (date: { start?: string, end?: string }) => void;
  categoriesChange: (values: string[]) => void;
}

function SearchPanel({ sourceValues, sourceValuesChange, searchDateChange, categoriesChange }: Props) {

  const { data: proconCategories } = useFetch<ICategories[]>(Endpoint.ProconCategories);
  const { data: reclameAquiCategories } = useFetch<ICategories[]>(Endpoint.ReclameAquiCategories);

  const getCategories = () => {
    let categories: ICategories[] = [];

    if (proconCategories) categories = categories.concat(proconCategories);
    if (reclameAquiCategories) categories = categories.concat(reclameAquiCategories);

    return categories;
  }

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
      <RangePicker
        onChange={(values) => searchDateChange({
          start: values?.[0]?.format("YYYY-MM-DD"),
          end: values?.[1]?.format("YYYY-MM-DD"),
        })}
      />
    </Card>

    <Card size='small' title="Categorias" className='my-4'>
      <div className="my-2">
        <Select
          mode="multiple"
          allowClear
          placeholder="Todas as categorias"
          className='w-full'
          onChange={(value) => categoriesChange(value)}
        >
          {
            getCategories().map(
              category => <Select.Option key={category.id}>{category.categoria}</Select.Option>
            )
          }
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
