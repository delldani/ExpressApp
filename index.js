

const bodyParser = require('body-parser');
const cors = require('cors');

const express = require('express')
const app = express()
const port = 8080


let obj = { name: "John", age: 30, city: "New York" };
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