import { Badge, Card, Checkbox, DatePicker, Select, Switch } from 'antd';
import type { Moment } from 'moment';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import React, { useState, useContext } from 'react';
import { Endpoint } from '../constants/endpoints';
import useFetch from '../hooks/useFetch';
import { sourceList } from '../constants/sourceList';
import { GlobalStateContext } from '../wrappers/GlobalContext';
import moment from 'moment';

const { RangePicker } = DatePicker;

type Props = {
  docCount?: IDocCount;
}

function SearchPanel({ docCount }: Props) {
  const {
    proconCategories,
    sourceValues, setSourceValues,
    searchDate, setSearchDate,
    categories, setCategories,
    city, setCity,
    order, setOrder
  } = useContext(GlobalStateContext);
  const [allDataBase, setAllDataBase] = useState<boolean>(sourceValues.length === 3);
  const { data: cities } = useFetch<ICity[]>(Endpoint.Cities + "?filtro_sigla_estado=MG");

  const mappedSourceList = sourceList.map(item => ({
    label: <span>{item.name} <Badge size='small' overflowCount={999999} style={{ backgroundColor: item.colorHex }} count={docCount ? docCount[item.key] : 0} /></span>,
    value: item.key
  }));

  const getCategories = () => {
    return proconCategories || [];
  }

  const sourceValuesChange = (checkedValues: CheckboxValueType[]) => {
    setSourceValues(checkedValues.map(item => item.toString()));
  }

  const onChangeAllDataBase = (checked: boolean) => {
    console.log(checked)
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
        <Switch defaultChecked={allDataBase} onChange={onChangeAllDataBase} /> Todas as Bases de dados
      </label>
      {!allDataBase ?
        <Checkbox.Group
          className='mt-4'
          defaultValue={sourceValues}
          onChange={sourceValuesChange}
          options={mappedSourceList} />
        : null}
    </Card>

    <Card size='small' title="Ordenação" className='my-4'>
      <div className="my-2">
        <Select
          value={order}
          allowClear
          className='w-full'
          onChange={(value) => setOrder(value)}
        >
          <Select.Option key="relevancia_asc">Mais relevantes primeiro</Select.Option>
          <Select.Option key="relevancia_desc">Menos relevantes primeiro</Select.Option>
          <Select.Option key="data_asc">Mais recentes primeiro</Select.Option>
          <Select.Option key="data_desc">Mais antigas primeiro</Select.Option>

        </Select>
      </div>
    </Card>

    <Card size='small' title="Período" className='my-4'>
      <RangePicker
        value={(searchDate.start && searchDate.end) ? [
          moment(searchDate.start),
          moment(searchDate.end),
        ] : null}
        onChange={(values) => setSearchDate({
          start: values?.[0]?.format("YYYY-MM-DD"),
          end: values?.[1]?.format("YYYY-MM-DD"),
        })}
        disabledDate={disabledDate}
      />
    </Card>

    <Card size='small' title="Categorias" className='my-4'>
      <div className="my-2">
        <Select
          value={categories}
          mode="multiple"
          allowClear
          placeholder="Todas as categorias"
          className='w-full'
          onChange={(value) => setCategories(value)}
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
          value={city ? city : null}
          allowClear
          placeholder="Todas as cidades"
          className='w-full'
          onChange={(value) => setCity(value)}
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
