import React , { useState } from 'react';
import { Button, message, Select, Steps, theme, Input } from 'antd';
import axios from 'axios';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
//import userEvent from '@testing-library/user-event';

export default function Addcom () {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const [loading, setloading] = useState(false);

  const [employeeID, setEmployeeID] = useState('');
  const [case_brand, setCase_brand] = useState('');
  const [case_model, setCase_model] = useState('');
  const [case_service, setCase_service] = useState('');
  const [moniter_brand, setMoniter_brand] = useState('');
  const [moniter_service, setMoniter_service] = useState('');
  const [moniter_serial, setMoniter_serial] = useState('');

  const [key_brand, setKey_brand] = useState('');
  const [key_serial, setKey_serial] = useState('');
  const [mouse_brand, setMouse_brand] = useState('');
  const [mouse_serial, setMouse_serial] = useState('');
  const [os, setOs] = useState('');
  const [location, setLocation] = useState('');

  const [office_version, setOffice_version] = useState('');
  const [office_key, setOffice_key] = useState('');
  const [office_acc, setOffice_acc] = useState('');
  const [office_pass, setOffice_pass] = useState('');


  const getUsername = localStorage.getItem('Username');
  
  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    if(current === 0){
      setCurrent(current);
    }else if (current > 0){
      setCurrent(current - 1);
    }

  };

  const steps = [
    {
      title: 'Case',
      content: (
        <div style={{ marginTop: '-6rem', marginBottom: '-6rem', marginLeft: '1rem'}}>
          <div style={{display: 'flex', marginLeft: '30%' }}>
            <div style={{ marginBottom: '-14rem', paddingTop: '1px', paddingRight: '55px' }}>
              <label style={{color: 'black' }}>Employee ID</label>
            </div>
            <div style={{width: '250px'}} >
            <Input id="standard-basic" placeholder='employee ID' 
                       value={employeeID}
                       onChange={(e) => setEmployeeID(e.target.value)} />
            </div>
          </div>

          <div style={{display: 'flex',marginTop: '-12rem', marginLeft: '30%' }}>
            <div style={{ marginBottom: '-14rem', paddingTop: '1px', paddingRight: '95px' }}>
              <label style={{color: 'black' }}>Brand</label>
            </div>
            <div  >
            <Select
              defaultValue="DELL"
              style={{ width: 250 }}
              value={case_brand}
              onChange={(value) => setCase_brand(value)}
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
          </div>

          <div style={{display: 'flex',marginTop: '-12rem', marginLeft: '30%' }}>
            <div style={{ marginBottom: '-14rem', paddingTop: '1px', paddingRight: '64px' }}>
              <label style={{color: 'black' }}>Service Tag</label>
            </div>
            <div style={{width: '250px'}} >
            <Input id="standard-basic" placeholder='case service' 
                       value={case_service}
                       onChange={(e) => setCase_service(e.target.value)} />
            </div>
          </div>

          <div style={{display: 'flex',marginTop: '-12rem', marginLeft: '30%' }}>
            <div style={{ marginBottom: '-14rem', paddingTop: '1px', paddingRight: '93px' }}>
              <label style={{color: 'black' }}>Model</label>
            </div>
            <div style={{width: '250px'}} >
            <Input id="standard-basic" placeholder='case model' 
                       value={case_model}
                       onChange={(e) => setCase_model(e.target.value)} />
            </div>
          </div>

          <div style={{display: 'flex',marginTop: '-12rem', marginLeft: '30%' }}>
            <div style={{ marginBottom: '-14rem', paddingTop: '1px', paddingRight: '23px' }}>
              <label style={{color: 'black' }}>Operating System</label>
            </div>
            <div  >
            <Select
              defaultValue="WINDOWS 11"
              style={{ width: 250 }}
              value={os}
              onChange={(value) => setOs(value)}
              options={[
                { value: 'WINDOWS 7', label: 'WINDOWS 7' },
                { value: 'WINDOWS 8', label: 'WINDOWS 8' },
                { value: 'WINDOWS 10', label: 'WINDOWS 10' },
                { value: 'WINDOWS 11', label: 'WINDOWS 11' },
              ]}
            />
            </div>
          </div>

          <div style={{display: 'flex',marginTop: '-12rem', marginLeft: '30%' }}>
            <div style={{ marginBottom: '-14rem', paddingTop: '1px', paddingRight: '81px' }}>
              <label style={{color: 'black' }}>Location</label>
            </div>
            <div  >
            <Select
              defaultValue="Office floor 1"
              style={{ width: 250 }}
              value={location}
              onChange={(value) => setLocation(value)}
              options={[
                { value: 'OFFICE FLOOR 1', label: 'Office Floor 1' },
                { value: 'OFFICE FLOOR 2', label: 'Office Floor 2' },
                { value: 'OFFICE PD', label: 'Office PD' },
                { value: 'CMM ROOM 1A', label: 'CMM room 1A' },
                { value: 'CMM ROOM 1B', label: 'CMM room 1B' },
                { value: 'FACTORY 1A', label: 'Factory 1A' },
                { value: 'FACTORY 1B', label: 'Factory 1B' },
                { value: 'OFFICE FAC 2', label: 'Office Fac 2'},
                { value: 'FACTORY 2', label: 'Factory 2' }
              ]}
            />
            </div>
          </div>

        </div>
      ),
    },
    {
      title: 'Moniter',
      content: (
        <div style={{ marginTop: '-6rem', marginBottom: '-6rem', marginLeft: '1rem'}}>
          <div style={{display: 'flex', marginLeft: '30%' }}>
            <div style={{ marginBottom: '-14rem', paddingTop: '1px', paddingRight: '73px' }}>
              <label style={{color: 'black' }}>Brand</label>
            </div>
            <div  >
            <Select
              defaultValue="DELL"
              style={{ width: 250 }}
              value={moniter_brand}
              onChange={(value) => setMoniter_brand(value)}
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
          </div>

          <div style={{display: 'flex',marginTop: '-12rem', marginLeft: '30%' }}>
            <div style={{ marginBottom: '-14rem', paddingTop: '1px', paddingRight: '40px' }}>
              <label style={{color: 'black' }}>Service Tag</label>
            </div>
            <div style={{width: '250px'}} >
            <Input id="standard-basic" placeholder='service tag' 
                       value={moniter_service}
                       onChange={(e) => setMoniter_service(e.target.value)} />
            </div>
          </div>

          <div style={{display: 'flex',marginTop: '-12rem', marginLeft: '30%' }}>
            <div style={{ marginBottom: '-14rem', paddingTop: '1px', paddingRight: '25px' }}>
              <label style={{color: 'black' }}>Serial number</label>
            </div>
            <div style={{width: '250px'}} >
            <Input id="standard-basic" placeholder='serial number' 
                       value={moniter_serial}
                       onChange={(e) => setMoniter_serial(e.target.value)} />
            </div>
          </div>

        </div>
      )
    },
    {
      title: 'Mouse & Keyborad',
      content: (
        <div style={{ marginTop: '-6rem', marginBottom: '-6rem', marginLeft: '1rem'}}>
          <div style={{display: 'flex', marginLeft: '30%' }}>
            <div style={{ marginBottom: '-14rem', paddingTop: '1px', paddingRight: '36px' }}>
              <label style={{color: 'black' }}>Mouse Brand</label>
            </div>
            <div  >
            <Select
              defaultValue="DELL"
              style={{ width: 250 }}
              value={mouse_brand}
              onChange={(value) => setMouse_brand(value)}
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
          </div>

          <div style={{display: 'flex',marginTop: '-12rem', marginLeft: '30%' }}>
            <div style={{ marginBottom: '-14rem', paddingTop: '1px', paddingRight: '41px' }}>
              <label style={{color: 'black' }}>Mouse Serial</label>
            </div>
            <div style={{width: '250px'}} >
            <Input id="standard-basic" placeholder='mouse serial' 
                       value={mouse_serial}
                       onChange={(e) => setMouse_serial(e.target.value)} />
            </div>
          </div>

          <div style={{display: 'flex',marginTop: '-12rem', marginLeft: '30%' }}>
            <div style={{ marginBottom: '-14rem', paddingTop: '1px', paddingRight: '23px' }}>
              <label style={{color: 'black' }}>Keyboard Brand</label>
            </div>
            <div  >
            <Select
              defaultValue="DELL"
              style={{ width: 250 }}
              value={key_brand}
              onChange={(value) => setKey_brand(value)}
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
          </div>

          <div style={{display: 'flex',marginTop: '-12rem', marginLeft: '30%' }}>
            <div style={{ marginBottom: '-14rem', paddingTop: '1px', paddingRight: '27px' }}>
              <label style={{color: 'black' }}>Keyboard Serial</label>
            </div>
            <div style={{width: '250px'}} >
            <Input id="standard-basic" placeholder='keyboard serial' 
                       value={key_serial}
                       onChange={(e) => setKey_serial(e.target.value)} />
            </div>
          </div>

        </div>
      )
    },

    {
        title: 'Microsoft Office',
        content: (
          <div style={{ marginTop: '-6rem', marginBottom: '-6rem', marginLeft: '1rem'}}>
            <div style={{display: 'flex', marginLeft: '30%' }}>
              <div style={{ marginBottom: '-14rem', paddingTop: '1px', paddingRight: '25px' }}>
                <label style={{color: 'black' }}>Office Version</label>
              </div>
              <div style={{width: '250px'}} >
              <Input id="standard-basic" placeholder='version' 
                         value={office_version}
                         onChange={(e) => setOffice_version(e.target.value)} />
              </div>
            </div>
  
            <div style={{display: 'flex',marginTop: '-12rem', marginLeft: '30%' }}>
              <div style={{ marginBottom: '-14rem', paddingTop: '1px', paddingRight: '48px' }}>
                <label style={{color: 'black' }}>Office Key</label>
              </div>
              <div style={{width: '250px'}} >
              <Input id="standard-basic" placeholder='key' 
                         value={office_key}
                         onChange={(e) => setOffice_key(e.target.value)} />
              </div>
            </div>

            <div style={{display: 'flex',marginTop: '-12rem', marginLeft: '30%' }}>
              <div style={{ marginBottom: '-14rem', paddingTop: '1px', paddingRight: '20px' }}>
                <label style={{color: 'black' }}>Office Account</label>
              </div>
              <div style={{width: '250px'}} >
              <Input id="standard-basic" placeholder='account' 
                         value={office_acc}
                         onChange={(e) => setOffice_acc(e.target.value)} />
              </div>
            </div>

            <div style={{display: 'flex',marginTop: '-12rem', marginLeft: '30%' }}>
              <div style={{ marginBottom: '-14rem', paddingTop: '1px', paddingRight: '15px' }}>
                <label style={{color: 'black' }}>Office Password</label>
              </div>
              <div style={{width: '250px'}} >
              <Input id="standard-basic" placeholder='password' 
                         value={office_pass}
                         onChange={(e) => setOffice_pass(e.target.value)} />
              </div>
            </div>
  
          </div>
        )
      },
    
  ];

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  const contentStyle = {
    lineHeight: '260px',
    textAlign: 'center',
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };

  const onButtonSubmit = async(e) => {
    e.preventDefault();

    const userData = {
      user_id: employeeID || null,
      case_brand: case_brand || null,
      case_model: case_model || null,
      case_service: case_service || null,
      moniter_brand: moniter_brand || null,
      moniter_service: moniter_service || null,
      moniter_serial: moniter_serial || null,
      key_brand: key_brand || null,
      key_serial: key_serial || null,
      mouse_brand: mouse_brand || null,
      mouse_serial: mouse_serial || null,
      os: os || null,
      office_version: office_version || null,
      office_key: office_key || null,
      office_acc: office_acc || null,
      office_pass: office_pass || null,
      location: location || null,
      create_by: getUsername

    };

    console.log('userData:', JSON.stringify(userData, null, 2));

    try{
        if(!employeeID || !case_service || !moniter_service){
            setCurrent(0);
            message.error('กรุณากรอกข้อมูลให้ครบถ้วน');

        }else {
            setloading(true);
            await axios.post("http://192.168.10.114:88/btc/com/add", userData);
            setEmployeeID('');
            setCase_brand('');
            setCase_model('');
            setCase_service('');
            setMoniter_brand('');
            setMoniter_serial('');
            setMoniter_service('');
            setKey_brand('');
            setKey_serial('');
            setMouse_brand('');
            setMouse_serial('');
            setOs('');
            setOffice_version('');
            setOffice_key('');
            setOffice_acc('');
            setOffice_pass('');
            setLocation('');

            setCurrent(0);
            setloading(false);
            message.success('Processing complete!');
        };

        
    }catch(error){
        setCurrent(0);
        setloading(false);
        // message.error('Processing fail');
        // console.log('post new user: ', error);
        if (error.response && error.response.data === 'EmployeeID Ready') {
          message.error('พนักงานคนนี้มีคอมอยู่แล้ว');
      } else {
          message.error('Processing fail');
      }
      console.log('post new user: ', error);
    }
  };
 
    return(
        <div>     
            <Steps current={current} items={items} />
            <div style={contentStyle}>{steps[current].content}</div>
            <div style={{ marginTop: 24, marginLeft: '82.5%' }}>
              {current > -1 && (
                  <Button
                    style={{
                      margin: '0 8px',
                    }}
                    onClick={() => prev()}
                  >
                    Previous
                  </Button>
              )}
              {current < steps.length - 1 && (
                <Button type="primary" onClick={() => next()}>
                  Next
                </Button>
              )}
              {current === steps.length - 1 && (
                <Button type="primary" onClick={onButtonSubmit}>
                  Done
                </Button>
              )}
          
            </div>

            <Backdrop 
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    )
}