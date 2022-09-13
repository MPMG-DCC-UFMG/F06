import { Card, Checkbox, DatePicker, Input, Select, Switch } from 'antd';
import type { Moment } from 'moment';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import React, { useState } from 'react';
import { Endpoint } from '../constants/endpoints';
import useFetch from '../hooks/useFetch';
import { sourceList } from '../constants/sourceList';

const { RangePicker } = DatePicker;

type Props = {
  sourceValues: string[],
  sourceValuesChange: (checkedValues: CheckboxValueType[]) => void;
  searchDateChange: (date: { start?: string, end?: string }) => void;
  categoriesChange: (values: string[]) => void;
  citiesChange: (values: string) => void;
}

const mappedSourceList = sourceList.map(item => ({
  label: item.name,
  value: item.key
}));

function SearchPanel({ sourceValues, sourceValuesChange, searchDateChange, categoriesChange, citiesChange }: Props) {
  const [allDataBase, setAllDataBase] = useState<boolean>(true);
  const { data: proconCategories } = useFetch<ICategories[]>(Endpoint.ProconCategories);
  const { data: reclameAquiCategories } = useFetch<ICategories[]>(Endpoint.ReclameAquiCategories);
  const { data: cities } = useFetch<ICity[]>(Endpoint.Cities + "?filtro_sigla_estado=MG");

  const getCategories = () => {
    return proconCategories || [];
    // let categories: ICategories[] = [];

    // if (proconCategories) categories = categories.concat(proconCategories);
    // if (reclameAquiCategories) categories = categories.concat(reclameAquiCategories);

    // return categories;
  }

  const onChangeAllDataBase = (checked: boolean) => {
    setAllDataBase(checked);
    sourceValuesChange(mappedSourceList.map(item => item.value));
  }

  const disabledDate = (current: Moment) => {
    const toEarly = current.toDate().getTime() < new Date(2010, 0, 1).getTime();
    const toLate = current.toDate().getTime() > new Date().getTime();
    return toEarly || toLate;
  };

  return (<div className='-my-4'>
    <Card size='small' title="Bases de dados" className='my-4'>
      <label className='flax gap-2'>
        <Switch defaultChecked onChange={onChangeAllDataBase} /> Todas as Bases de dados
      </label>
      {!allDataBase ?
        <Checkbox.Group
          className='mt-4'
          value={sourceValues}
          onChange={sourceValuesChange}
          options={mappedSourceList} />
        : null}
    </Card>

    <Card size='small' title="Período" className='my-4'>
      <RangePicker
        onChange={(values) => searchDateChange({
          start: values?.[0]?.format("YYYY-MM-DD"),
          end: values?.[1]?.format("YYYY-MM-DD"),
        })}
        disabledDate={disabledDate}
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

    <Card size='small' title="Cidade" className='my-4'>
      <div className="my-2">
        <Select
          allowClear
          placeholder="Todas as cidades"
          className='w-full'
          onChange={(value) => citiesChange(value)}
        >
          {
            (cities || []).map(
              city => <Select.Option key={city.nome_cidade}>{city.nome_cidade}</Select.Option>
            )
          }
        </Select>
      </div>
    </Card>

  </div>);
}

export default SearchPanel;
