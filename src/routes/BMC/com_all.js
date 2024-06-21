import React, { useState, useEffect } from 'react';
import { Table, Button, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export default function Allcom () {
  const [user, setUser] = useState([]);
  const [loading, setloading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [originalData, setOriginalData] = useState([]);

  const getData = async () => {
    try{
        setloading(true);
        const getuser = await axios.get('http://192.168.10.114:88/bmc/com/get');
        const userData = getuser.data.map(item => ({
          ...item,
          case_service: item.case_service || '',
          moniter_service: item.moniter_service || '',
          key_serial: item.key_serial || '',
          mouse_serial: item.mouse_serial || '',
          os: item.os || '',
          office_version: item.office_version || '',
          location: item.location || '',
        }));
        setUser(userData);
        setOriginalData(userData);
        setloading(false);
    }catch(error){
        console.error("Error getData:", error);
        setloading(false);
    }finally{
        setloading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getData();
    };
    fetchData();
    
  }, []);

  const filterData = (text) => {
    const filteredData = originalData.filter(u =>
      u.case_service.toLowerCase().includes(text.toLowerCase())
    );
    setUser(filteredData);
  };

  const handleSearch = () => {
    filterData(searchText);
  };

  const columns = [
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
      //render: (record) => `${record.dcc_id} / ${record.dcc_pass}`
    },
    {
      title: 'Case',
      dataIndex: 'case_service',
      key: 'case_service',
    },
    {
      title: 'Moniter',
      dataIndex: 'moniter_service',
      key: 'moniter_service',
    },
    {
      title: 'Keyboard',
      dataIndex: 'key_serial',
      key: 'key_serial',
    },
    {
        title: 'Mouse',
        dataIndex: 'mouse_serial',
        key: 'mouse_serial',
    },
    {
      title: 'Operating System',
      dataIndex: 'os',
      key: 'os',
      //render: (record) => `${record.email_id} / ${record.email_pass}`
    },
    {
      title: 'Office version',
      dataIndex: 'office_version',
      key: 'office_version',
      //render: (record) => `${record.infor_id} / ${record.infor_pass}`
    },
    {
      title: 'Office Key',
      dataIndex: 'office_key',
      key: 'office_key',
    },

  ];

  return(
    <div>
            <div style={{marginBottom: '1%',display: "flex"}}>
                <div style={{width: '10%', marginRight: '1%'}}>
                    <Input placeholder="Service Tag" 
                           value={searchText}
                           onChange={(e) => setSearchText(e.target.value)} />
                </div>
                <Button type="primary" onClick={handleSearch} icon={<SearchOutlined />}>
                    Search
                </Button>
            </div>

            <Table columns={columns} dataSource={user} rowKey="id"  />

            <Backdrop 
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
              <CircularProgress color="inherit" />
            </Backdrop>

        </div>
  )
};
 
  