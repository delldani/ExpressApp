
const bodyParser = require('body-parser');
const cors = require('cors');

const express = require('express')
const app = express()
const port = 8080

app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(bodyParser.json());


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

// let obj = {array : [{id:0,name: "gizi"},{id:1, name: "józsi"},{id:2, name: "bali"},{id:3, name:"dani"}]};
// let myJSON = JSON.stringify(obj);



app.get('/', (req, res) =>{ 

        todo.find(function (err, todo) {
          if (err) return console.error(err);
          let obj = {array : todo};
          let myJSON = JSON.stringify(obj);
          res.send(myJSON);
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