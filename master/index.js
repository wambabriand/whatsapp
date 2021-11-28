const express = require('express');
require('dotenv').config();
const mysql = require('mysql');
const qrcode = require('qrcode');
//const http = require('http');
const { lunchCron } = require('./cron/whatsappCron');
const { Server  } = require('socket.io');
const cors = require('cors');
const router = require('./router/router');
const app = express();


//const server = http.createServer(app);



const servcer = app.listen(8083,()=>{
    console.log('server startss ' + process.env.DB_PORT)    
});


const io = new Server (servcer, { cors: { origin:'*',    methods: ["GET", "POST"]  }});

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

const { initSocket } = require('./service/socket/socketService');

initSocket(io);
lunchCron();





  