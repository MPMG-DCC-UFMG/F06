import { Empty, Input, Modal, Pagination, Spin } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import DocumentDetail from '../components/DocumentDetail';
import FilterTags from '../components/FilterTags';
import HelpModal from '../components/HelpModal';
import ResultBlock from '../components/ResultBlock';
import ResultExport from '../components/ResultExport';
import ResultFilter from '../components/ResultFilter';
import ResultLink from '../components/ResultLink';
import ResultSort from '../components/ResultSort';
import SearchPanel from '../components/SearchPanel';
import { Endpoint } from '../constants/endpoints';
import useFetch from '../hooks/useFetch';
import HeaderMainFooter from '../templates/HeaderMainFooter';
import { paramsToObject } from '../utils/shared';
import { GlobalStateContext } from '../wrappers/GlobalContext';



function Results() {
    const { categories, city, searchDate, sourceValues, order } = useContext(GlobalStateContext);
    let [searchParams, setSearchParams] = useSearchParams();
    const [query, setQuery] = useState<string | null>(searchParams.get("query"));
    const [page, setPage] = useState<number>(1);
    const [currentDocument, setCurrentDocument] = useState<{ id: string, type: string } | null>();

    const generateParams = () => {
        let param = [`consulta=${encodeURIComponent(searchParams.get("query") || "null")}`]
        param.push(`pagina=${page}`)
        param.push(`sid=1`)

        param = param.concat(searchParams.get("dataSources")?.split(",").map(source => `filtro_tipos_documentos=${source}`) || [])
        param = param.concat(searchParams.get("categories")?.split(",").map(source => `filtro_categoria_empresa=${source}`) || [])

        if (searchParams.get("city")) param.push(`filtro_cidade=${searchParams.get("city")}`)
        if (searchParams.get("startDate")) param.push(`filtro_data_inicio=${searchParams.get("startDate")}`)
        if (searchParams.get("endDate")) param.push(`filtro_data_fim=${searchParams.get("endDate")}`)

        if (searchParams.get("tipo_ordenacao")) param.push(`tipo_ordenacao=${searchParams.get("tipo_ordenacao")}`)
        if (searchParams.get("ordenacao")) param.push(`ordenacao=${searchParams.get("ordenacao")}`)

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

    useEffect(() => {
        const params = paramsToObject(searchParams);
        params.dataSources = sourceValues.join(",");

        if (searchDate.start && searchDate.end) {
            params.startDate = searchDate.start;
            params.endDate = searchDate.end;
        } else {
            delete params.startDate;
            delete params.endDate;
        }

        if (categories)
            params.categories = categories.join(",");
        else
            delete params.categories;

        if (city)
            params.city = city
        else
            delete params.city;

        if (order) {
            const orderInfo = order.split("_");
            params.tipo_ordenacao = orderInfo[0];
            params.ordenacao = orderInfo[1];
        } else {
            delete params.tipo_ordenacao;
            delete params.ordenacao;
        }

        setSearchParams(params);
    }, [categories, city, searchDate, sourceValues, order]);

    const { data } = useFetch<ISearchResult>(`${Endpoint.Search}?${generateParams()}`);

    const openDocumentModal = (id: string, type: string) => {
        setCurrentDocument({ id, type });
    }

    const renderContent = () => {
        if (!data) {
            return <div className="w-full h-[80vh] flex items-center justify-center">
                <Spin size='large' />
            </div>
        }

        if (data.documentos.length === 0) {
            return <div className="w-full h-[80vh] flex items-center justify-center">
                <Empty description="Sua busca não retornou nenhum resultado" />;
            </div>
        }

        return <div className="w-full max-w-3xl px-4 mx-auto">
            {currentDocument
                ? <Modal
                    visible
                    footer={null}
                    onCancel={() => setCurrentDocument(null)}
                    width={"80%"}
                >
                    <DocumentDetail {...currentDocument} />
                </Modal>
                : null
            }
            <div className="divide-y">
                {data.documentos.map(documento => <ResultBlock data={documento} openModal={openDocumentModal} />)}
            </div>
            <div >
                <Pagination hideOnSinglePage showSizeChanger={false} defaultCurrent={1} current={page} total={data.total_paginas * data.resultados_por_pagina} onChange={(page, pageSize) => setPage(page)} />
            </div>
        </div>
    }

    return (<HeaderMainFooter sideContent={<SearchPanel docCount={data?.doc_counts_by_index} />}>
        <>
            <div className="text-sm -m-4 px-4 py-2 bg-gray-800 text-white mb-4 divide-y divide-gray-600">
                <div className='py-2 pb-4 flex gap-2 items-center'>
                    <Input.Search className='w-full' value={query || ""} onChange={onChangeQuery} onSearch={onSearch} />
                    <HelpModal />
                </div>
                <FilterTags />
                <div className="w-full py-2 mx-auto flex">
                    <div className='flex-1'>A busca retornou {data?.total_documentos} resultados em {data?.time.toFixed(2)} segundos</div>
                    <div className='flex-1 flex justify-end gap-2'>
                        <ResultLink />
                        {/* <ResultExport /> */}
                    </div>
                </div>
            </div>

            {renderContent()}
        </>
    </HeaderMainFooter >);
}

export default Results;
