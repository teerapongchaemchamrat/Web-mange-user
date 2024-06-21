import React , { useState, useEffect } from 'react';
import { Button, message, Select, Steps, theme, Input } from 'antd';
import axios from 'axios';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export default function Edituser () {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const [loading, setloading] = useState(false);

  const [employeeID, setEmployeeID] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [dpt, setDpt] = useState('');
  const [email, setEmail] = useState('');
  const [emailPass, setEmailPass] = useState('');
  const [instead, setInstead] = useState('');

  const [comid, setComid] = useState('');
  const [compass, setCompass] = useState('');
  const [inforid, setInforid] = useState('');
  const [inforpass, setInforpass] = useState('');
  const [dccid, setDccid] = useState('');
  const [dccpass, setDccpass] = useState('');

  const [printid, setPrintid] = useState('');
  const [printpass, setPrinpass] = useState('');

  const getUsername = localStorage.getItem('Username');
  const getUserID = localStorage.getItem('UserID');
  const getFirstname = localStorage.getItem('Firstname');
  const getLastname = localStorage.getItem('Lastname');
  const getDpt = localStorage.getItem('Dpt');
  const getEmail = localStorage.getItem('Email');
  const getEmailpass = localStorage.getItem('Emailpass');
  const getInstead = localStorage.getItem('Instead');
  const getComID = localStorage.getItem('ComID');
  const getCompass = localStorage.getItem('Compass');
  const getInforID = localStorage.getItem('InforID');
  const getInforpass = localStorage.getItem('Inforpass');
  const getDccID = localStorage.getItem('DccID');
  const getDccpass = localStorage.getItem('Dccpass');
  const getPrintID = localStorage.getItem('PrintID');
  const getPrintpass = localStorage.getItem('Printpass');
  
  useEffect(() => {
    const getUserDataFromLocalStorage = () => {
      setEmployeeID(getUserID);
      setFirstname(getFirstname);
      setLastname(getLastname);
      setDpt(getDpt);
      setEmail(getEmail);
      setEmailPass(getEmailpass);
      setInstead(getInstead);
      setComid(getComID);
      setCompass(getCompass);
      setInforid(getInforID);
      setInforpass(getInforpass);
      setDccid(getDccID);
      setDccpass(getDccpass);
      setPrintid(getPrintID);
      setPrinpass(getPrintpass);
      setCurrent(0);
    };

    getUserDataFromLocalStorage();
  }, [
    getUserID, getFirstname, getLastname, getDpt, getEmail, getEmailpass, getInstead,
    getComID, getCompass, getInforID, getInforpass, getDccID, getDccpass, getPrintID, getPrintpass
  ]);
   
  
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
      title: 'Employee',
      content: (
        <div style={{ marginTop: '-6rem', marginBottom: '-6rem', marginLeft: '1rem'}}>
          <div style={{display: 'flex', marginLeft: '20%' }}>
            <div style={{ marginBottom: '-14rem', paddingTop: '1px', paddingRight: '20px' }}>
              <label style={{color: 'black' }}>User ID</label>
            </div>
            <div style={{width: '250px', marginLeft: '6%'}} >
            <Input id="standard-basic" placeholder='employee ID' 
                       value={employeeID}
                       onChange={(e) => setEmployeeID(e.target.value)}
                       style={{backgroundColor: '#E1E1DE'}}
                       readOnly />
            </div>
          </div>

          <div style={{display: 'flex',marginTop: '-12rem', marginLeft: '20%' }}>
            <div style={{ marginBottom: '-14rem', paddingTop: '1px', paddingRight: '30px' }}>
              <label style={{color: 'black' }}>First Name</label>
            </div>
            <div style={{width: '250px'}} >
            <Input id="standard-basic" placeholder='first name' 
                       value={firstname}
                       onChange={(e) => setFirstname(e.target.value)}
                       style={{backgroundColor: '#E1E1DE'}}
                       readOnly />
            </div>
          </div>

          <div style={{display: 'flex',marginTop: '-12rem', marginLeft: '20%' }}>
            <div style={{ marginBottom: '-14rem', paddingTop: '1px', paddingRight: '31px' }}>
              <label style={{color: 'black' }}>Last Name</label>
            </div>
            <div style={{width: '250px'}} >
            <Input id="standard-basic" placeholder='last name' 
                       value={lastname}
                       onChange={(e) => setLastname(e.target.value)}
                       style={{backgroundColor: '#E1E1DE'}}
                       readOnly />
            </div>
          </div>

          <div style={{display: 'flex',marginTop: '-12rem', marginLeft: '20%' }}>
            <div style={{ marginBottom: '-14rem', paddingTop: '1px', paddingRight: '23px' }}>
              <label style={{color: 'black' }}>Department</label>
            </div>
            <div  >
            <Select
              defaultValue="ADM"
              style={{ width: 250 }}
              value={dpt}
              onChange={(value) => setDpt(value)}
              options={[
                { value: 'ADM', label: 'ADM' },
                { value: 'ACT', label: 'ACT' },
                { value: 'BPE', label: 'BPE' },
                { value: 'CMM', label: 'CMM' },
                { value: 'DCC', label: 'DCC' },
                { value: 'HR', label: 'HR' },
                { value: 'IQA', label: 'IQA' },
                { value: 'ISO', label: 'ISO' },
                { value: 'IT', label: 'IT' },
                { value: 'MTN', label: 'MTN' },
                { value: 'NMD', label: 'NMD' },
                { value: 'PPC', label: 'PPC' },
                { value: 'PD', label: 'PD' },
                { value: 'PPD', label: 'PPD' },
                { value: 'PUR', label: 'PUR' },
                { value: 'QA', label: 'QA' },
                { value: 'QC', label: 'QC' },
                { value: 'QC CMM', label: 'QC CMM' },
                { value: 'QC Final', label: 'QC Final' },
                { value: 'QMR', label: 'QMR' },
                { value: 'STR', label: 'STR' },
                { value: 'SAFETY', label: 'SAFETY' },
                { value: 'SALE', label: 'SALE' },
              ]}
            />
            </div>
          </div>

          <div style={{display: 'flex',marginTop: '-12rem', marginLeft: '20%' }}>
            <div style={{ marginBottom: '-14rem', paddingTop: '1px', paddingRight: '63px' }}>
              <label style={{color: 'black' }}>Email</label>
            </div>
            <div style={{width: '250px'}} >
            <Input id="standard-basic" placeholder='email account' 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)} 
                      style={{backgroundColor: '#E1E1DE'}}
                      readOnly />
            </div>
          </div>

          <div style={{display: 'flex',marginTop: '-12rem', marginLeft: '20%' }}>
            <div style={{ marginBottom: '-14rem', paddingTop: '1px', paddingRight: '40px' }}>
              <label style={{color: 'black' }}>Password</label>
            </div>
            <div style={{width: '250px'}} >
            <Input id="standard-basic" placeholder='pass email'
                       value={emailPass}
                       onChange={(e) => setEmailPass(e.target.value)} />
            </div>
          </div>

          <div style={{display: 'flex',marginTop: '-12rem', marginLeft: '20%' }}>
            <div style={{ marginBottom: '-14rem', paddingTop: '1px', paddingRight: '70px' }}>
              <label style={{color: 'black' }}>แทน</label>
            </div>
            <div style={{width: '250px'}} >
            <Input id="standard-basic"
                       value={instead}
                       onChange={(e) => setInstead(e.target.value)}
                       style={{backgroundColor: '#E1E1DE'}}
                       readOnly />
            </div>
          </div>

        </div>
      ),
    },
    {
      title: 'User Login',
      content: (
        <div style={{ marginTop: '-6rem', marginBottom: '-6rem', marginLeft: '1rem'}}>
          <div style={{display: 'flex', marginLeft: '20%' }}>
            <div style={{ marginBottom: '-14rem', paddingTop: '1px', paddingRight: '20px' }}>
              <label style={{color: 'black' }}>Computer ID</label>
            </div>
            <div style={{width: '250px'}} >
            <Input id="standard-basic" placeholder='computer ID' 
                       value={comid}
                       onChange={(e) => setComid(e.target.value)}
                       style={{backgroundColor: '#E1E1DE'}}
                       readOnly />
            </div>
          </div>

          <div style={{display: 'flex',marginTop: '-12rem', marginLeft: '20%' }}>
            <div style={{ marginBottom: '-14rem', paddingTop: '1px', paddingRight: '8px' }}>
              <label style={{color: 'black' }}>Computer Pass</label>
            </div>
            <div style={{width: '250px'}} >
            <Input id="standard-basic" placeholder='computer pass' 
                       value={compass}
                       onChange={(e) => setCompass(e.target.value)} />
            </div>
          </div>

          <div style={{display: 'flex',marginTop: '-12rem', marginLeft: '20%' }}>
            <div style={{ marginBottom: '-14rem', paddingTop: '1px', paddingRight: '55px' }}>
              <label style={{color: 'black' }}>Infor ID</label>
            </div>
            <div style={{width: '250px'}} >
            <Input id="standard-basic" placeholder='infor ID' 
                       value={inforid}
                       onChange={(e) => setInforid(e.target.value)}
                       style={{backgroundColor: '#E1E1DE'}}
                       readOnly />
            </div>
          </div>

          <div style={{display: 'flex',marginTop: '-12rem', marginLeft: '20%' }}>
            <div style={{ marginBottom: '-14rem', paddingTop: '1px', paddingRight: '42px' }}>
              <label style={{color: 'black' }}>Infor Pass</label>
            </div>
            <div style={{width: '250px'}} >
            <Input id="standard-basic" placeholder='infor pass' 
                       value={inforpass}
                       onChange={(e) => setInforpass(e.target.value)} />
            </div>
          </div>

          <div style={{display: 'flex',marginTop: '-12rem', marginLeft: '20%' }}>
            <div style={{ marginBottom: '-14rem', paddingTop: '1px', paddingRight: '60px' }}>
              <label style={{color: 'black' }}>Dcc ID</label>
            </div>
            <div style={{width: '250px'}} >
            <Input id="standard-basic" placeholder='dcc ID' 
                       value={dccid}
                       onChange={(e) => setDccid(e.target.value)} 
                       style={{backgroundColor: '#E1E1DE'}}
                       readOnly />
            </div>
          </div>

          <div style={{display: 'flex',marginTop: '-12rem', marginLeft: '20%' }}>
            <div style={{ marginBottom: '-14rem', paddingTop: '1px', paddingRight: '47px' }}>
              <label style={{color: 'black' }}>Dcc Pass</label>
            </div>
            <div style={{width: '250px'}} >
            <Input id="standard-basic" placeholder='dcc pass' 
                       value={dccpass}
                       onChange={(e) => setDccpass(e.target.value)} />
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Printer',
      content: (
        <div style={{ marginTop: '-6rem', marginBottom: '-6rem', marginLeft: '1rem'}}>
          <div style={{display: 'flex', marginLeft: '20%' }}>
            <div style={{ marginBottom: '-14rem', paddingTop: '1px', paddingRight: '20px' }}>
              <label style={{color: 'black' }}>Printer ID</label>
            </div>
            <div style={{width: '250px'}} >
            <Input id="standard-basic" placeholder='printer ID' 
                       value={printid}
                       onChange={(e) => setPrintid(e.target.value)} />
            </div>
          </div>

          <div style={{display: 'flex',marginTop: '-12rem', marginLeft: '20%' }}>
            <div style={{ marginBottom: '-14rem', paddingTop: '1px', paddingRight: '8px' }}>
              <label style={{color: 'black' }}>Printer Pass</label>
            </div>
            <div style={{width: '250px'}} >
            <Input id="standard-basic" placeholder='printer pass' 
                       value={printpass}
                       onChange={(e) => setPrinpass(e.target.value)} />
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
      user_id: getUserID || null,
      new_id: employeeID || null,
      dpt: dpt || null,
      infor_id: inforid || null,
      infor_pass: inforpass || null,
      dcc_id: dccid || null,
      dcc_pass: dccpass || null,
      com_id: comid || null,
      com_pass: compass || null,
      email_id: email || null,
      email_pass: emailPass || null,
      print_id: printid || null,
      print_pass: printpass || null,
      instead: instead || null,
      status: '1',
      update_by: getUsername
    };

    //console.log('userData:', JSON.stringify(userData, null, 2));

    try{
        if(!employeeID || !firstname || !dpt){
            setCurrent(0);
            message.error('กรุณากรอกข้อมูลพนักงานให้ครบถ้วน');

        }else {
            setloading(true);
            await axios.put(`http://XXXXXXXXXXXXXXXX/${getUserID}`, userData);

            setCurrent(0);
            setloading(false);
            message.success('Processing complete!');
        };

        
    }catch(error){
        setCurrent(0);
        setloading(false);
        message.error('Processing fail');
        console.log('post new user error: ', error);
    }
  };
 
    return(
        <div>     
            <Steps current={current} items={items} />
            <div style={contentStyle}>{steps[current].content}</div>
            <div style={{ marginTop: 24, marginLeft: '74.5%' }}>
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
