import { Checkbox, Rate } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { sourceList, SourceListItem } from '../constants/sourceList';

type Props = {
  data: IDocumento
}

function ResultBlock({ data }: Props) {

  const currentSourceType = (type: string): SourceListItem | undefined => {
    return sourceList.find(item => item.key === type);
  }

  return (
    <div className='py-6'>
      <div className="flex">
        <div className="w-8">
          <Checkbox defaultChecked />
        </div>
        <div className="flex-1 overflow-hidden">
          <p className={`mb-0 ${currentSourceType(data.tipo)?.color} truncate`}>
            <Link to={`/detail/${data.tipo}/${data.id}`} className={currentSourceType(data.tipo)?.color}>
              <strong>{data.nome_completo_empresa || "[Indeterminada]"}</strong> - {new Date(data.data_criacao * 1000).toLocaleDateString("pt-br")} - {data.cidade}/{data.estado} - {currentSourceType(data.tipo)?.name} - <strong>#{data.id_manifestacao || data.id}</strong>
            </Link>
          </p>
          <p className='text-sm mb-2 text-gray-400 truncate  w-full'>{data.titulo}</p>
          <p className='my-2' dangerouslySetInnerHTML={{ __html: data.descricao }}></p>
          <div className="flex">
            <div className="flex-1">
              <p className='text-sm'>Fonte: <a href='#' className={currentSourceType(data.tipo)?.color}>{currentSourceType(data.tipo)?.name}</a></p>
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
