import { Checkbox, Rate } from 'antd';
import React from 'react';
import { sourceList, SourceListItem } from '../constants/sourceList';
import Icon from './Icon';

type Props = {
  data: IDocumento,
  openModal?: (id: string, type: string) => void;
}

function ResultBlock({ data, openModal }: Props) {

  const currentSourceType = (type: string): SourceListItem | undefined => {
    return sourceList.find(item => item.key === type);
  }

  const openDocumentInModal = (id: string, type: string) => {
    if (openModal)
      openModal(id, type);
  }

  const openDocumentInNewPage = (id: string, type: string) => {
    window.open(`/detail/${type}/${id}`);
  }

  return (
    <div className='py-6'>
      <div className="flex">
        <div className="w-8">
          <Checkbox defaultChecked />
        </div>
        <div className="flex-1 overflow-hidden">
          <div className="flex gap-2">
            <p className={`mb-0 ${currentSourceType(data.tipo)?.color} truncate`}>
              <a onClick={() => openDocumentInModal(data.id, data.tipo)} className={currentSourceType(data.tipo)?.color}>
                <strong>{data.nome_completo_empresa || "[Indeterminada]"}</strong> - {new Date(data.data_criacao * 1000).toLocaleDateString("pt-br")} - {data.cidade}/{data.estado} - {currentSourceType(data.tipo)?.name}
              </a>
            </p>
            <p>
              <Icon
                name='share-box-fill'
                onClick={() => openDocumentInNewPage(data.id, data.tipo)}
                className="cursor-pointer"
              />
            </p>
          </div>
          <p className='text-sm mb-2 text-gray-400 truncate  w-full'>{data.titulo}</p>
          <p className='my-2' dangerouslySetInnerHTML={{ __html: data.descricao }}></p>
          <div className="flex">
            <div className="flex-1">
              <p className='text-sm'>Fonte: <a href='#' className={currentSourceType(data.tipo)?.color}>{currentSourceType(data.tipo)?.name}</a></p>
            </div>
            {/* <div className="flex-1 text-right">
              <Rate />
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultBlock;
