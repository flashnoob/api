const router = require("express").Router();
const User = require("../models/users.model");
const users_controller = require("../controllers/users.controller");


router.get('/', users_controller.user_getall);

router.get('/:id', users_controller.user_details);
router.post('/check', users_controller.verify_email);

router.put('/:id/update', users_controller.user_update);

router.post("/create", users_controller.user_create);
router.post("/login", users_controller.user_sign_in);

router.delete('/:id/delete', users_controller.user_delete);

module.exports = router;
