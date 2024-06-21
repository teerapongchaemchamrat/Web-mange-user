import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './Login.css'
import axios from "axios";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  export default function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [loading, setloading] = useState(false);

    const navigate = useNavigate();

    const onSubmit = async(e) => {
        e.preventDefault();

        //navigate('/main.jsx');
 
        const userData = {
            username: username,
            password: password
        }
         
        try {
                setloading(true);
                const response = await axios.post("http://49.0.65.4:3002/web/login/login", userData);
                const role = response.data.role;
                const fullname = response.data.fullname;
                console.log("POST Response:", response.data);
                localStorage.setItem('Username', username);
                localStorage.setItem('Fullname' , fullname);
                localStorage.setItem('RoleType', role);
                setOpenSuccess(true);
                if(role === 'SuperAdministrator'){
                  navigate('/main');
                }else {
                  alert('คุณไม่ใช่ผู้ดูแลระบบ');
                }
                
                setloading(false);
            } catch (error) {
                console.error("Error login data:", error);
                setOpenError(true);
                setPassword("");
                setloading(false);
            };
    }

  return (
    <div>
        <section className='section'>
          <div className='air air1'></div>
          <div className='air air2'></div>
          <div className='air air3'></div>
          <div className='air air4'></div>
        
          <div id="login-form">
            <h1>Login</h1>
            <form>
              <label htmlFor="username">Username :</label>
              <input 
                  type="text" 
                  id="username" 
                  name="username" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)} />
              <label htmlFor="password">Password :</label>
              <input 
                  type="password" 
                  id="password" 
                  name="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}/>
              <input type="submit" value="LOGIN" onClick={onSubmit}/>
            </form>

            <Snackbar open={openSuccess} autoHideDuration={4000} onClose={() => setOpenSuccess(false)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
              <div>
              <Alert onClose={() => setOpenSuccess(false)} severity="success">
                Login Successfully! {username}
              </Alert>
              </div>
            </Snackbar>

            <Snackbar open={openError} autoHideDuration={4000} onClose={() => setOpenError(false)}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
              <div>
              <Alert onClose={() => setOpenError(false)} severity="error">
                Username or Password incorrect
              </Alert>
              </div>
            </Snackbar>

            <Backdrop 
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
          </div>
        </section>
    </div>
  );
}
