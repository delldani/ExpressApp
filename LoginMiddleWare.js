
module.exports = function(options) {
  return function(req, res, next) {
  //   // Implement the middleware function based on the options object
  //   // res.send("middleware");

    const mongoose = require('mongoose');
    let conn2 = mongoose.createConnection('mongodb://localhost:27017/login', {useNewUrlParser: true});

    const jwt = require('jsonwebtoken');

    let loginSchema = new mongoose.Schema({
      username : String ,
      password : String
    });
    
    let login = conn2.model('login', loginSchema);


    let data =  req.body;

  //   // console.log( data.username);
  //   // console.log(data.password);
    
  //   // res.send("minden ok");

    if(req.headers['authorization']){

                          const token = req.headers['authorization'];

                          jwt.verify(token, 'secretkey', (err, authData) => {
                            if(err) {
                              res.sendStatus(403);
                              // res.send("nincs authorisation");
                            } else {
                            
                              console.log("middleware aut ok");
                              // next();

                            }
                        });
    }
    else{

                      login.findOne({ 'username': data.username, 'password': data.password }, 'password', function (err, person) {
                        if (err) return handleError(err);
                      
                        if(!person){
                          res.sendStatus(403);
                          console.log("nincs ilyen elem middleware");
                          // res.send("nincs ilyen személy");
                        }
                        else{
                                const user = {
                                  username: data.username,
                                  password: data.password
                                };

                                jwt.sign({user}, 'secretkey', { expiresIn: '30s' }, (err, token) => {
                                  res.json({
                                    token
                                  });
                                });

                              console.log(person.password + "rendben a jelszó");
                              // next();
                        }

                      });

}

mongoose.connection.close();

next();
   
  }
}