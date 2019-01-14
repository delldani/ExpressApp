//assasa

const bodyParser = require('body-parser');
const cors = require('cors');

const express = require('express')
const app = express()
const port = 8080

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/todo', {useNewUrlParser: true});

let todoSchema = new mongoose.Schema({
  id : String ,
  name : String
});

let todo = mongoose.model('todo', todoSchema);

// let dani = new todo({ id : 1 , name: 'dani' });

// dani.save(function (err, dani) {
//   if (err) return console.error(err);
// });


let r;
todo.find(function (err, todo) {
  if (err) return console.error(err);
  r = todo;
  // console.log(todo);
});

console.log(r);




// let kittySchema = new mongoose.Schema({
//   id : String ,
//   name : String
// });

// let Kitten = mongoose.model('Kitten', kittySchema);

// let silence = new Kitten({ id : 1 , name: 'Silence' });
// let fluffy = new Kitten({ id : 2 , name: 'fluffy' });
//console.log(silence.name);

// fluffy.save(function (err, fluffy) {
//   if (err) return console.error(err);
// });

// Kitten.find(function (err, kittens) {
//   if (err) return console.error(err);
//   console.log(kittens);
// });




let obj = {array : [{id:0,name: "gizi"},{id:1, name: "józsi"},{id:2, name: "bali"},{id:3, name:"dani"}]};

let obj2 = {array : todo};
let myJSON = JSON.stringify(obj2);


app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(bodyParser.json());

app.get('/', (req, res) => res.send(myJSON))

app.post('/', function (req, res) {

   
   let r =  req.body;
  
   console.log( r.array[0].name);
   res.send("hali");
  });


app.listen(port, () => console.log(`Example app listening on port ${port}!`))