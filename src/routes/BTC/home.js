import React, { useState, useEffect } from 'react';
import { Table, Button, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';


export default function Home (){
    const [user, setUser] = useState([]);
    const [loading, setloading] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [originalData, setOriginalData] = useState([]);
  
    const getData = async () => {
        try{
            setloading(true);
            const getuser = await axios.get('http://192.168.10.114:88/btc/user/result');
            const userData = getuser.data.map(item => ({
              ...item,
              first_name : item.first_name || '',
              last_name : item.last_name || '',
              company : item.company || '',
              dpt : item.dpt || '',
              location : item.location || '',
              case_service : item.case_service || '',
              case_model : item.case_model || '',
              os : item.os || ''
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

    // const filterData = (text) => {
    //   const filteredData = originalData.filter(u =>
    //     u.first_name.toLowerCase().includes(text.toLowerCase())
    //   );
    //   setUser(filteredData);
    // };
    const filterData = (text) => {
        if (!Array.isArray(originalData)) return;
        const filteredData = originalData.filter(u =>
            u.first_name.toLowerCase().includes(text.toLowerCase())
        );
        setUser(filteredData);
    };

    const handleSearch = () => {
      filterData(searchText);
    };

    const columns = [
        {
          title: 'Name',
          //dataIndex: 'first_name',
          key: 'first_name',
          render: (record) => `${record.first_name} ${record.last_name}`
        },
        {
          title: 'Company',
          dataIndex: 'company',
          key: 'company',
        },
        {
          title: 'Department',
          dataIndex: 'dpt',
          key: 'dpt',
        },
        {
          title: 'Location',
          dataIndex: 'location',
          key: 'location',
        },
        {
          title: 'Service Tag',
          key: 'case_service',
          dataIndex: 'case_service',
          
        },
        {
          title: 'Model',
          key: 'case_model',
          dataIndex: 'case_model',
        },
        {
          title: 'Operating System',
          key: 'os',
          dataIndex: 'os',
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

            <Table columns={columns} dataSource={user} />

            <Backdrop 
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
              <CircularProgress color="inherit" />
            </Backdrop>

        </div>
        
        
    )

};
