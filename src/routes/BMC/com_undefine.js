import React, { useState, useEffect } from 'react';
import { Table, Button, Input, Modal } from 'antd';
import { EditOutlined, SearchOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Repaircom from '../BMC/com_repair';

export default function ComUndefine () {
  const [user, setUser] = useState([]);
  const [loading, setloading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [originalData, setOriginalData] = useState([]);
  const [modalRepair, setModalRepair] = useState(false);

  const getUsername = localStorage.getItem('Username');

  const getData = async () => {
    try{
        setloading(true);
        const getuser = await axios.get('http://XXXXXXXXXXXXXXXX');
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
      {
        title: 'Location',
        dataIndex: 'location',
        key: 'location',
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => 
            <div>
            <Button type="primary"  icon={<EditOutlined />} 
                    style={{ backgroundColor: 'green', borderColor: 'green', marginRight: 8 }}
                    onClick={() => showModalRepair(record)}>
                Edit
            </Button>
            
            <Button type="primary"  icon={<DeleteOutlined />} 
                    style={{ backgroundColor: 'red', borderColor: 'red' }}
                    onClick={() => showModalRemove(record)}>
                Remove
            </Button>
            </div>
      
      },
    
  ];

  const showModalRepair = (record) => {
    localStorage.setItem('UserID', record.user_id);
    localStorage.setItem('CaseBrand', record.case_brand);
    localStorage.setItem('CaseModel', record.case_model);
    localStorage.setItem('CaseService', record.case_service);
    localStorage.setItem('MoniterBrand', record.moniter_brand);
    localStorage.setItem('MoniterService', record.moniter_service);
    localStorage.setItem('MoniterSerial', record.moniter_serial);
    localStorage.setItem('KeyBrand', record.key_brand);
    localStorage.setItem('KeySerial', record.key_serial);
    localStorage.setItem('MouseBrand', record.mouse_brand);
    localStorage.setItem('MouseSerial', record.mouse_serial);
    localStorage.setItem('OS', record.os);
    localStorage.setItem('OfficeVersion', record.office_version);
    localStorage.setItem('OfficeKey', record.office_key);
    localStorage.setItem('OfficeAcc', record.office_acc);
    localStorage.setItem('OfficePass', record.office_pass);
    localStorage.setItem('Location', record.location);
    setModalRepair(true);
    console.log('case: ', record.case_service);
  };

  const closeModalRepair = () => {
    setModalRepair(false);
    getData();
  };

  const showModalRemove = async (record) => {
    const Data = {
      user_id: record.case_service,
      update_by: getUsername
    };
    const deleteComfirm = window.confirm("Do you want remove?");
    if (!deleteComfirm){
      return;
    }
    try{
      setloading(true);
      await axios.put(`http://XXXXXXXXXXXXXXXX/${record.case_service}`, Data);

      getData();

      setloading(false);
    }catch (error){
      setloading(false);
      console.log('remove err: ', error);
    }
  };

  return(
    <div>
            <div style={{ marginBottom: '1%', display: "flex", justifyContent: "space-between" }}>
              <div style={{ display: "flex" }}>
                <Input
                  placeholder="Service Tag"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  style={{ marginRight: '1%' }}
                />
                <Button type="primary" onClick={handleSearch} icon={<SearchOutlined />}>
                  Search
                </Button>
              </div>
            </div>

            <Table columns={columns} dataSource={user} rowKey="id"  />

            <Backdrop 
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
              <CircularProgress color="inherit" />
            </Backdrop>

            <Modal  width={1000}  open={modalRepair} centered footer={null} onCancel={closeModalRepair}>
                <h2 style={{textAlign: 'center'}}>Edit</h2> <br />
                
                <Repaircom/> 
        
            </Modal>

        </div>
  )
};
 
  
