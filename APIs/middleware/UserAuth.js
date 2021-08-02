var jwt = require("jsonwebtoken");

var secret = "asodasoihowehfoiefpoif34234823grwebr9942gb";

module.exports = function(req, res, next){

    const authToken = req.headers["authorization"];

    if(authToken != undefined){

        const bearer = authToken.split(" ");
        var token = bearer[1]

        try{
            
            var decoded = jwt.verify(token,secret);
            next();

        }catch(err){
            res.send("Ooops... você não possui permissões o suficiente para entrar neste local!");
            res.status(403);
            return;
        }
        
    }else{
        res.send("Ooops... você não possui permissões o suficiente para entrar neste local!");
        res.status(403);
        return;
    }

}