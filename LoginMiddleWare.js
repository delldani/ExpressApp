
// új branch


module.exports = function(options) {
  return function(req, res, next) {
 

    const jwt = require('jsonwebtoken');


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


}

next();
   
  }
}