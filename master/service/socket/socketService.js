const { Client, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode');


const initSocket = io => {

    io.on('connection', (socket) => {

        socket.on('AUTH', ({socketId, userId }) => {
            createClient(io, socketId, userId);
        })

        /*
        console.log("on is connescted");
        //console.log(socket.client.id )
        socket.emit("message", { test : "totototototo"} )
        socket.emit("message", { test : "totototototo"} )

        const socketid = socket.id;

        //socket.to(socket.client.id).emit("QRCODE","totototototo" )

        const client = new Client();

        client.on('qr', qr => {
            qrcode.generate(qr, {small: true});
            io.to(socketid).emit("message",{socketid , message: "hello"} )
        });

        client.on('ready', () => {
            console.log('Client is ready!');
        });

        client.initialize();

        */



            // fetch session in db

            // init session

            // if valid

            // if not valide


            //io.to(socketId).emit(/* ... */);
            

            /*
            
          
        
            client.on('ready', () => {
            io.emit('ready', { id: id });
            io.emit('message', { id: id, text: 'Whatsapp is ready!' });
        
            const savedSessions = getSessionsFile();
            const sessionIndex = savedSessions.findIndex(sess => sess.id == id);
            savedSessions[sessionIndex].ready = true;
            setSessionsFile(savedSessions);
            });
        
            client.on('authenticated', (session) => {
            io.emit('authenticated', { id: id });
            io.emit('message', { id: id, text: 'Whatsapp is authenticated!' });
            sessionCfg = session;
            fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), function(err) {
                if (err) {
                console.error(err);
                }
            });
            });
        
            client.on('auth_failure', function(session) {
            io.emit('message', { id: id, text: 'Auth failure, restarting...' });
            });
        
            client.on('disconnected', (reason) => {
            io.emit('message', { id: id, text: 'Whatsapp is disconnected!' });
            fs.unlinkSync(SESSION_FILE_PATH, function(err) {
                if(err) return console.log(err);
                console.log('Session file deleted!');
            });
            client.destroy();
            client.initialize();
        
            // Menghapus pada file sessions
            const savedSessions = getSessionsFile();
            const sessionIndex = savedSessions.findIndex(sess => sess.id == id);
            savedSessions.splice(sessionIndex, 1);
            setSessionsFile(savedSessions);
      
            io.emit('remove-session', id);
            });
            
            
        })
        */

        socket.on('create-session', function(data) {
        console.log('Create session: ' + data.id);
        createSession(data.id, data.description);
        });
        
    });

}

const { updateUserSession } = require('../../repository/UserQuery');


const createClient = (io, socketid, userId) => {

    // get session 
    const session = {
        WABrowserId: '"5Odaw2veQUlU68a/24mIhw=="',
        WASecretBundle: '{"key":"943zbkhtHpFsmMG60kBsTK9H7v5PhXrE1RzpaGznWQE=","encKey":"m04I+KKZhLp/qoWPkgrC1sHfMDHVl5zib30if3TPqnA=","macKey":"943zbkhtHpFsmMG60kBsTK9H7v5PhXrE1RzpaGznWQE="}',
        WAToken1: '"HN9pinukwYQVJEoHU4UJ1N45HTjofGDvy+7diGydoyk="',
        WAToken2: '"1@2IH8dafl/iErMzZKV4uClztn+mHUFewucSGAhBG/i2/EqokqB03WvU7lIlzx6ZsRB88fvF3wnekxFg=="'
      };
    const client = new Client({session});
    client.on('qr', qr => {
        qrcode.toDataURL(qr, (err, url) => {
            io.to(socketid).emit("QRCODE",{ socketid , qrcode: url} )
        });
        
    });
    client.on('ready',  () => {
        console.log('Client is ready!');
        io.to(socketid).emit("AUTH_OK", { socketid , message: "authentification is ok!"} )
    });

    client.on('authenticated', async (session) => {
        const tmp1 = await updateUserSession(userId, session);
       
        io.to(socketid).emit("AUTH_OK",{socketid , message: JSON.stringify(session) } )
    });

    client.initialize();
}





module.exports = {
    initSocket
};