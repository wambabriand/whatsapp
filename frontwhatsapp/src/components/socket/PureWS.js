import React, { useState } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import QrCode from './QrCode';
const SOCKET_URL = 'http://localhost:8080/socket';


const PureWS = () => {

    const [first, setFirst] = useState(true);
    const [src, setSrc] = useState("");
    const sock = new SockJS(SOCKET_URL);
    const stompClient = Stomp.over(sock);

    const headers = {'Authorization': 'Bearer '+ localStorage.getItem('token')};
    const iduser = 1;

    if(first){
        setFirst(false);
        stompClient.connect(headers, function (frame) {
        
            stompClient.subscribe(`/topic/${iduser}`, function (message) {
                setSrc(message.body);
                    //console.log(message.body)
            });
            //stompClient.send(`/app/requestcode`, headers,'START_AUTH')
        
                //sendApiIdAndApiHash();
        });
    }
    
    
    const sendMessage = () => {
        stompClient.send(`/app/socket`, headers,'START_AUTH')
    }




    return (
    <div>
        PURZE
        <img src={src ? src : ""} id='qrcode' alt=""></img> <br/>
        <QrCode src={src}/> <br/>
        <button onClick={sendMessage}>Send message</button>
    </div>)
}
export default PureWS;

/*

import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { doGetWithToken, baseUrl, doPostWithToken } from '../../services/api';
import InputForm from '../common/InputForm';
import { url } from '../routes/url';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
const SOCKET_URL = 'http://localhost:8081/socket';


const UpdateTelegramParam = props => {

    const { START_AUTH_OK, START_AUTH_NO_OK, CODE_OK, CODE_NO_OK } = props;
    const { idTlgParam } = useParams();
    const [{data, loading: loading1, error: error1}] = doGetWithToken(`${url.GET_PARAM}${idTlgParam}`);
    const [{ loading: loading2, error: error2}, requestCode] = doPostWithToken(`${url.REQUEST_SEND_CODE}`);
    const [{ loading: loading3, error: error3}, confirmCode] = doPostWithToken(`${url.REQUEST_SEND_CODE}`);
    const [tlgParam, setTlgParam] = useState({});
    const [result, setResult] = useState(0);
   // const [count, setCount] = useState(0);
    const [waitingCode, setWaitingCode] = useState(false);
    const history = useHistory();

    const headers = {'Authorization': 'Bearer '+ localStorage.getItem('token')};
    const sock = new SockJS(SOCKET_URL);
    const stompClient = Stomp.over(sock);

    useEffect(()=>{
        setTlgParam({ ...data });
    /*
            const headers = {'Authorization': 'Bearer '+ localStorage.getItem('token')};
            stompClient.connect(headers, function (frame) {
                
                //console.log('Connected: ' + frame);
        
                stompClient.subscribe(`/topic/${idTlgParam}`, function (message) {
        
                    if(message.body === "START_AUTH_OK"){
                        console.log("++++++++++START_AUTH_OK")
                        setWaitingCode(true);
                    }
                    if(message.body === "CODE_OK"){
                        console.log("++++++++++CODE_OK")
                    }
                    if(message.body === "CODE_NO_OK"){
                        console.log("+++++++++++++++++CODE_NO_OK")
                    }
                    //console.log(message.body)
                });
                stompClient.send(`/app/requestcode`, headers, JSON.stringify({tlgParamId: idTlgParam, message:'hellooo', code:'START_AUTH'}) )
            });
            

        },[data])

   
 
    



        const goBack = () => {
            stompClient.unsubscribe(`/topic/${idTlgParam}`);
            stompClient.disconnect(()=>console.log('+++close'), headers)
            setTlgParam({});
            history.push('/');
        }
        
        const onSave = () => {
            setTlgParam({});
            history.push('/');
        }
        
        const onUpdate = () => {
            setTlgParam({});
            history.push('/');
        }
        const onchangeCode = e => {
            setTlgParam({ ...tlgParam, sentcode: e.target.value });
        }
        
        const onRequestCode = () => {
            const headers = {'Authorization': 'Bearer '+ localStorage.getItem('token')};
            stompClient.connect(headers, function (frame) {
                console.log('Connected: ' + frame);
                stompClient.subscribe(`/topic/${idTlgParam}`, function (message) {
                    console.log(message.body)
                });
                stompClient.send(`app/topic/${idTlgParam}-${idTlgParam}`, headers,'START_AUTH');
            });
        }
    
        
       // = "8be95977d13944d30af5fb907befc7c4"
       // = 7138655
    
        const onConfirmCode = () => {
    
            stompClient.send(`/app/requestcode`, headers, JSON.stringify({message:'hellooo', code:1}));
    
            
            requestCode({data: tlgParam })
            .then(res=>{
                if(res.data.result){
                    alert('il codice è stato confermato');
                }else{
    
                }
            })
            setWaitingCode(false)
        }
    
        if(loading1 || loading2) return <div>Caricamento ....</div>
        if(error1 || error2) return <div>ERROR</div>
        if( START_AUTH_OK || START_AUTH_NO_OK || CODE_OK || CODE_NO_OK){
            return <div> <h1> heooooooooooo</h1></div>
        }
    
        return (
        <div className='row d-flex justify-content-center'>
            <div className='col-md-5 col-12'> 
    
                <InputForm 
                    field='name'
                    data={tlgParam} 
                    placeHolder='Name'
                    handleChange={setTlgParam}
                />
                <InputForm 
                    field='phoneNumber'
                    data={tlgParam} 
                    placeHolder='+39...'
                    handleChange={setTlgParam}
                />
                <InputForm 
                    field='apiId'
                    data={tlgParam} 
                    placeHolder='API_ID'
                    handleChange={setTlgParam}
                />
                <InputForm 
                    field='apiHash'
                    data={tlgParam}
                    disable={true}
                    placeHolder='API_HASH'
                    handleChange={setTlgParam}
                />
                <InputForm 
                    field='token'
                    data={tlgParam}
                    disable={true}
                    placeHolder='TOKEN_TO_USE_WHEN_YOU_CALL_OUR_API'
                    handleChange={setTlgParam}
                />
                
                {
                    (tlgParam && tlgParam.authenticated === false && waitingCode === false) && (
                        <div className='container'> 
                            <div className='row mt-3 d-flex justify-content-center'>
                                Devi avere pronto il tuo cellulare con telegram per forire il codice di conferma.
                            </div>
                            <div className='row mt-3 d-flex justify-content-center'>
                                <div className='col-5'>
                                    <button className='btn btn-block btn-success' onClick={onRequestCode}>Verificare con codice</button>
                                </div>
                            </div>
                        </div>
                    )
                }
                
      
                {
                    (tlgParam && tlgParam.authenticated === false && waitingCode === true) && (
                        <div className='container'> 
                            <div className='row mt-3 d-flex justify-content-center'>
                                Entrare il codice 
                                <div className='col-3'> 
                                    <input className='form-control' onChange={onchangeCode}/>
                                </div>
                            </div>
                            <div className='row mt-3 d-flex justify-content-center'>
                                <div className='col-5'>
                                    <button className='btn btn-block btn-success' onClick={onConfirmCode}>Verificare con codice</button>
                                </div>
                            </div>
                        </div>
                    )
                }
    
                <div className='row mt-3 d-flex justify-content-md-between'>
                    <div className='col-3'>
                        <button className='btn btn-block btn-dark' onClick={goBack}>Retour</button>
                    </div>
                    <div className='col-3'>
                        <button className='btn btn-block btn-primary' onClick={onSave}>Enregistrer</button>
                    </div>
                    <div className='col-3'>
                        <button className='btn btn-block btn-warning' onClick={onUpdate}>Modifier</button>
                    </div>
                </div>
             </div>
        </div>)
    }
    export default UpdateTelegramParam;

*/