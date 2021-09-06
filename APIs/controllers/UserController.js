var User = require("../models/User");
var PasswordToken = require("../models/PasswordToken");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");

var secret = "asodasoihowehfoiefpoif34234823grwebr9942gb";

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

        if(email == undefined || email == "" || email == " "){
            res.statusCode = 400;
            res.send({err: "e-mail indefinido"});
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

    async recoverPassword(req,res){
        var email = req.body.email;
        var result = await PasswordToken.create(email);
        if(result.status){
            console.log(result.token)
            res.send(""+result.token);
        }else{
            res.status(406);
            res.send(result.err)
        }
    }

    async changePassword(req,res){
        var token = req.body.token;
        var password = req.body.password;

        var isTokenValid = await PasswordToken.validate(token);

        if(isTokenValid.status){
            User.changePassword(password,isTokenValid.token.user_id,isTokenValid.token.token);
            res.send("Senha alterada com sucesso!")
        }else{
            res.status(406);
            res.send("Token informado é inválido!")
        }
    }

    async login(req,res){
        var {email, password} = req.body;

        var user = await User.findByEmail(email);

        if(user != undefined){

            var resultado = await bcrypt.compare(password,user.password);

            if(resultado){
                var token =jwt.sign({email: user.email, role: user.role}, secret);

                res.json({token: token});
            }else{
                res.send("Senha incorreta!");
                res.status(406);
            }

        }else{

            res.json({status: false});

        }
    }

}

module.exports = new UserController();