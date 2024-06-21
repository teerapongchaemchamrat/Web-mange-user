import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import {
  DesktopOutlined,
  HomeOutlined ,
  UserOutlined,
  HddOutlined,
  HistoryOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';
import { Layout, Menu, theme, Button } from 'antd';
import CYFHomePage from '../routes/CYF/home';
import CYFAlluser from '../routes/CYF/user_all';
import CYFManageUser from '../routes/CYF/user_active';
import CYFAllCom from '../routes/CYF/com_all';
import CYFManageCom from '../routes/CYF/com_manage';
import CYFUserDeActive from '../routes/CYF/user_deactive';
import CYFUndefineCom from '../routes/CYF/com_undefine';

import BMCHomePage from '../routes/BMC/home';
import BMCAlluser from '../routes/BMC/user_all';
import BMCManageUser from '../routes/BMC/user_active';
import BMCAllCom from '../routes/BMC/com_all';
import BMCManageCom from '../routes/BMC/com_manage';
import BMCUserDeActive from '../routes/BMC/user_deactive';
import BMCUndefineCom from '../routes/BMC/com_undefine';

import BCCHomePage from '../routes/BCC/home';
import BCCAlluser from '../routes/BCC/user_all';
import BCCManageUser from '../routes/BCC/user_active';
import BCCAllCom from '../routes/BCC/com_all';
import BCCManageCom from '../routes/BCC/com_manage';
import BCCUserDeActive from '../routes/BCC/user_deactive';
import BCCUndefineCom from '../routes/BCC/com_undefine';

import BTCHomePage from '../routes/BTC/home';
import BTCAlluser from '../routes/BTC/user_all';
import BTCManageUser from '../routes/BTC/user_active';
import BTCAllCom from '../routes/BTC/com_all';
import BTCManageCom from '../routes/BTC/com_manage';
import BTCUserDeActive from '../routes/BTC/user_deactive';
import BTCUndefineCom from '../routes/BTC/com_undefine';

import TKGHomePage from '../routes/TKG/home';
import TKGAlluser from '../routes/TKG/user_all';
import TKGManageUser from '../routes/TKG/user_active';
import TKGAllCom from '../routes/TKG/com_all';
import TKGManageCom from '../routes/TKG/com_manage';
import TKGUserDeActive from '../routes/TKG/user_deactive';
import TKGUndefineCom from '../routes/TKG/com_undefine';

import GetHistoryLog from '../routes/History_log/getlog';
import GetComBroken from '../routes/Broken/com_broken';

const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem('CYF', 'sub1', <HddOutlined />,[
    getItem('CYF HOME', '1', <HomeOutlined />),
    getItem('User', 'sub2', <UserOutlined />, [
      getItem('All User', '2'),
      getItem('User Active', '3'),
      getItem('User DeActive', '26')
    ]),
    getItem('Computer', 'sub3', <DesktopOutlined />, [
      getItem('All Computer', '4'), 
      getItem('Com Manage', '5'),
      getItem('Com undefined', '27'),
    ]),
  ]),

  getItem('BMC', 'sub4', <HddOutlined />,[
    getItem('BMC HOME', '6', <HomeOutlined />),
    getItem('User', 'sub5', <UserOutlined />, [
      getItem('All User', '7'),
      getItem('User Active', '8'),
      getItem('User DeActive', '28')
    ]),
    getItem('Computer', 'sub6', <DesktopOutlined />, [
      getItem('All Computer', '9'), 
      getItem('Com Manage', '10'),
      getItem('Com undefined', '29'),
    ]),
  ]),

  getItem('BCC', 'sub7', <HddOutlined />,[
    getItem('BCC HOME', '11', <HomeOutlined />),
    getItem('User', 'sub8', <UserOutlined />, [
      getItem('All User', '12'),
      getItem('User Active', '13'),
      getItem('User DeActive', '30')
    ]),
    getItem('Computer', 'sub9', <DesktopOutlined />, [
      getItem('All Computer', '14'), 
      getItem('Com Manage', '15'),
      getItem('Com undefined', '31'),
    ]),
  ]),

  getItem('BTC', 'sub10', <HddOutlined />,[
    getItem('BTC HOME', '16', <HomeOutlined />),
    getItem('User', 'sub11', <UserOutlined />, [
      getItem('All User', '17'),
      getItem('User Active', '18'),
      getItem('User DeActive', '32')
    ]),
    getItem('Computer', 'sub12', <DesktopOutlined />, [
      getItem('All Computer', '19'), 
      getItem('Com Manage', '20'),
      getItem('Com undefined', '33'),
    ]),
  ]),

  getItem('TKG', 'sub13', <HddOutlined />,[
    getItem('TKG HOME', '21', <HomeOutlined />),
    getItem('User', 'sub14', <UserOutlined />, [
      getItem('All User', '22'),
      getItem('User Active', '23'),
      getItem('User DeActive', '34')
    ]),
    getItem('Computer', 'sub15', <DesktopOutlined />, [
      getItem('All Computer', '24'), 
      getItem('Com Manage', '25'),
      getItem('Com undefined', '35'),
    ]),
  ]),

  getItem('ประวัติการซ่อม', '36', <HistoryOutlined />),
  getItem('รายการคอมเสีย', '37', <ExclamationCircleOutlined />)
];

