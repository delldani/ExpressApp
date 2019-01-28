
// új branch

const bodyParser = require('body-parser');
const cors = require('cors');

const express = require('express')
const app = express()
const port = 8080

const atob = require('atob');


const jwt = require('jsonwebtoken');

    
    
  
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(bodyParser.json());

const middleWare = require('./LoginMiddleWare.js')
app.use(middleWare())

const mongoose = require('mongoose');
let conn = mongoose.createConnection('mongodb://localhost:27017/todo', {useNewUrlParser: true});
let conn2 = mongoose.createConnection('mongodb://localhost:27017/login', {useNewUrlParser: true});

let loginSchema = new mongoose.Schema({
  username : String ,
  password : String
});

let todoSchema = new mongoose.Schema({
  id : String ,
  name : String,
  username : String
});

let login = conn2.model('login', loginSchema);
let todo = conn.model('todo', todoSchema);


                                            // let todo = mongoose.model('todo', todoSchema);

                                            // let dani = new todo({ id : 1 , name: 'dani' });

                                            // dani.save(function (err, dani) {
                                            //   if (err) return console.error(err);
                                            // });

                                            // let obj = {array : [{id:0,name: "gizi"},{id:1, name: "józsi"},{id:2, name: "bali"},{id:3, name:"dani"}]};
                                            // let myJSON = JSON.stringify(obj);

function parseJwt (token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(atob(base64));
};


function actualUser(req)
{
              const token = req.headers['authorization'];
              console.log(token);

              const todoUser =  parseJwt(token).user.username;
             
              return todoUser;
}


app.get('/',middleWare, (req, res) =>{ 

             let todoUser = actualUser(req);
                
             todo.find({username : todoUser},function (err, todo) {
                if (err) return console.error(err);
                let obj = {array : todo};
                let myJSON = JSON.stringify(obj);
                res.send(myJSON);
             });

});



app.post('/',middleWare, function (req, res) {
   
        let data =  req.body;
        // if(data.array.length > -1)
        {
              let todoUser = actualUser(req);

              for (let i = 0; i < data.array.length; i++) {
                data.array[i].username = todoUser;
              }

              res.send("ok");

              todo.deleteMany({username : todoUser}, function (err) {
                if (err) return handleError(err);
              });


              todo.insertMany(data.array, function(err) {
                if (err) return handleError(err);
              });
       }
});


app.post('/login', (req, res) =>{ 
  let data =  req.body;
  
  login.findOne({ 'username': data.username, 'password': data.password }, 'password', function (err, person) {
    if (err) return next(err);
  
    if(!person){
      res.sendStatus(403);
      console.log("nincs ilyen felhasználó az adatbázisban");
    }
    else{
            const user = {
              username: data.username,
              password: data.password
            };

            // jwt.sign({user}, 'secretkey', { expiresIn: '1000s' }, (err, token) => {
              jwt.sign({user}, 'secretkey',  (err, token) => {
                  
              res.json({
                token
              });
            });

          console.log(person.password + " -> rendben a jelszó");
    }
 
  });

});




app.listen(port, () => console.log(`Example app listening on port ${port}!`))