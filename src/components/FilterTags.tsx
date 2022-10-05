import { Tag } from 'antd';
import React, { useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { sourceList } from '../constants/sourceList'
import { formatDate } from '../utils/shared';
import { GlobalStateContext } from '../wrappers/GlobalContext';

type Props = {
}

function FilterTags({ }: Props) {
    let [searchParams, setSearchParams] = useSearchParams();
    const { proconCategories } = useContext(GlobalStateContext);

    const getDatasources = () => {
        const datasources = searchParams.get("dataSources")?.split(",");
        if (!datasources) return "";
        return datasources.map(source => sourceList.find(sl => sl.key === source)?.name).join(", ");
    }

    const getCategories = () => {
        const categoryIds = searchParams.get("categories")?.split(",");
        if (!categoryIds) return "";
        return categoryIds.map(id => (proconCategories || []).find(sl => sl.id === id)?.categoria).join(", ");
    }

    const showTags = () => {
        const tags = [];

        if (getDatasources())
            tags.push(<Tag color="blue">Base de dados: {getDatasources()}</Tag>);

        if (searchParams.get("startDate") && searchParams.get("endDate"))
            tags.push(<Tag color="blue">Período: de {formatDate(searchParams.get("startDate") || "")} a {formatDate(searchParams.get("endDate") || "")}</Tag>);

        if (searchParams.get("categories"))
            tags.push(<Tag color="blue">Categorias: {getCategories()}</Tag>);

        if (searchParams.get("city"))
            tags.push(<Tag color="blue">Cidade: {searchParams.get("city")}</Tag>);


        return tags;
    }

    return (<div className='py-2 gap-y-2'>
        {showTags()}
    </div>);
}

export default FilterTags;
