const express = require('express');

const bodyparser = require('body-parser');

const app = express();
const fs = require('fs');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

app.listen(3000,()=>{
    console.log('server running at port 3000');
});

app.get('/',(req,res)=>{
    console.log('Main page');
    res.send('Welcome to My World');
});
const datapath = './users.json'

app.get('/users',async(req,res)=>{
    fs.readFile(datapath,(err,data)=>{
        if(err){throw err};
        res.send(JSON.parse(data));
    });

});

app.post('/users',(req,res)=>{
    console.log('Here');
    fs.readFile(datapath,(err,data)=>{
        if(err){throw err};
        const obj = JSON.parse(data);
        const newuserID = Object.keys(obj).length+1;
        obj[newuserID] = req.body;
        fs.writeFile(datapath,JSON.stringify(obj,null,2),(err)=>{
            if(err){throw err};
            res.status(200).send(`user added successfully of ID ${newuserID}`);
        });
    });});

app.get('/users/:id',(req,res)=>{
    console.log('here')
    fs.readFile(datapath,(err,data)=>{
        if(err){throw err};
        const asked_ID = req.params['id'];
        res.send(JSON.parse(data)[asked_ID]);
    });

});

app.delete('/users/:id',(req,res)=>{
    fs.readFile(datapath,(err,data)=>{
        if(err){throw err};
        const asked_ID = req.params['id'];
        const obj = JSON.parse(data);
        delete obj[asked_ID];
        fs.writeFile(datapath,JSON.stringify(obj,null,2),(err)=>{
            if(err){throw err};
            res.send('Deleted Succes ID:'+asked_ID);
        });

    });
});

app.put('/users/:id',(req,res)=>{
    fs.readFile(datapath,(err,data)=>{
        if(err){throw err};
        const asked_ID = req.params['id'];
        const obj = JSON.parse(data);
        obj[asked_ID]=req.body;
        fs.writeFile(datapath,JSON.stringify(obj,null,2),(err)=>{
            if(err){throw err};
            res.send('Updates Sucess');
        });

    });});