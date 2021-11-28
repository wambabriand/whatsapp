const { Client, MessageMedia } = require('whatsapp-web.js');
const { getChatsByUserId, savewChat , updateCateegory} = require('../../repository/ChatQuery');
const { getSessionById, updateUserSession } = require('../../repository/UserQuery');


const getChats = async (id) => {
    const res = getChatsByUserId(id);
    return res;
};

const updateCategory = async (data) => {
    const res = await updateCateegory(data);
    if(Array.isArray(res)) {
        return ({result: false, data: 'missing parameter'});
    }
    return ({result: true, data: 'update okay'});
}

const fetchChats = async (idUser) => {
    let res, client;
    const session = await getSessionById(idUser);
    if(session){
        client = new Client({session});
    }else{
        return ({ result: false, data: 'Bisogna fare il login'});
    }

    try {
        client.on('auth_failure', async (message) => { 
            console.log("================= AUTH FAILURE Il cliente non ha potytuto fare il login ===========");
            await client.destroy();
            throw Error(message);
        })
        client.on('qr', async (message) => { 
            console.log("================= QR CODE Il cliente non ha potytuto fare il login ===========");
            await client.destroy();
            throw Error('Client not log');
        })
    
        await client.initialize();
    
        console.log("client init well");
        // await client.sendMessage('33766883809@c.us','helloooo');
        const contacts =  await client.getContacts();
        //const chats =  await client.getChats();
        res = { result: true, data: contacts };
        await client.destroy();
    } catch(e){
        console.log('====zererer')
        res = { result: false, data: e };
        
    }
    return res;
    //return chats;
    //return contacts;
    /*
    return contacts.map( c => ({ 
        number:c.number, 
        isUser:c.isUser, 
        isGroup: c.isGroup, 
        isMyContact: c.isMyContact, 
        name: c.name, 
        jid: c.id._serialized
    }));
*/
}

const updateChats = async (idUser) => {
    console.log("Je veux commencer l update des contacts")
   let res = await fetchChats(idUser);
    if(res && res.result){
        for(let i = 0; i < res.data.length; i++){
            let data = { name: res.data[i].name, jid: res.data[i].id._serialized,   }
            await savewChat(idUser, data);
        }
    }
    return res;
}

const updateSession = async (idUser, session) => {
    const res = await updateUserSession(idUser, session);
    return res;
}

module.exports = {
    getChats,
    updateSession,
    fetchChats,
    updateChats,
    updateCategory
}