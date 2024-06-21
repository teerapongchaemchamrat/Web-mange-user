import React, { useState, useEffect } from 'react';
import { Table, Button, Input } from 'antd';
import { SearchOutlined, FolderAddOutlined } from '@ant-design/icons';
import axios from 'axios';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export default function UserDeActive () {
  const [user, setUser] = useState([]);
  const [loading, setloading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [originalData, setOriginalData] = useState([]);

  const getUsername = localStorage.getItem('Username');

  const getData = async () => {
    try{
        setloading(true);
        const getuser = await axios.get('http://192.168.10.114:88/cyf/user/deactive');
        const userData = getuser.data.map(item => ({
          ...item,
          first_name: item.first_name || '',
          last_name: item.last_name || '',
          dpt: item.dpt || '',
          email_id: item.email_id || '',
          email_pass: item.email_pass || '',
          infor_id: item.infor_id || '',
          infor_pass: item.infor_pass || '',
          dcc_id: item.dcc_id || '',
          dcc_pass: item.dcc_pass || '',
          com_id: item.com_id || '',
          com_pass: item.com_pass || '',
          print_id: item.print_id || '',
          print_pass: item.print_pass || '',
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
      u.first_name.toLowerCase().includes(text.toLowerCase())
    );
    setUser(filteredData);
  };

  const handleSearch = () => {
    filterData(searchText);
  };

  const RestoreUser = async(record) => {
    const Data = {
      user_id: record.user_id,
      update_by: getUsername
    };
    const deleteComfirm = window.confirm("Do you want restore user?");
    if (!deleteComfirm){
      return;
    }
    try{
      setloading(true);
      await axios.put(`http://192.168.10.114:88/cyf/user/restore/${record.user_id}`, Data);

      getData();

      setloading(false);
    }catch (error){
      setloading(false);
      console.log('remove err: ', error);
    }

  };

  const columns = [
    {
      title: 'First Name',
      dataIndex: 'first_name',
      key: 'first_name',
    },
    {
      title: 'Last Name',
      dataIndex: 'last_name',
      key: 'last_name',
    },
    {
      title: 'Department',
      dataIndex: 'dpt',
      key: 'dpt',
    },
    {
      title: 'Email',
      //dataIndex: 'email_id',
      key: 'email_id',
      render: (record) => `${record.email_id} / ${record.email_pass}`
    },
    {
      title: 'Infor',
      key: 'infor_id',
      render: (record) => `${record.infor_id} / ${record.infor_pass}`
    },
    {
      title: 'DCC',
      key: 'dcc_id',
      render: (record) => `${record.dcc_id} / ${record.dcc_pass}`
    },
    {
      title: 'Computer',
      key: 'com_id',
      render: (record) => `${record.com_id} / ${record.com_pass}`
    },
    {
      title: 'Printer',
      key: 'print_id',
      render: (record) => `${record.print_id} / ${record.print_pass}`
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => 
        <div>
          <Button type="primary"  icon={<FolderAddOutlined />} 
                  style={{ backgroundColor: '#34B6F7', borderColor: '#34B6F7', marginRight: 8 }}
                  onClick={() => RestoreUser(record)}
                  >
            Restore
          </Button>
         
        </div>
    },
  ];

  return(
    <div>
            <div style={{marginBottom: '1%',display: "flex"}}>
                <div style={{width: '10%', marginRight: '1%'}}>
                    <Input placeholder="First name" 
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
 
  