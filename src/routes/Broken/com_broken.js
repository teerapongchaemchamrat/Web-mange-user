import React, { useState, useEffect } from 'react';
import { Table, Button, Input, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';


export default function ComBroken (){

    const [com_data, setCom_data] = useState('');
    const [originalData, setOriginalData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [case_service, setCase_service] = useState('');
    const [company, setCompany] = useState('');
    
    const GetComBroken = async () => {
        try{
            setLoading(true);
            const getdata = await axios.get(`http://192.168.10.114:88/cyf/com/broken`);
            const res = getdata.data.map(item => ({
                ...item,
                case_service: item.case_service || '',
                moniter_service: item.moniter_service || '',
                key_serial: item.key_serial || '',
                mouse_serial: item.mouse_serial || '',
                os: item.os || '',
                office_version: item.office_version || '',
                location: item.location || '',
            }))

            setCom_data(res);
            setOriginalData(res);
            setLoading(false);
        }catch(error){
            console.log("Error get log: ", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
          await GetComBroken();
        };
        fetchData();
        
      }, []);

    const columns = [
        {
            title: 'Company',
            dataIndex: 'company',
            key: 'company',
        },
        {
            title: 'Location',
            dataIndex: 'location',
            key: 'location',
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
        },
        {
            title: 'Office version',
            dataIndex: 'office_version',
            key: 'office_version',
        },
    ];

    const filterData = (text) => {
        const filteredData = originalData.filter(u =>
          u.case_service.toLowerCase().includes(text.toLowerCase())
        );
        setCom_data(filteredData);
    };

    const handleSearch = () => {
        filterData(case_service);
    };

    const filterCompany = (text) => {
        const filteredData = originalData.filter(u =>
          u.company.toLowerCase().includes(text.toLowerCase())
        );
        setCom_data(filteredData);
    };

    const handleSearchCompany = () => {
        filterCompany(company);
    };

    return(
        <div>
            <div style={{marginBottom: '1%',display: "flex"}}>
              <label style={{marginTop: '0.25%'}}>Service Tag : &nbsp;</label>
                <div style={{width: '10%', marginRight: '1%',marginLeft: '1.6%'}}>
                    <Input placeholder="Service Tag" 
                           value={case_service}
                           onChange={(e) => setCase_service(e.target.value)}
                           />
                </div>
                
                    <Button type="primary" onClick={handleSearch} icon={<SearchOutlined />}>
                            Search
                    </Button>
              <div style={{ display: 'flex',marginRight: '1%',marginLeft: '5%'}}>      
                <label style={{marginTop: '2%'}}>Company : &nbsp;</label>
                
                <Select
                style={{ width: 150, marginLeft: '4%' }}
                value={company}
                onChange={(value) => setCompany(value)}
                options={[
                    { value: '', label: 'ALL' },
                    { value: 'CYF', label: 'CYF' },
                    { value: 'BMC', label: 'BMC' },
                    { value: 'BCC', label: 'BCC' },
                    { value: 'BTC', label: 'BTC' },
                    { value: 'TKG', label: 'TKG' },
                ]}
                />
             </div>

                <Button type="primary" onClick={handleSearchCompany} icon={<SearchOutlined />}>
                            Search
                </Button>
               
            </div>

            <Table columns={columns} dataSource={com_data} rowKey="id"  />

            <Backdrop 
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    )
}