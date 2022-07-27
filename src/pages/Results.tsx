import { Pagination, Spin } from 'antd';
import React, { useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import ResultBlock from '../components/ResultBlock';
import ResultExport from '../components/ResultExport';
import ResultFilter from '../components/ResultFilter';
import ResultLink from '../components/ResultLink';
import ResultPanel from '../components/ResultPanel';
import ResultSort from '../components/ResultSort';
import { Endpoint } from '../constants/endpoints';
import useFetch from '../hooks/useFetch';
import HeaderMainFooter from '../templates/HeaderMainFooter';



function Results() {
    const [page, setPage] = useState<number>(1);
    let [searchParams, setSearchParams] = useSearchParams();
    const { error, data } = useFetch<ISearchResult>(`${Endpoint.Search}?consulta=${searchParams.get("query")}&pagina=${page}&sid=1&${searchParams.get("dataSources")?.split(",").map(source => `filtro_tipos_documentos[]=${source}`).join("&")}`);

    if (!data) {
        return <HeaderMainFooter>
            <div className="w-full h-[80vh] flex items-center justify-center">
                <Spin size='large' />
            </div>
        </HeaderMainFooter>
    }

    return (<HeaderMainFooter sideContent={<ResultPanel docCount={data.doc_counts_by_index} />}>
        <>

            <div className="text-sm -m-4 px-4 py-2 bg-slate-800 text-white mb-4 ">
                <div className="w-full max-w-3xl px-4 mx-auto flex">
                    <div className='flex-1'>A busca retornou {data.total_documentos} resultados em {data.time.toFixed(2)} segundos</div>
                    <div className='flex-1 flex gap-2 justify-end'>
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
                    <Pagination defaultCurrent={1} current={page} total={data.total_paginas} onChange={(page, pageSize) => setPage(page)} />
                </div>

            </div>
        </>
    </HeaderMainFooter >);
}

export default Results;
