//assasa

const bodyParser = require('body-parser');
const cors = require('cors');

const express = require('express')
const app = express()
const port = 8080


let obj = {array : [{id:0,name: "gizi"},{id:1, name: "józsi"},{id:2, name: "bali"},{id:3, name:"dani"}]};
let myJSON = JSON.stringify(obj);


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
   r.username++;
   console.log(r.username);
   res.send("hali");
  });


app.listen(port, () => console.log(`Example app listening on port ${port}!`))