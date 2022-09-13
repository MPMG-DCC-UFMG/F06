
import { Button } from 'antd';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HelpModal from '../components/HelpModal';
import Icon from '../components/Icon';
import SearchField from '../components/SearchField';
import SearchPanel from '../components/SearchPanel';
import HeaderMainFooter from '../templates/HeaderMainFooter';

export type SearchValue = {
    operator?: " " | "+" | "-";
    query: string;
    indented?: boolean;
}

function Home() {
    const navigate = useNavigate();
    const [searchValues, setSearchValues] = useState<SearchValue[]>([{
        operator: "+",
        query: ""
    }]);

    const [sourceValues, setSourceValues] = useState<string[]>(["procon", "reclame_aqui", "consumidor_gov"]);
    const [searchDate, setSearchDate] = useState<{ start?: string, end?: string }>({});
    const [categories, setCategories] = useState<string[]>([]);
    const [city, setCity] = useState<string>("");

    const buildSearchParams = () => {
        const params = [`query=${encodeURIComponent(buildQuery())}`];

        if (sourceValues.length)
            params.push(`dataSources=${sourceValues.join(",")}`);

        if (searchDate && searchDate.start && searchDate.end) {
            params.push(`startDate=${searchDate.start}`);
            params.push(`endDate=${searchDate.end}`);
        }

        if (categories.length) {
            params.push(`categories=${categories.join(",")}`)
        }

        if (city.length) {
            params.push(`city=${city}`)
        }

        return params.join("&");
    }

    const search = () => {
        navigate({
            pathname: "/results",
            search: `?${buildSearchParams()}`
        })
    }

    const addInput = () => {
        setSearchValues([...searchValues, {
            operator: "+",
            query: ""
        }])
    }

    const removeInput = (i: number) => {
        setSearchValues(searchValues.filter((item, index) => i !== index))
    }

    const updateSearchValue = (index: number, newData: SearchValue) => {
        const data = [...searchValues];
        data[index] = newData;
        setSearchValues(data);
    }

    const buildQuery = () => {
        let query = "";
        let isIndented: boolean | undefined = false;
        for (const item of searchValues) {
            if (item.query) {

                if (!item.indented && isIndented)
                    query += ")";

                if (query) {
                    if (item.operator !== " ")
                        query += " ";

                    query += item.operator;
                }

                if (item.indented && !isIndented)
                    query += "(";

                query += item.query;
                isIndented = item.indented;
            }
        }

        if (isIndented)
            query += ")";

        return query;
    }

    const sourceValuesChange = (checkedValues: CheckboxValueType[]) => {
        setSourceValues(checkedValues.map(item => item.toString()));
    }

    return (<HeaderMainFooter sideContent={
        <SearchPanel
            sourceValues={sourceValues}
            sourceValuesChange={sourceValuesChange}
            searchDateChange={setSearchDate}
            categoriesChange={setCategories}
            citiesChange={setCity}
        />
    }>
        <>

            <div className="absolute right-4 top-4 text-xl">
                <HelpModal />
            </div>

            <div className="w-full h-full flex items-center justify-center">
                <form onSubmit={search} className="w-full max-w-lg ">

                    {searchValues.map((item, i) =>
                        <SearchField
                            key={i}
                            index={i}
                            first={i === 0}
                            count={searchValues.length}
                            data={item}
                            onRemove={() => removeInput(i)}
                            onChange={updateSearchValue}
                        />
                    )}

                    <div className="my-2 text-right">
                        <Button
                            onClick={addInput}
                            size='small'
                            type='dashed'
                            icon={<Icon name='add-circle-fill'
                                margin='right' />}
                        >
                            Adicionar termos
                        </Button>
                    </div>

                    <div className="my-4 text-center">
                        <Button htmlType='submit' type='primary' icon={<Icon name='search-line' margin='right' />}>Pesquisar</Button>
                    </div>
                </form>
            </div>

            {buildQuery() ?
                <div className="w-full max-w-lg bottom-3 p-2 bg-slate-800 text-white absolute left-1/2 -translate-x-1/2 rounded-lg text-center opacity-40 hover:opacity-100 transition-opacity">
                    {buildQuery()}
                </div>
                : null}
        </>
    </HeaderMainFooter >);
}

export default Home;
