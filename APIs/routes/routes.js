var express = require("express");
var app = express();
var router = express.Router();
var HomeController = require("../controllers/HomeController");
var UserController = require("../controllers/UserController");
const User = require("../models/User");

//Rotas tipo GET
router.get('/', HomeController.index);
router.get("/user", UserController.index);
router.get("/user/:id", UserController.findUser)

//Rotas tipo POST
router.post("/user", UserController.create);
router.post("/recoverpassword", UserController.recoverPassword);

//Rotas tipo PUT
router.put("/user", UserController.edit);

//Rotas tipo DELETE
router.delete("/user/:id", UserController.delete);


module.exports = router;