import { Card } from 'antd';
import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { sourceList } from '../constants/sourceList';

type Props = {
  docCount?: IDocCount;
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

  if(!docCount) return null;

  return (<div className='-my-4'>
    <Card size='small' title="Base de dados" className='my-4'>
      {sourceList.map((item) =>
        docCount[item.key] ?
          <a onClick={() => changeDataSources(item.key)} className={`block ${item.color}`}>
            {item.name} ({docCount[item.key]})
          </a>
          : null
      )}

    </Card>
  </div>);
}

export default ResultPanel;
