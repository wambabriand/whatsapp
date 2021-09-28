const express = require('express');
require('dotenv').config();
const mysql = require('mysql');
const qrcode = require('qrcode');
//const http = require('http');
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
app.use(router);


io.on('connection', (socket) => {
    console.log("on is connected");
    //init(socket);  
    socket.on('create-session', function(data) {
      console.log('Create session: ' + data.id);
      createSession(data.id, data.description);
    });
});





  