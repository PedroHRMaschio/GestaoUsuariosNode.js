var express = require("express");
var app = express();
var router = express.Router();
var HomeController = require("../controllers/HomeController");
var UserController = require("../controllers/UserController");
var AdminAuth = require("../middleware/AdminAuth");
var UserAuth = require("../middleware/UserAuth");

//Rotas tipo GET
router.get('/', HomeController.index);
router.get("/user",AdminAuth, UserController.index);
router.get("/user/:id",AdminAuth, UserController.findUser)

//Rotas tipo POST
router.post("/user", UserController.create);
router.post("/recoverpassword",UserAuth, UserController.recoverPassword);
router.post("/changepassword",UserAuth, UserController.changePassword);
router.post("/login",UserController.login);
router.post("/validate",AdminAuth,HomeController.validate);

//Rotas tipo PUT
router.put("/user",UserAuth, UserController.edit);

//Rotas tipo DELETE
router.delete("/user/:id",AdminAuth, UserController.delete);


module.exports = router;