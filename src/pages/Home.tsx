
import { Button, Input, Select } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import HomeHelp from '../components/HomeHelp';
import Icon from '../components/Icon';
import SearchField from '../components/SearchField';
import SearchPanel from '../components/SearchPanel';
import HeaderMainFooter from '../templates/HeaderMainFooter';

function Home() {
    const [searchValues, setSearchValues] = useState<any[]>([{}]);
    const [helpIsVisible, setHelpIsVisible] = useState<boolean>(false);

    const addInput = () => {
        setSearchValues([...searchValues, {}])
    }

    const removeInput = (i: number) => {
        setSearchValues(searchValues.filter((item, index) => i !== index))
    }

    return (<HeaderMainFooter sideContent={<SearchPanel />}>
        <>

            <HomeHelp isModalVisible={helpIsVisible} onClose={() => setHelpIsVisible(false)} />
            <div className="absolute right-4 top-20 text-xl">
                <Icon name='question-fill' className='cursor-pointer' onClick={() => setHelpIsVisible(true)} />
            </div>

            <div className="w-full h-full flex items-center justify-center">
                <div className="w-full max-w-lg ">

                    {searchValues.map((item, i) =>
                        <SearchField
                            key={i}
                            first={i === 0}
                            count={searchValues.length}
                            onRemove={() => removeInput(i)}
                        />
                    )}

                    <div className="my-2 text-right">
                        <Button
                            onClick={addInput}
                            size='small'
                            type='dashed'
                            icon={<Icon name='add-circle-fill'
                                margin='right' />}
                        >
                            Adicionar termos
                        </Button>
                    </div>

                    <div className="my-4 text-center">
                        <Link to="/results">
                            <Button type='primary' icon={<Icon name='search-line' margin='right' />}>Pesquisar</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    </HeaderMainFooter >);
}

export default Home;
