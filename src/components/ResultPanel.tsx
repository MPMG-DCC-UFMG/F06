import { Card } from 'antd';
import React from 'react';

type Props = {
  docCount: IDocCount;
}

function ResultPanel({ docCount }: Props) {
  return (<div className='-my-4'>
    <Card size='small' title="Base de dados" className='my-4'>
      <a href='' className='block'>Consumidor.gov.br ({docCount.consumidor_gov})</a>
      <a href='' className='block'>Procon ({docCount.procon})</a>
      <a href='' className='block'>Reclame Aqui ({docCount.reclame_aqui})</a>
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
