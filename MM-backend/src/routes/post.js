const express = require("express");
const router = express.Router();


const {getPostById, createPost, getPost, deletePost, updatePost, getAllPosts} = require("../controllers/post");
const {isAdmin} = require("../controllers/auth");
const {getUserById} = require("../controllers/user");

//ALL OF PARAMS
router.param("userId", getUserById);
router.param("postId", getPostById);


//ALL OF ACTUAL ROUTES
//CREATE ROUTE
router.post("/post/create/:userId", createPost);

//READ ROUTES
router.get("/post/:postId", getPost);

//DELETE ROUTE
router.delete("/post/:postId", deletePost);


//UPDATE ROUTE
router.put("/post/:postId", updatePost);


//LISTING ROUTE
router.get("/posts", getAllPosts)




module.exports = router;