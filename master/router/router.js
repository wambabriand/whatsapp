const express = require('express');
const router = express.Router();
const { getChats, updateChats,  fetchChats, updateCategory } = require('../service/w/wService');

router.get('/',(req, res) => {
    res.send('server is running');
});

router.post('/wchats', async (req, res) => {
    await updateCategory(req.body);
    const { user_id } = req.body || {};
    const resutl = await getChats(user_id);
    res.send(resutl);
});

router.post('/sendwhatsappmessage', async (req, res) => {
   // await updateCategory(req.body);
   console.log(req.body);
    //const { user_id } = req.body || {};
    //const resutl = await getChats(user_id);
    res.send("ok");
});




router.get('/wchats/:userid', async (req, res) => {
    const resutl = await getChats(req.params.userid);
    res.send(resutl);
});


router.get('/refreshchats/:userid', async (req, res) => {
    const resutl = await updateChats(req.params.userid);
    res.send(resutl);
});

module.exports = router;