
class UserController{

    async index(req, res){}

    async create(req,res){
        var {email, name, password} = req.body;

        if(email == undefined){
            res.sendstatus(400);
            res.send("e-mail indefinido");
        }else{
            res.send("e-mail ok")
        }

    }

}

module.exports = new UserController();