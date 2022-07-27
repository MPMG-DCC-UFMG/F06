import { Checkbox, Rate } from 'antd';
import React from 'react';

type Props = {
  data: IDocumento
}

function ResultBlock({ data }: Props) {

  const sourceMap = {
    procon: {
      color: "text-blue-800",
      name: "Procon"
    },
    consumidor_gov: {
      color: "text-orange-600",
      name: "Consumidor.gov.br"
    },
    reclame_aqui: {
      color: "text-green-600",
      name: "Reclame Aqui"
    }
  }

  return (
    <div className='py-6'>
      <div className="flex">
        <div className="w-8">
          <Checkbox defaultChecked />
        </div>
        <div className="flex-1 overflow-hidden">
          <p className={`mb-0 ${sourceMap[data.tipo].color}`}>
            <a href='#' className={sourceMap[data.tipo].color}>
              <strong>{data.nome_completo_empresa}</strong> - {new Date(data.data_criacao * 1000).toLocaleDateString("pt-br")} - {data.cidade}/{data.estado} - {sourceMap[data.tipo].name}
            </a>
          </p>
          <p className='text-sm mb-2 text-slate-400 truncate  w-full'>{data.titulo}</p>
          <p className='my-2' dangerouslySetInnerHTML={{ __html: data.descricao }}></p>
          <div className="flex">
            <div className="flex-1">
              <p className='text-sm'>Fonte: <a href='#' className={sourceMap[data.tipo].color}>{sourceMap[data.tipo].name}</a></p>
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
