
// új branch


module.exports = function(options) {
  return function(req, res, next) {
 

    const mongoose = require('mongoose');
    let conn2 = mongoose.createConnection('mongodb://localhost:27017/login', {useNewUrlParser: true});

    const jwt = require('jsonwebtoken');

    let loginSchema = new mongoose.Schema({
      username : String ,
      password : String
    });
    
    let login = conn2.model('login', loginSchema);


    let data =  req.body;

    console.log( "felhasználónév - " + data.username);
    console.log("jelszó - " + data.password);
    
    if(req.headers['authorization']){

                          const token = req.headers['authorization'];

                          jwt.verify(token, 'secretkey', (err, authData) => {
                            if(err) {
                              res.sendStatus(403);
                              // res.send("nincs authorisation");
                            } else {
                            
                              console.log("authorization ok");
                            }
                        });
    }
    else{

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
                              // next();
                        }

                      });

}

mongoose.connection.close();

next();
   
  }
}