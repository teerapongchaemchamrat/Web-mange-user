import React, { useState, useEffect } from 'react';
import { Table, Button, Input, Modal, Select, DatePicker, Space, message } from 'antd';
import { UserAddOutlined , EditOutlined, SearchOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Addcom from '../TKG/com_add';
import Repaircom from '../TKG/com_repair';

const { TextArea } = Input;

export default function ManageCom () {
  const [user, setUser] = useState([]);
  const [loading, setloading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [originalData, setOriginalData] = useState([]);
  const [modalAdd, setModalAdd] = useState(false); 
  const [modalRepair, setModalRepair] = useState(false);
  const [modalLog, setModalLog] = useState(false);

  const [case_service, setCase_service] = useState('');
  const [doc_num, setDoc_num] = useState('');
  const [type, setType] = useState('');
  const [problem, setProblem] = useState('');
  const [cause, setCause] = useState('');
  const [solution, setSolution] = useState('');
  const [moniter_brand_old, setMoniter_brand_old] = useState('');
  const [moniter_serial_old, setMoniter_serial_old] = useState('');
  const [moniter_service_old, setMoniter_service_old] = useState('');
  const [key_brand_old, setKey_brand_old] = useState('');
  const [key_serial_old, setKey_serial_old] = useState('');
  const [mouse_brand_old, setMouse_brand_old] = useState('');
  const [mouse_serial_old, setMouse_serial_old] = useState('');
  const [moniter_brand_new, setMoniter_brand_new] = useState('');
  const [moniter_serial_new, setMoniter_serial_new] = useState('');
  const [moniter_service_new, setMoniter_service_new] = useState('');
  const [key_brand_new, setKey_brand_new] = useState('');
  const [key_serial_new, setKey_serial_new] = useState('');
  const [mouse_brand_new, setMouse_brand_new] = useState('');
  const [mouse_serial_new, setMouse_serial_new] = useState('');
  const [user_req, setUser_req] = useState('');
  const [date_req, setDate_req] = useState('');
  const [user_it, setUser_it] = useState('');
  const [date_complete, setDate_complete] = useState('');
  const [hardware, setHardware] = useState('');

  const getUsername = localStorage.getItem('Username');

  const getData = async () => {
    try{
        setloading(true);
        const getuser = await axios.get('http://192.168.10.114:88/tkg/com/get');
        const userData = getuser.data.map(item => ({
          ...item,
          user_id : item.user_id || '',
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
            <Button type="primary"  icon={<EditOutlined />} 
                    style={{ backgroundColor: 'green', borderColor: 'green', marginRight: 8 }}
                    onClick={() => showModalLog(record)}>
                ลงประวัติซ่อม
            </Button>
            
            <Button type="primary"  icon={<DeleteOutlined />} 
                    style={{ backgroundColor: 'red', borderColor: 'red' }}
                    onClick={() => showModalRemove(record)}>
                Remove
            </Button>
            </div>
      },
    
  ];

  const showModalAdd = () => {
    setModalAdd(true);
  };

  const closeModalAdd = () => {
    setModalAdd(false);
    getData();
  };

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

  const showModalLog = (record) => {
    setCase_service(record.case_service);
    setMoniter_brand_old(record.moniter_brand);
    setMoniter_serial_old(record.moniter_serial);
    setMoniter_service_old(record.moniter_service);

    setKey_brand_old(record.key_brand);
    setKey_serial_old(record.key_serial);

    setMouse_brand_old(record.mouse_brand);
    setMouse_serial_old(record.mouse_serial);
    setModalLog(true);
  };

  const closeModalLog = () => {
    setModalLog(false);
    //getData();
  };

  const onChangeDate_req = (date, dateString) => {
    setDate_req(dateString);
    //console.log(dateString);
  };

  const onChangeDate_complete = (date, dateString) => {
    setDate_complete(dateString);
    //console.log(dateString);
  };

  const handleOkLog = async(e) => {
    e.preventDefault();

    const updateMoniter = {
      case_service: case_service || null,
      moniter_brand: moniter_brand_new || null,
      moniter_service: moniter_service_new || null,
      moniter_serial: moniter_serial_new || null,
      update_by: getUsername
    };

    const updateKeyboard = {
      case_service: case_service || null,
      key_brand: key_brand_new || null,
      key_serial: key_serial_new || null,
      update_by: getUsername
    };

    const updateMouse = {
      case_service: case_service || null,
      mouse_brand: mouse_brand_new || null,
      mouse_serial: mouse_serial_new || null,
      update_by: getUsername
    }

    const LogSoftware = {
      case_service: case_service || null,
      doc_num: doc_num || null,
      type: type || null,
      problem: problem || null,
      cause: cause || null,
      solution: solution || null,
      moniter_brand_old:  null,
      moniter_service_old:  null,
      moniter_serial_old:  null,
      key_brand_old: null,
      key_serial_old: null,
      mouse_brand_old:  null,
      mouse_serial_old: null,
      moniter_brand_new: null,
      moniter_service_new: null,
      moniter_serial_new: null,
      key_brand_new: null,
      key_serial_new: null,
      mouse_brand_new: null,
      mouse_serial_new: null,
      user_req: user_req || null,
      date_req: date_req || null,
      user_it: user_it || null,
      date_complete: date_complete || null
    };

    const LogHardware_moniter = {
      case_service: case_service || null,
      doc_num: doc_num || null,
      type: type || null,
      problem: problem || null,
      cause: cause || null,
      solution: solution || null,
      moniter_brand_old: moniter_brand_old || null,
      moniter_service_old: moniter_service_old || null,
      moniter_serial_old: moniter_serial_old || null,
      key_brand_old: null,
      key_serial_old: null,
      mouse_brand_old:  null,
      mouse_serial_old: null,
      moniter_brand_new: moniter_brand_new || null,
      moniter_service_new: moniter_service_new || null,
      moniter_serial_new: moniter_serial_new || null,
      key_brand_new: null,
      key_serial_new: null,
      mouse_brand_new: null,
      mouse_serial_new: null,
      user_req: user_req || null,
      date_req: date_req || null,
      user_it: user_it || null,
      date_complete: date_complete || null
    };

    const LogHardware_keyboard = {
      case_service: case_service || null,
      doc_num: doc_num || null,
      type: type || null,
      problem: problem || null,
      cause: cause || null,
      solution: solution || null,
      moniter_brand_old: null,
      moniter_service_old: null,
      moniter_serial_old:  null,
      key_brand_old: key_brand_old || null,
      key_serial_old: key_serial_old || null,
      mouse_brand_old:  null,
      mouse_serial_old: null,
      moniter_brand_new: null,
      moniter_service_new: null,
      moniter_serial_new: null,
      key_brand_new: key_brand_new || null,
      key_serial_new: key_serial_new || null,
      mouse_brand_new: null,
      mouse_serial_new: null,
      user_req: user_req || null,
      date_req: date_req || null,
      user_it: user_it || null,
      date_complete: date_complete || null
    };

    const LogHardware_mouse = {
      case_service: case_service || null,
      doc_num: doc_num || null,
      type: type || null,
      problem: problem || null,
      cause: cause || null,
      solution: solution || null,
      moniter_brand_old: null,
      moniter_service_old: null,
      moniter_serial_old:  null,
      key_brand_old: null,
      key_serial_old: null,
      mouse_brand_old:  mouse_brand_old || null,
      mouse_serial_old: mouse_serial_old || null,
      moniter_brand_new: null,
      moniter_service_new: null,
      moniter_serial_new: null,
      key_brand_new: null,
      key_serial_new: null,
      mouse_brand_new: mouse_brand_new || null,
      mouse_serial_new: mouse_serial_new || null,
      user_req: user_req || null,
      date_req: date_req || null,
      user_it: user_it || null,
      date_complete: date_complete || null
    };
    //console.log('userData:', JSON.stringify(LogData, null, 2));
  
    if(!type || !doc_num || !problem || !cause || ! solution || !user_req || !date_req || !user_it || !date_complete){
      return message.error('โปรดกรอกข้อมูลให้ครบ');
    }else {
      try{
        setloading(true);
        //await axios.put(``);
        await axios.post(`http://192.168.10.114:88/tkg/com/repair/log`, LogSoftware);
        setModalLog(false);
        setloading(false);
        message.success('Processing complete!');
      }catch(error) {
        console.log("log post error: ", error);
        message.error('Processing fail');
        setloading(false);
      }
    }
    if(type === 'Hardware' && hardware === 'Moniter'){
      try{
        setloading(true);
        await axios.put(`http://192.168.10.114:88/tkg/com/update/moniter/${case_service}`, updateMoniter);
        //console.log('updateKeyboard:', JSON.stringify(updateMoniter, null, 2));
        await axios.post(`http://192.168.10.114:88/tkg/com/repair/log`, LogHardware_moniter);
        setModalLog(false);
        setloading(false);
        message.success('Processing complete!');
      }catch(error) {
        console.log("log moniter post error: ", error);
        message.error('Processing fail');
        setloading(false);
      }
    }
    if(type === 'Hardware' && hardware === 'Keyboard'){
      try{
        setloading(true);
        await axios.put(`http://192.168.10.114:88/tkg/com/update/keyboard/${case_service}`, updateKeyboard);
        //console.log('updateKeyboard:', JSON.stringify(updateKeyboard, null, 2));
        await axios.post(`http://192.168.10.114:88/tkg/com/repair/log`, LogHardware_keyboard);
        setModalLog(false);
        setloading(false);
        message.success('Processing complete!');
      }catch(error){
        console.log("log keyboard post error: ", error);
        message.error('Processing fail');
        setloading(false);
      }
    }
    if(type === 'Hardware' && hardware === 'Mouse'){
      try{
        setloading(true);
        await axios.put(`http://192.168.10.114:88/tkg/com/update/mouse/${case_service}`, updateMouse);
        //console.log('updateMouse:', JSON.stringify(updateMouse, null, 2));
        await axios.post(`http://192.168.10.114:88/tkg/com/repair/log`, LogHardware_mouse);
        setModalLog(false);
        setloading(false);
        message.success('Processing complete!');
      }catch(error){
        console.log("log mouse post error: ", error);
        message.error('Processing fail');
        setloading(false);
      }
    }

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
      await axios.put(`http://192.168.10.114:88/cyf/com/remove/${record.case_service}`, Data);

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

            <Modal  width={1000}  open={modalAdd} centered footer={null} onCancel={closeModalAdd}>
                <h2 style={{textAlign: 'center'}}>NEW COMPUTER</h2> <br />
                
                <Addcom/>
        
            </Modal>

            <Modal  width={1000}  open={modalRepair} centered footer={null} onCancel={closeModalRepair}>
                <h2 style={{textAlign: 'center'}}>Edit</h2> <br />
                
                <Repaircom/> 
        
            </Modal>

            <Modal  width={1000}  open={modalLog} onOk={handleOkLog} centered  onCancel={closeModalLog}>
              <div style={{marginLeft: '6%'}} >
                <h2 style={{textAlign: 'center'}}>ลงประวัติการซ่อม</h2> <br /><br />
                <div style={{ display: 'flex', }}>
                  <label style={{color: 'black' }}>เลขที่ใบแจ้งซ่อม</label>
                  <div style={{ width: '250', marginLeft: '6.7%', marginTop: '-0.5%'}}>
                    <Input id="standard-basic" 
                            value={doc_num}
                            onChange={(e) => setDoc_num(e.target.value)} />
                  </div>
                </div>
                <br />

                <label style={{color: 'black' }}>สาเหตุหลักของปัญหา</label>
                <Select
                  style={{ width: 150, marginLeft: '4%' }}
                  value={type}
                  onChange={(value) => setType(value)}
                  options={[
                    { value: 'Hardware', label: 'Hardware' },
                    { value: 'Software', label: 'Software' },
                    { value: 'Network', label: 'Network' },
                    { value: 'User', label: 'User' },
                    { value: 'ให้คำปรึกษา', label: 'ให้คำปรึกษา' },
                    { value: 'อื่นๆ', label: 'อื่นๆ' },
                  ]}
                /><br />

                <div style={{ display: 'flex', marginTop: '2%' }}>
   
                  <label style={{color: 'black' }}>ปัญหาที่เกิดขึ้น</label>
                  <div style={{ width: '700px', marginLeft: '8%', marginTop: '-0.5%'}}>
                    <TextArea id="standard-basic" placeholder='...' 
                              value={problem}
                              onChange={(e) => setProblem(e.target.value)} 
                              />
                  </div>
                </div><br />
                  
                <div style={{ display: 'flex', marginTop: '0.5%' }}>
   
                  <label style={{color: 'black' }}>สาเหตุของปัญหา</label>
                  <div style={{ width: '700px', marginLeft: '6.7%', marginTop: '-0.5%'}}>
                    <TextArea id="standard-basic" placeholder='...' 
                              value={cause}
                              onChange={(e) => setCause(e.target.value)} 
                              />
                  </div>
                </div><br />

                <div style={{ display: 'flex', marginTop: '0.5%' }}>
   
                  <label style={{color: 'black' }}>วิธีแก้ไข / ป้องกัน</label>
                  <div style={{ width: '700px', marginLeft: '6.5%', marginTop: '-0.5%'}}>
                    <TextArea id="standard-basic" placeholder='...' 
                              value={solution}
                              onChange={(e) => setSolution(e.target.value)} 
                              />
                  </div>
                </div><br />

                <div style={{ display: 'flex', }}>
                  <label style={{color: 'black' }}>ผู้ขอดำเนินการ</label>
                  <div style={{ width: '250', marginLeft: '8.3%', marginTop: '-0.5%'}}>
                    <Input id="standard-basic" 
                            value={user_req}
                            onChange={(e) => setUser_req(e.target.value)} 
                    
                            />
                  </div>
                </div><br />

                <div style={{ display: 'flex', }}>
                  <label style={{color: 'black' }}>วันที่ขอให้ดำเนินการ</label>
                  <div style={{ width: '250', marginLeft: '5%', marginTop: '-0.5%'}}>
                  <Space direction="vertical">
                    <DatePicker onChange={onChangeDate_req} />
                  </Space>
                  </div>
                </div><br />

                <div style={{ display: 'flex', }}>
                  <label style={{color: 'black' }}>ผู้ดำเนินการ (IT)</label>
                  <div style={{ width: '250', marginLeft: '7.8%', marginTop: '-0.5%'}}>
                    <Input id="standard-basic" 
                            value={user_it}
                            onChange={(e) => setUser_it(e.target.value)} 
                            
                            />
                  </div>
                </div><br />

                <div style={{ display: 'flex', }}>
                  <label style={{color: 'black' }}>วันที่ดำเนินการเสร็จ</label>
                  <div style={{ width: '250', marginLeft: '5.8%', marginTop: '-0.5%'}}>
                  <Space direction="vertical">
                    <DatePicker onChange={onChangeDate_complete} />
                  </Space>
                  </div>
                </div><br />

                {(type === 'Hardware') && (
                  <div>
                    <label style={{color: 'black' }}>เปลี่ยนอุปกรณ์ (ถ้ามี)</label>
                    <Select
                      //defaultValue="DELL"
                      style={{ width: 150, marginLeft: '5.1%', marginBottom: '0.5%'}}
                      value={hardware}
                      onChange={(value) => setHardware(value)}
                      options={[
                        { value: 'Moniter', label: 'Moniter' },
                        { value: 'Keyboard', label: 'Keyboard' },
                        { value: 'Mouse', label: 'Mouse' },
                      ]}
                    /><br />
                  </div>
                )}

                {(type === 'Hardware' && hardware === 'Moniter') && (
                  <div>
                    <div style={{display: 'flex', marginTop: '2%'}}>
                      <label style={{color: 'black' }}>Moniter Brand</label>
                        <div style={{ width: '250', marginLeft: '8%', marginTop: '-0.5%'}}>
                          <Select
                            //defaultValue="DELL"
                            style={{ width: 150, marginLeft: '1%' }}
                            value={moniter_brand_new}
                            onChange={(value) => setMoniter_brand_new(value)}
                            options={[
                              { value: 'DELL', label: 'DELL' },
                              { value: 'LOGITECT', label: 'LOGITECT' },
                              { value: 'HP', label: 'HP' },
                              { value: 'ACER', label: 'ACER' },
                              { value: 'LENOVO', label: 'LENOVO' },
                              { value: 'ASUS', label: 'ASUS' },
                            ]}
                          />
                        </div>
                        
                    </div><br />
                    <div style={{display: 'flex'}}>
                      <label style={{color: 'black' }}>Moniter Serial</label>
                      <div style={{ width: '300px', marginLeft: '8.5%', marginTop: '-0.5%'}}>
                        <Input id="standard-basic" 
                                value={moniter_serial_new}
                                onChange={(e) => setMoniter_serial_new(e.target.value)} 
                                />
                      </div>
                    </div><br />

                    <div style={{display: 'flex'}}>
                      <label style={{color: 'black' }}>Moniter Service Tag</label>
                      <div style={{ width: '300px', marginLeft: '5%', marginTop: '-0.5%'}}>
                        <Input id="standard-basic" 
                                value={moniter_service_new}
                                onChange={(e) => setMoniter_service_new(e.target.value)} 
                                />
                      </div>
                    </div>
                    <br />

                  </div>
                )}

                {(type === 'Hardware' && hardware === 'Keyboard') && (
                  <div>
                    <div style={{display: 'flex', marginTop: '2%'}}>
                      <label style={{color: 'black' }}>Keyboard Brand</label>
                        <div style={{ width: '250', marginLeft: '7%', marginTop: '-0.5%'}}>
                          <Select
                            //defaultValue="DELL"
                            style={{ width: 150, marginLeft: '1%' }}
                            value={key_brand_new}
                            onChange={(value) => setKey_brand_new(value)}
                            options={[
                              { value: 'DELL', label: 'DELL' },
                              { value: 'LOGITECT', label: 'LOGITECT' },
                              { value: 'HP', label: 'HP' },
                              { value: 'ACER', label: 'ACER' },
                              { value: 'LENOVO', label: 'LENOVO' },
                              { value: 'ASUS', label: 'ASUS' },
                            ]}
                          />
                        </div>
                        
                    </div><br />
                    <div style={{display: 'flex'}}>
                      <label style={{color: 'black' }}>Keyboard Serial</label>
                      <div style={{ width: '300px', marginLeft: '7.5%', marginTop: '-0.5%'}}>
                        <Input id="standard-basic" 
                                value={key_serial_new}
                                onChange={(e) => setKey_serial_new(e.target.value)} 
                                />
                      </div>
                    </div>
                    <br />             
                  </div>
                )}

                {(type === 'Hardware' && hardware === 'Mouse') && (
                  <div>
                    <div style={{display: 'flex', marginTop: '2%'}}>
                      <label style={{color: 'black' }}>Mouse Brand</label>
                        <div style={{ width: '250', marginLeft: '9%', marginTop: '-0.5%'}}>
                          <Select
                            //defaultValue="DELL"
                            style={{ width: 150, marginLeft: '1%' }}
                            value={mouse_brand_new}
                            onChange={(value) => setMouse_brand_new(value)}
                            options={[
                              { value: 'DELL', label: 'DELL' },
                              { value: 'LOGITECT', label: 'LOGITECT' },
                              { value: 'HP', label: 'HP' },
                              { value: 'ACER', label: 'ACER' },
                              { value: 'LENOVO', label: 'LENOVO' },
                              { value: 'ASUS', label: 'ASUS' },
                            ]}
                          />
                        </div>
                        
                    </div><br />
                    <div style={{display: 'flex'}}>
                      <label style={{color: 'black' }}>Mouse Serial</label>
                      <div style={{ width: '300px', marginLeft: '9.5%', marginTop: '-0.5%'}}>
                        <Input id="standard-basic" 
                                value={mouse_serial_new}
                                onChange={(e) => setMouse_serial_new(e.target.value)} 
                                />
                      </div>
                    </div>
                    <br />
                  </div>
                )}
              
                
              </div>   
            </Modal>

        </div>
  )
};
 
  