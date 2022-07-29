import { Card } from 'antd';
import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

type Props = {
  docCount: IDocCount;
}

function ResultPanel({ docCount }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const changeDataSources = (newDataSource: string) => {
    let params = [];
    for (const [key, value] of searchParams.entries()) {
      if (key === "dataSources") {
        params.push(`${key}=${newDataSource}`);
      } else {
        params.push(`${key}=${value}`);
      }
    }
    navigate(`/results?${params.join("&")}`);
  }

  return (<div className='-my-4'>
    <Card size='small' title="Base de dados" className='my-4'>
      {docCount.consumidor_gov ?
        <a onClick={() => changeDataSources("consumidor_gov")} className='block'>Consumidor.gov.br ({docCount.consumidor_gov})</a>
        : null
      }
      {docCount.procon ?
        <a onClick={() => changeDataSources("procon")} className='block'>Procon ({docCount.procon})</a>
        : null
      }
      {docCount.reclame_aqui ?
        <a onClick={() => changeDataSources("reclame_aqui")} className='block'>Reclame Aqui ({docCount.reclame_aqui})</a>
        : null
      }
    </Card>

    {/* <Card size='small' title="Empresas" className='my-4'>
      <a href='' className='block'>Mercado Livre (503)</a>
      <a href='' className='block'>PicPay (100)</a>
      <a href='' className='block'>MagaLu (50)</a>
    </Card>

    <Card size='small' title="Categorias" className='my-4'>
      <a href='' className='block'>Anatel (503)</a>
      <a href='' className='block'>Financeiras (100)</a>
      <a href='' className='block'>Água, gás (50)</a>
    </Card>

    <Card size='small' title="Período" className='my-4'>
      <a href='' className='block'>2022 (503)</a>
      <a href='' className='block'>2021 (100)</a>
      <a href='' className='block'>2020 (50)</a>
    </Card> */}

  </div>);
}

export default ResultPanel;
