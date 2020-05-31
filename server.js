const express = require('express');
//install bcrypt-nodejs
const app = express();
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
//Originally without cors, you cant access from front-end
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');


const db = require('knex')(
    {
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'Reunion94!',
      database : 'smart-brain'
    }
  });

db.select('*').from('users')
.then(data => {
    console.log(data);
});


app.use(express.json());
app.use(cors())


app.get('/', (req,res)=> {
    res.send('working');
})

app.post('/signin', signin.handleSignin(db,bcrypt));
app.post('/register', (req, res) => {register.handleRegister(req,res,db,bcrypt)})
app.get('/profile/:id', (req, res)=> {profile.handleProfileGet(req,res,db)})
app.put('/image', (req, res) => {image.handleImage(req,res,db)})
app.post('/imageurl', (req, res) => {image.handleApiCall(req,res)})


;

//Environmental variables
//Go terminal set it first
// const port = process.env.port;

app.listen(3000, ()=> {
    console.log('App is running on port 3000');
});//The function will run after listen



/*
/ -> res = this is working
/singin --> POST --> res= success/fail
/register --> POST --> res= user 
/profile/:userId  --> GET --> res = user
/image  --> PUT --> res = updateduser
*/