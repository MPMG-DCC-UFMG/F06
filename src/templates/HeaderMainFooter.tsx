import { Layout } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/Icon';
import logo from '../assets/Marca_ProconDATA_negativo.png';

const { Header, Content, Sider } = Layout;

type Props = {
  children: JSX.Element;
  sideContent?: any;
}

function HeaderMainFooter({ children, sideContent }: Props) {
  const [panelIsVisible, setPanelIsVisible] = useState<boolean>(true);

  return (<>
    <Layout>
      <Header className="p-0">
        <Link to="/" className='text-white h-16 flex items-center w-[300px] px-4 bg-secondary'>
          <img src={logo} alt="ProconData" />
        </Link>
      </Header>
      <Layout>
        {sideContent ? <>
          {
            panelIsVisible ?
              <Sider width={300} className="bg-gray-200 p-4 relative h-lateral overflow-y-auto">
                <div onClick={() => setPanelIsVisible(!panelIsVisible)} className="w-6 h-8 rounded-l bg-primary text-white shadow-lg z-10 absolute cursor-pointer right-0 top-4 flex justify-center items-center">
                  <Icon name='arrow-left-s-line' />
                </div>
                {sideContent}
              </Sider>
              :
              <div onClick={() => setPanelIsVisible(!panelIsVisible)} className="w-6 h-8 rounded-r bg-primary text-white shadow-lg z-10 absolute cursor-pointer left-0 mt-4 flex justify-center items-center">
                <Icon name='arrow-right-s-line' />
              </div>
          } </>
          : null}
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
