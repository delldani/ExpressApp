
const bodyParser = require('body-parser');
const cors = require('cors');

const express = require('express')
const app = express()
const port = 8080

const jwt = require('jsonwebtoken');

app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(bodyParser.json());


const mongoose = require('mongoose');
let conn = mongoose.createConnection('mongodb://localhost:27017/todo', {useNewUrlParser: true});
let conn2 = mongoose.createConnection('mongodb://localhost:27017/login', {useNewUrlParser: true});

let todoSchema = new mongoose.Schema({
  id : String ,
  name : String
});

let todo = conn.model('todo', todoSchema);


let loginSchema = new mongoose.Schema({
  username : String ,
  password : String
});

let login = conn2.model('login', loginSchema);



// let todo = mongoose.model('todo', todoSchema);

// let dani = new todo({ id : 1 , name: 'dani' });

// dani.save(function (err, dani) {
//   if (err) return console.error(err);
// });

// let obj = {array : [{id:0,name: "gizi"},{id:1, name: "józsi"},{id:2, name: "bali"},{id:3, name:"dani"}]};
// let myJSON = JSON.stringify(obj);



app.get('/', (req, res) =>{ 


            const bearerHeader = req.headers['authorization'];
              console.log(bearerHeader);

              jwt.verify(bearerHeader, 'secretkey', (err, authData) => {
                if(err) {
                  res.sendStatus(403);
                } else {
                
                  todo.find(function (err, todo) {
                    if (err) return console.error(err);
                    let obj = {array : todo};
                    let myJSON = JSON.stringify(obj);
                    res.send(myJSON);

                  });
                }

            });

});



app.post('/login', (req, res) =>{ 

          let data =  req.body;

          console.log( data.username);
          console.log(data.password);
          
          // res.send("minden ok");



        login.findOne({ 'username': data.username, 'password': data.password }, 'password', function (err, person) {
          if (err) return handleError(err);
        
          if(!person)console.log("nincs ilyen elem");
          else{
                  const user = {
                    username: person.username,
                    password: person.password
                  }

                  jwt.sign({user}, 'secretkey', { expiresIn: '30s' }, (err, token) => {
                    res.json({
                      token
                    });
                  });

                console.log(person.password);
          }

        });


});







app.post('/', function (req, res) {
   
        let data =  req.body;

       
        console.log( data.array[0].name);
        res.send("ok");

        todo.deleteMany({}, function (err) {
          if (err) return handleError(err);
        });


        todo.insertMany(data.array, function(err) {
          if (err) return handleError(err);
        });

});


app.listen(port, () => console.log(`Example app listening on port ${port}!`))