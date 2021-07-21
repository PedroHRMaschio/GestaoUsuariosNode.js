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

    async edit(req,res){
        var {id, email, name, role} = req.body;
        var result = await User.update(id,email,name,role);
        if(result != undefined){
            if(result.status){
                res.send("Usuário atualizado com sucesso")
            }else{
                res.status(400);
                res.json(result.err);
            }
        }else{
            res.status(500);
            res.send("Ocorreu um erro no servidor")
        }
        
    }

    async delete(req,res){
        var id = req.params.id;

        var result = await User.delete(id);

        if(result.status){
            res.send("Usuário deletado com sucesso")
        }else{
            res.status(406)
            res.send(result.err)
        }
    }

}

module.exports = new UserController();