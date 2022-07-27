import { Layout } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/Icon';

const { Header, Content, Sider } = Layout;

type Props = {
  children: JSX.Element;
  sideContent?: any;
}

function HeaderMainFooter({ children, sideContent }: Props) {
  const [panelIsVisible, setPanelIsVisible] = useState<boolean>(true);

  return (<>
    <Layout>
      <Header>
        <Link to="/" className='text-white'>Buscador de Reclamações</Link>
      </Header>
      <Layout>
        {
          panelIsVisible && sideContent ?
            <Sider width={300} className="bg-slate-200 p-4 relative h-lateral overflow-y-auto">
              <div onClick={() => setPanelIsVisible(!panelIsVisible)} className="w-6 h-8 rounded-l bg-primary text-white shadow-lg z-10 absolute cursor-pointer right-0 top-4 flex justify-center items-center">
                <Icon name='arrow-left-s-line' />
              </div>
              {sideContent}
            </Sider>
            :
            <div onClick={() => setPanelIsVisible(!panelIsVisible)} className="w-6 h-8 rounded-r bg-primary text-white shadow-lg z-10 absolute cursor-pointer left-0 mt-4 flex justify-center items-center">
              <Icon name='arrow-right-s-line' />
            </div>
        }
        <Layout>
          <Content className='h-lateral overflow-y-auto relative'>
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </>);
}

export default HeaderMainFooter;
