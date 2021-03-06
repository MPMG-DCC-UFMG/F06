
import { Button } from 'antd';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HomeHelp from '../components/HomeHelp';
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
    const [helpIsVisible, setHelpIsVisible] = useState<boolean>(false);

    const buildSearchParams = () => {
        const params = [`query=${buildQuery()}`];

        if (sourceValues.length)
            params.push(`dataSources=${sourceValues.join(",")}`);

        if (searchDate && searchDate.start && searchDate.end) {
            params.push(`startDate=${searchDate.start}`);
            params.push(`endDate=${searchDate.end}`);
        }

        if (categories.length) {
            params.push(`categories=${categories.join(",")}`)
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

                if (query)
                    query += item.operator;

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
        />
    }>
        <>

            <HomeHelp isModalVisible={helpIsVisible} onClose={() => setHelpIsVisible(false)} />
            <div className="absolute right-4 top-4 text-xl">
                <Icon name='question-fill' className='cursor-pointer' onClick={() => setHelpIsVisible(true)} />
            </div>

            <div className="w-full h-full flex items-center justify-center">
                <div className="w-full max-w-lg ">

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
                        <Button onClick={() => search()} type='primary' icon={<Icon name='search-line' margin='right' />}>Pesquisar</Button>
                    </div>
                </div>
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
