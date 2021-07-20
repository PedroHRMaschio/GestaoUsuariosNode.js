var User = require("../models/User");

class UserController{

    async index(req, res){
        var users = await User.findAll();

        res.json(users);
    }

    async findUser(req,res){
        var id = req.params.id;
        var user = await User.findById(id);
        if(user == undefined || user == []){
            res.status(404);
            res.send("Usuário não encontrado");
            return;
        }else{
            res.json(user)
        }
    }

    async create(req,res){
        var {email, name, password} = req.body;

        if(email == undefined){
            res.status(400);
            res.send("e-mail indefinido");
            return;
        }

        var emailExists = await User.findEmail(email);

        if(emailExists){
            res.status(406);
            res.json({err: "O e-mail informado já possui cadastro!"})
        }

        await User.new(email,password,name);

        res.send("Dados informados ok!");

    }

}

module.exports = new UserController();