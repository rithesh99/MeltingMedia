const express = require("express");
const router = express.Router();

const {getUserById, getUser, updateUser, getAllUsers} = require("../controllers/user");
const { isAdmin} = require("../controllers/auth");

router.param("userId", getUserById)

router.get("/user/:userId", getUser)
router.get("/users", getAllUsers)
router.put("/user/:userId", updateUser)


module.exports = router;