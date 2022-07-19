import { Checkbox, Rate } from 'antd';
import React from 'react';

type Props = {
}

function ResultBlock({ }: Props) {
  return (
    <div className='py-6'>
      <div className="flex">
        <div className="w-8">
          <Checkbox defaultChecked/>
        </div>
        <div className="flex-1">
          <p className='text-blue-800 mb-0'>
            <a href='#'><strong>MercadoPago</strong> - 11/10/2019 - Belo Horizonte - Consumidor.gov.br - <strong>#123456789</strong></a>
          </p>
          <p className='text-sm text-slate-400'>
            Assunto: Serviços	- 	Área: Serviços Privados - Financeiras 	- 	Tipo de Infração: .... 	- 	Situação
          </p>
          <p className='my-2'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas tempus urna ex, non consectetur felis feugiat ut. Phasellus placerat feugiat enim, non scelerisque ex malesuada a. Proin congue, magna vitae lobortis lobortis, quam erat tristique lectus, non finibus ipsum nunc et eros. Vestibulum a efficitur mauris, pretium facilisis velit.</p>
          <div className="flex">
            <div className="flex-1">
              <p className='text-sm'>Fonte: <a href='#' className='text-blue-800'>Consumidor.gov.br</a></p>
            </div>
            <div className="flex-1 text-right">
              <Rate />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultBlock;
