const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

const users = { 
    users_list :
    [
       { 
          id : 'xyz789',
          name : 'Charlie',
          job: 'Janitor',
       },
       {
          id : 'abc123', 
          name: 'Mac',
          job: 'Bouncer',
       },
       {
          id : 'ppp222', 
          name: 'Mac',
          job: 'Professor',
       }, 
       {
          id: 'yat999', 
          name: 'Dee',
          job: 'Aspring actress',
       },
       {
          id: 'zap555', 
          name: 'Dennis',
          job: 'Bartender',
       }
    ]
 }
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.get('/users', (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    if (name != undefined && job === undefined){
        let result = findUserByName(name);
        result = {users_list: result};
        res.send(result);
    }
    else if(job != undefined && name === undefined){
        let result = findUserByJob(job)
        result = {users_list: result};
        res.send(result);
    }
    else if(job != undefined && name != undefined){
        let result = findUserByName(name);
        result = result.filter( (user) => user['job'] === job);
        result = {users_list: result};
        res.send(result);
    }
    else{
        res.send(users);
    }
});
const findUserByJob = (job) => {
    return users['users_list'].filter( (user) => user['job'] === job);
}
const findUserByName = (name) => { 
    return users['users_list'].filter( (user) => user['name'] === name); 
}
app.get('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = findUserById(id);
    if (result === undefined || result.length == 0)
        res.status(404).send('Resource not found.');
    else {
        result = {users_list: result};
        res.send(result);
    }
});

function findUserById(id) {
    return users['users_list'].find( (user) => user['id'] === id); // or line below
    //return users['users_list'].filter( (user) => user['id'] === id);
}
app.post('/users', (req, res) => {
    const userToAdd = {
        id: '',
        name: req.body.name,
        job: req.body.job,
    }
    //console.log(userToAdd);
    generateID(userToAdd);
    //console.log(userToAdd);
    addUser(userToAdd);
    res.status(201).send(userToAdd).end();
    //res.status(201).end();

});

function addUser(user){
    users['users_list'].push(user);
}
function generateID(user){
    user.id = Math.random().toString(36).substr(2, 6);
    //got random string idea from stack overflow silver ringvee
}
app.delete('/users/:id', (req, res) => {
    const id = req.params['id'];
    let result = findUserById(id);
    if (result === undefined || result.length == 0)
        res.status(404).send('Resource not found.');
    else {
        users['users_list'] = deleteUser(id);
        //console.log('sending 204');
        res.status(204).send(result).end();
    }
});

const deleteUser = (id) =>{
    return users['users_list'].filter( (user) => user['id'] != id);
}

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});     
