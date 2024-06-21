import React, { useState, useEffect } from 'react';
//import { useNavigate } from "react-router-dom";
import { Table, Button, Input, Modal } from 'antd';
import { UserAddOutlined , EditOutlined, SearchOutlined, DeleteOutlined, FileDoneOutlined } from '@ant-design/icons';
import axios from 'axios';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Adduser from './user_add';
import Edituser from './user_edit';
//import UserFrom from '../../../src/user_from.pdf';
// import { PDFDocument } from 'pdf-lib';
// import { saveAs } from 'file-saver';
import { Document, Page, Text, View, StyleSheet, pdf, Image } from '@react-pdf/renderer';

export default function ManageUser () {
  const [user, setUser] = useState([]);
  const [loading, setloading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [originalData, setOriginalData] = useState([]);
  const [modalAdd, setModalAdd] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);

  const getUsername = localStorage.getItem('Username');
  //const navigate = useNavigate();

  const getData = async () => {
    try{
        setloading(true);
        const getuser = await axios.get('http://XXXXXXXXXXXXXXXX');
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

  const columns = [
    {
      title: 'ID',
      dataIndex: 'user_id',
      key: 'user_id',
    },
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
      title: 'Action',
      key: 'action',
      render: (text, record) => 
        <div>
          <Button type="primary"  icon={<EditOutlined />} 
                  style={{ backgroundColor: 'green', borderColor: 'green', marginRight: 8 }}
                  onClick={() => showModalEdit(record)}>
            Edit
          </Button>
          <Button type="primary"  icon={<FileDoneOutlined />} 
                  style={{ backgroundColor: '#34B6F7', borderColor: '#34B6F7', marginRight: 8 }}
                  //href={UserFrom} target="_blank"
                  onClick={() => callreport(record)}
                  >
            Print
          </Button>
          <Button type="primary"  icon={<DeleteOutlined />} 
                  style={{ backgroundColor: 'red', borderColor: 'red', marginRight: 8 }}
                  onClick={() => showModalRemove(record)}>
            Remove
          </Button>
        
        </div>
      
    },
    
  ];

  const showModalAdd = () => {
    setModalAdd(true);
  };

  const showModalEdit = (record) => {
    localStorage.setItem('UserID', record.user_id);
    localStorage.setItem('Firstname', record.first_name);
    localStorage.setItem('Lastname', record.last_name);
    localStorage.setItem('Dpt', record.dpt);
    localStorage.setItem('Email', record.email_id);
    localStorage.setItem('Emailpass', record.email_pass);
    localStorage.setItem('Instead', record.instead);
    localStorage.setItem('ComID', record.com_id);
    localStorage.setItem('Compass', record.com_pass);
    localStorage.setItem('InforID', record.infor_id);
    localStorage.setItem('Inforpass', record.infor_pass);
    localStorage.setItem('DccID', record.dcc_id);
    localStorage.setItem('Dccpass', record.dcc_pass);
    localStorage.setItem('PrintID', record.print_id);
    localStorage.setItem('Printpass', record.print_pass);
    setModalEdit(true);
    console.log('UserID: ', record.user_id);
  };

  const showModalRemove = async (record) => {
    const Data = {
      user_id: record.user_id,
      update_by: getUsername
    };
    const deleteComfirm = window.confirm("Do you want remove?");
    if (!deleteComfirm){
      return;
    }
    try{
      setloading(true);
      await axios.put(`http://XXXXXXXXXXXXXXXX/${record.user_id}`, Data);

      getData();

      setloading(false);
    }catch (error){
      setloading(false);
      console.log('remove err: ', error);
    }
  };

  const closeModalEdit = () => {
    setModalEdit(false);
    getData();
  };

  const closeModalAdd = () => {
    setModalAdd(false);
    getData();
  };

  const callreport = async (record) => {
    
    const content = (
      <Document>
        <Page size="A4" style={styles.page}>
          
          <View style={styles.section}>
            {/* for user */}
            <div style={{position: 'absolute',fontSize: '12px', marginTop: '14.3%', marginLeft: '20%'}}>
              <Text>{record.first_name} {record.last_name}</Text>
            </div>
            <div style={{position: 'absolute',fontSize: '12px', marginTop: '14.3%', marginLeft: '67%'}}>
              <Text>{record.dpt} </Text>
            </div>
            <div style={{position: 'absolute',fontSize: '12px', marginTop: '22.7%', marginLeft: '20%'}}>
              <Text>{record.com_id} </Text>
            </div>
            <div style={{position: 'absolute',fontSize: '12px', marginTop: '26.7%', marginLeft: '20%'}}>
              <Text>{record.com_pass} </Text>
            </div>
            <div style={{position: 'absolute',fontSize: '12px', marginTop: '35%', marginLeft: '20%'}}>
              <Text>{record.email_id} </Text>
            </div>
            <div style={{position: 'absolute',fontSize: '12px', marginTop: '39%', marginLeft: '20%'}}>
              <Text>{record.email_pass} </Text>
            </div>
            <div style={{position: 'absolute',fontSize: '12px', marginTop: '49.5%', marginLeft: '20%'}}>
              <Text>{record.dcc_id} </Text>
            </div>
            <div style={{position: 'absolute',fontSize: '12px', marginTop: '53.5%', marginLeft: '20%'}}>
              <Text>{record.dcc_pass} </Text>
            </div>
            <div style={{position: 'absolute',fontSize: '12px', marginTop: '49.5%', marginLeft: '68%'}}>
              <Text>{record.infor_id} </Text>
            </div>
            <div style={{position: 'absolute',fontSize: '12px', marginTop: '53.5%', marginLeft: '68%'}}>
              <Text>{record.infor_pass} </Text>
            </div>
            <div style={{position: 'absolute',fontSize: '12px', marginTop: '61.7%', marginLeft: '20%'}}>
              <Text>{record.print_id} / {record.print_pass} </Text>
            </div>

            {/* for staff */}
            <div style={{position: 'absolute',fontSize: '12px', marginTop: '87.2%', marginLeft: '20%'}}>
              <Text>{record.first_name} {record.last_name}</Text>
            </div>
            <div style={{position: 'absolute',fontSize: '12px', marginTop: '87.2%', marginLeft: '67%'}}>
              <Text>{record.dpt} </Text>
            </div>
            <div style={{position: 'absolute',fontSize: '12px', marginTop: '95.2%', marginLeft: '20%'}}>
              <Text>{record.com_id} </Text>
            </div>
            <div style={{position: 'absolute',fontSize: '12px', marginTop: '99.4%', marginLeft: '20%'}}>
              <Text>{record.com_pass} </Text>
            </div>
            <div style={{position: 'absolute',fontSize: '12px', marginTop: '107.7%', marginLeft: '20%'}}>
              <Text>{record.email_id} </Text>
            </div>
            <div style={{position: 'absolute',fontSize: '12px', marginTop: '111.7%', marginLeft: '20%'}}>
              <Text>{record.email_pass} </Text>
            </div>
            <div style={{position: 'absolute',fontSize: '12px', marginTop: '122%', marginLeft: '20%'}}>
              <Text>{record.dcc_id} </Text>
            </div>
            <div style={{position: 'absolute',fontSize: '12px', marginTop: '126.3%', marginLeft: '20%'}}>
              <Text>{record.dcc_pass} </Text>
            </div>
            <div style={{position: 'absolute',fontSize: '12px', marginTop: '122%', marginLeft: '68%'}}>
              <Text>{record.infor_id} </Text>
            </div>
            <div style={{position: 'absolute',fontSize: '12px', marginTop: '126.3%', marginLeft: '68%'}}>
              <Text>{record.infor_pass} </Text>
            </div>
            <div style={{position: 'absolute',fontSize: '12px', marginTop: '134.5%', marginLeft: '13%'}}>
              <Text>{record.print_id} </Text>
            </div>
            <div style={{position: 'absolute',fontSize: '12px', marginTop: '134.5%', marginLeft: '37%'}}>
              <Text>{record.print_pass} </Text>
            </div>
          </View>
          <Image src="/image/CYF_userform.jpg" style={styles.backgroundImage} />
        </Page>
      </Document>
    );

    // Example of how to download PDF
    const blob = await pdf(content).toBlob();
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  };


  return(
    <div>
            <div style={{ marginBottom: '0.5%', display: "flex", justifyContent: "space-between" }}>
              <div style={{ display: "flex" }}>
                <Input
                  placeholder="First name"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  style={{ marginRight: '1%' }}
                />
                <Button type="primary" onClick={handleSearch} icon={<SearchOutlined />}>
                  Search
                </Button>
              </div>
              <Button type="primary" icon={<UserAddOutlined />} onClick={showModalAdd} >
                Add
              </Button>
            </div>

            <Table columns={columns} dataSource={user} rowKey="id"  />
             
            <Backdrop 
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
              <CircularProgress color="inherit" />
            </Backdrop>

            <Modal  width={700}  open={modalAdd} centered footer={null} onCancel={closeModalAdd}>
                <h2 style={{textAlign: 'center'}}>CYF NEW USER</h2> <br />
                
                <Adduser/>
        
            </Modal>

            <Modal  width={700}  open={modalEdit} centered footer={null} onCancel={closeModalEdit}>
                <h2 style={{textAlign: 'center'}}>Edit USER</h2> <br />
                
                <Edituser/>
        
            </Modal>

        </div>
  )
};

const styles = StyleSheet.create({
  page: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});
 
  