export default function LayoutPage () {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState('1');
  const { token: { colorBgContainer, borderRadiusLG },} = theme.useToken();
  
  const getUsername = localStorage.getItem('Username');
  const navigate = useNavigate();

  const renderContent = () => {
    switch (selectedKey) {
      case '1':
        return <CYFHomePage />;
      case '2':
        return <CYFAlluser />;
      case '3':
        return <CYFManageUser />;
      case '4':
        return <CYFAllCom />;
      case '5':
        return <CYFManageCom/>;
      case '26':
        return <CYFUserDeActive/>;
      case '27':
        return <CYFUndefineCom/>;
      case '6':
        return <BMCHomePage />;
      case '7':
        return <BMCAlluser />;
      case '8':
        return <BMCManageUser />;
      case '9':
        return <BMCAllCom />;
      case '10':
        return <BMCManageCom/>;
      case '28':
        return <BMCUserDeActive/>;
      case '29':
        return <BMCUndefineCom/>;
      case '11':
        return <BCCHomePage />;
      case '12':
        return <BCCAlluser />;
      case '13':
        return <BCCManageUser />;
      case '14':
        return <BCCAllCom />;
      case '15':
        return <BCCManageCom/>;
      case '30':
        return <BCCUserDeActive/>;
      case '31':
        return <BCCUndefineCom/>;
      case '16':
        return <BTCHomePage />;
      case '17':
        return <BTCAlluser />;
      case '18':
        return <BTCManageUser />;
      case '19':
        return <BTCAllCom />;
      case '20':
        return <BTCManageCom/>;
      case '32':
        return <BTCUserDeActive/>;
      case '33':
        return <BTCUndefineCom/>;
      case '21':
        return <TKGHomePage />;
      case '22':
        return <TKGAlluser />;
      case '23':
        return <TKGManageUser />;
      case '24':
        return <TKGAllCom />;
      case '25':
        return <TKGManageCom/>;
      case '34':
        return <TKGUserDeActive/>;
      case '35':
        return <TKGUndefineCom/>;
      case '36':
        return <GetHistoryLog/>;
      case '37':
        return <GetComBroken/>;
      // Add cases for other keys as needed
      default:
        return <div>ยังไม่ได้ทำจ้าาาาา</div>;
    }
  };

  const logout = () => {
    navigate('/');
  };
  
      return (
        <Layout
          style={{
            minHeight: '100vh',
          }}
        >
          <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}
              style={{
                padding: 0,
                background: colorBgContainer,
              }}>
              <div className="demo-logo-vertical" />
              <Menu  defaultSelectedKeys={['1']} 
                    mode="inline" items={items} 
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                      }} 
                    onSelect={({ key }) => setSelectedKey(key)}
                    />
          </Sider>
          <Layout>
            <Header
              style={{
                padding: '0 16px',
                background: colorBgContainer,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div style={{ flex: 1 }}></div>
              <div style={{ flex: 2, textAlign: 'center', fontSize: '30px' }}>
                <img src="image/logo_cyf.jpg" alt="logo" style={{width : '30px', height: '30px', marginRight: '2%'}}/>
                IT CHAIYOOT
              </div>
              <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                <span style={{ marginRight: '20px' }}>Admin:&nbsp;&nbsp;{getUsername}</span>
                <Button type="primary" danger onClick={logout}>Logout</Button>
              </div>
            </Header>
            <Content
              style={{
                margin: '20px 16px',
                padding: 24,
                minHeight: 700,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              {renderContent()}
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              IT Chaiyoot ©{new Date().getFullYear()} Created by IT-Teerapong
            </Footer>
          </Layout>
        </Layout>
      );
}