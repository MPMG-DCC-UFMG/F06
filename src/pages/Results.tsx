import { Pagination } from 'antd';
import React, { useState } from 'react';
import ResultBlock from '../components/ResultBlock';
import ResultExport from '../components/ResultExport';
import ResultFilter from '../components/ResultFilter';
import ResultLink from '../components/ResultLink';
import ResultPanel from '../components/ResultPanel';
import ResultSort from '../components/ResultSort';
import HeaderMainFooter from '../templates/HeaderMainFooter';

function Results() {

    return (<HeaderMainFooter sideContent={<ResultPanel />}>
        <>

            <div className="text-sm -m-4 px-4 py-2 bg-slate-800 text-white mb-4 ">
                <div className="w-full max-w-3xl px-4 mx-auto flex">
                    <div className='flex-1'>A busca retornou XX.XXX resultados em 0,95 segundos</div>
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
                    <ResultBlock />
                    <ResultBlock />
                    <ResultBlock />
                    <ResultBlock />
                    <ResultBlock />
                </div>

                <div >
                    <Pagination defaultCurrent={1} total={50} />
                </div>

            </div>
        </>
    </HeaderMainFooter >);
}

export default Results;
