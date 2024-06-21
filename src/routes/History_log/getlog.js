import React, { useState, useRef } from 'react';
import { Table, Button, Input } from 'antd';
import { SearchOutlined, FormOutlined } from '@ant-design/icons';
import axios from 'axios';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useReactToPrint } from 'react-to-print';

export default function GetLog (){

    const conponentPDF = useRef('');

    const [logdata, setLogdata] = useState('');
    const [loading, setLoading] = useState(false);
    const [case_service, setCase_service] = useState('');
    const [doc_num, setDoc_num] = useState('');

    const getLog = async (param) => {
        try{
            setLoading(true);
            const getdata = await axios.get(`http://192.168.10.114:88/cyf/com/log/${param}`);
            const res = getdata.data.map(item => ({
                ...item,
                case_service : item.case_service || '',
                doc_num : item.doc_num || '',
                type : item.type || '' ,
                problem : item.problem || '' ,
                cause : item.cause || '' ,
                solution : item.solution || '' ,
                moniter_brand_old : item.moniter_brand_old || '' ,
                moniter_service_old : item.moniter_service_old || '' ,
                moniter_serial_old : item.moniter_serial_old || '' ,
                key_brand_old : item.key_brand_old || '' ,
                key_serial_old : item.key_serial_old || '' ,
                mouse_brand_old : item.mouse_brand_old || '' ,
                mouse_serial_old : item.mouse_serial_old || '' ,
                moniter_brand_new : item.moniter_brand_new || '' ,
                moniter_service_new : item.moniter_service_new || '' ,
                moniter_serial_new : item.moniter_serial_new || '' ,
                key_brand_new : item.key_brand_new || '' ,
                key_serial_new : item.key_serial_new || '' ,
                mouse_brand_new : item.mouse_brand_new || '' ,
                mouse_serial_new : item.mouse_serial_new || '' ,
                user_req : item.user_req || '' ,
                date_req : item.date_req || '',
                user_it : item.user_it || '' ,
                date_complete : item.date_complete || '' 
            }))

            setLogdata(res);
            setLoading(false);
        }catch(error){
            console.log("Error get log: ", error);
            setLoading(false);
        }
    };

    const getDoc = async (param) => {
      try{
          setLoading(true);
          const getdata = await axios.get(`http://192.168.10.114:88/cyf/com/doc/${param}`);
          const res = getdata.data.map(item => ({
              ...item,
              case_service : item.case_service || '',
              doc_num : item.doc_num || '',
              type : item.type || '' ,
              problem : item.problem || '' ,
              cause : item.cause || '' ,
              solution : item.solution || '' ,
              moniter_brand_old : item.moniter_brand_old || '' ,
              moniter_service_old : item.moniter_service_old || '' ,
              moniter_serial_old : item.moniter_serial_old || '' ,
              key_brand_old : item.key_brand_old || '' ,
              key_serial_old : item.key_serial_old || '' ,
              mouse_brand_old : item.mouse_brand_old || '' ,
              mouse_serial_old : item.mouse_serial_old || '' ,
              moniter_brand_new : item.moniter_brand_new || '' ,
              moniter_service_new : item.moniter_service_new || '' ,
              moniter_serial_new : item.moniter_serial_new || '' ,
              key_brand_new : item.key_brand_new || '' ,
              key_serial_new : item.key_serial_new || '' ,
              mouse_brand_new : item.mouse_brand_new || '' ,
              mouse_serial_new : item.mouse_serial_new || '' ,
              user_req : item.user_req || '' ,
              date_req : item.date_req || '',
              user_it : item.user_it || '' ,
              date_complete : item.date_complete || '' 
          }))

          setLogdata(res);
          setLoading(false);
      }catch(error){
          console.log("Error get log: ", error);
          setLoading(false);
      }
  };

    function formatDate(dateString) {
        if (dateString === null) {
          return ""; // Return an empty string if the date is null
        }
        const originalDate = new Date(dateString);
        
        // Add 6 hours to the original date
        const modifiedDate = new Date(originalDate.getTime() - 7 * 60 * 60 * 1000);
  
        // Format the date portion as "dd-MM-yyyy"
        const dateOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
        const formattedDate = modifiedDate.toLocaleDateString('nl-NL', dateOptions);
  
        return `${formattedDate}`;
      };

    const SearchServiceTag = () => {
        getLog(case_service);
    };

    const SearchDoc = () => {
        getDoc(doc_num);
    };

    const columns = [
        {
          title: 'เลขที่ใบแจ้งซ่อม',
          dataIndex: 'doc_num',
          key: 'doc_num',
        },
        {
          title: 'Service Tag',
          dataIndex: 'case_service',
          key: 'case_service',
        },
        {
          title: 'สาเหตุหลักของปัญหา',
          dataIndex: 'type',
          key: 'type',
        },
        {
          title: 'ปัญหาที่เกิดขึ้น',
          dataIndex: 'problem',
          key: 'problem',
        },
        {
          title: 'สาเหตุ',
          dataIndex: 'cause',
          key: 'cause',
        },
        {
          title: 'วิธีแก้ไขปัญหา/ป้องกัน',
          //dataIndex: 'solution',
          key: 'solution',
          render: (text, record) => (
            record.type === 'Hardware' ? (
              <div>
                {record.solution && (
                  <div>
                    <label>{record.solution}</label>
                    <br />
                  </div>
                )}
                {record.moniter_service_new && (
                  <div>
                    <label>จอใหม่ : {record.moniter_brand_new} || {record.moniter_service_new}</label>
                  </div>
                )}
                {record.key_serial_new && (
                  <div>
                    <label>คีย์บอร์ดใหม่ : {record.key_brand_new} || {record.key_serial_new}</label>
                  </div>
                )}
                {record.mouse_serial_new && (
                  <div>
                    <label>เม้าส์ใหม่ : {record.mouse_brand_new} || {record.mouse_serial_new}</label>
                  </div>
                )}
              </div>
            ) : (
              record.solution && <label>{record.solution}</label>
            )
          ),
        },
        {
          title: 'ผู้ร้องขอ',
          key: 'user_req',
          dataIndex: 'user_req',
        },
        {
          title: 'วันที่ร้องขอ',
          key: 'date_req',
          render: (record) => `${formatDate(record.date_req)}`
        },
        {
          title: 'ผู้ดำเนินการ',
          key: 'user_it',
          dataIndex: 'user_it',
        },
        {
          title: 'วันที่ดำเนินการเสร็จ',
          key: 'date_complete',
          render: (record) => `${formatDate(record.date_complete)}`
        },
        
      ];

    const LogPdfDocument = useReactToPrint({
      content: () => conponentPDF.current,
      documentTitle: "History repair : " + case_service,

    });

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
                
                    <Button type="primary" onClick={SearchServiceTag} icon={<SearchOutlined />}>
                            Search
                    </Button>
                    <Button type="primary" onClick={LogPdfDocument} icon={<FormOutlined />}
                            style={{marginLeft: '1%'}}>
                            Print
                    </Button>
               
            </div>
            <div style={{marginBottom: '1%',display: "flex"}}>
              <label style={{marginTop: '0.28%'}}>เลขที่ใบแจ้งซ่อม : &nbsp;</label>
                <div style={{width: '10%', marginRight: '1%'}}>
                    <Input placeholder="เลขที่ใบแจ้งซ่อม" 
                           value={doc_num}
                           onChange={(e) => setDoc_num(e.target.value)}
                           />
                </div>
                
                    <Button type="primary" onClick={SearchDoc} icon={<SearchOutlined />}>
                            Search
                    </Button>
            </div>
            <div ref={conponentPDF} style={{width: '100%'}}>
              <Table columns={columns} dataSource={logdata} />
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