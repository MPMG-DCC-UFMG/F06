import { Empty, Input, Pagination, Spin } from 'antd';
import React, { useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import HelpModal from '../components/HelpModal';
import ResultBlock from '../components/ResultBlock';
import ResultExport from '../components/ResultExport';
import ResultFilter from '../components/ResultFilter';
import ResultLink from '../components/ResultLink';
import ResultPanel from '../components/ResultPanel';
import ResultSort from '../components/ResultSort';
import { Endpoint } from '../constants/endpoints';
import useFetch from '../hooks/useFetch';
import HeaderMainFooter from '../templates/HeaderMainFooter';
import { paramsToObject } from '../utils/shared';



function Results() {
    let [searchParams, setSearchParams] = useSearchParams();
    const [query, setQuery] = useState<string | null>(searchParams.get("query"));
    const [page, setPage] = useState<number>(1);

    const generateParams = () => {
        let param = [`consulta=${encodeURIComponent(searchParams.get("query") || "null")}`]
        param.push(`pagina=${page}`)
        param.push(`sid=1`)

        param = param.concat(searchParams.get("dataSources")?.split(",").map(source => `filtro_tipos_documentos=${source}`) || [])
        param = param.concat(searchParams.get("categories")?.split(",").map(source => `filtro_categoria_empresa=${source}`) || [])

        if (searchParams.get("city")) param.push(`filtro_cidade=${searchParams.get("city")}`)
        if (searchParams.get("startDate")) param.push(`filtro_data_inicio=${searchParams.get("startDate")}`)
        if (searchParams.get("endDate")) param.push(`filtro_data_fim=${searchParams.get("endDate")}`)

        return param.join("&");
    }

    const onSearch = (value: string) => {
        if (!value) return;
        const params = paramsToObject(searchParams);
        params.query = value;
        setSearchParams(params);
    }

    const onChangeQuery = (ev: any) => {
        setQuery(ev.target.value);
    }

    const { error, data } = useFetch<ISearchResult>(`${Endpoint.Search}?${generateParams()}`);

    if (!data) {
        return <HeaderMainFooter>
            <div className="w-full h-[80vh] flex items-center justify-center">
                <Spin size='large' />
            </div>
        </HeaderMainFooter>
    }

    if (data.documentos.length === 0) {
        return <HeaderMainFooter>
            <div className="w-full h-[80vh] flex items-center justify-center">
                <Empty description="Sua busca não retornou nenhum resultado" />;
            </div>
        </HeaderMainFooter>
    }

    return (<HeaderMainFooter sideContent={<ResultPanel docCount={data.doc_counts_by_index} />}>
        <>

            <div className="text-sm -m-4 px-4 py-2 bg-slate-800 text-white mb-4 divide-y divide-slate-600">
                <div className='py-2 pb-4 flex gap-2 items-center'>
                    <Input.Search className='w-full' value={query || ""} onChange={onChangeQuery} onSearch={onSearch} />
                    <HelpModal />
                </div>
                <div className="w-full py-2 mx-auto flex">
                    <div className='flex-1'>A busca retornou {data.total_documentos} resultados em {data.time.toFixed(2)} segundos</div>
                    <div className='flex-1 flex justify-end gap-2'>
                        <ResultSort />
                        <ResultFilter />
                        <ResultLink />
                        <ResultExport />
                    </div>
                </div>
            </div>

            <div className="w-full max-w-3xl px-4 mx-auto">

                <div className="divide-y">
                    {data.documentos.map(documento => <ResultBlock data={documento} />)}
                </div>

                <div >
                    <Pagination hideOnSinglePage showSizeChanger={false} defaultCurrent={1} current={page} total={data.total_paginas * data.resultados_por_pagina} onChange={(page, pageSize) => setPage(page)} />
                </div>

            </div>
        </>
    </HeaderMainFooter >);
}

export default Results;
