import express from "express";
const router = express.Router();
const PostController = require("../controller/Controller");

router.post("/register", PostController.register);

router.post("/login", PostController.login);

router.post("/getAuthorByToken", PostController.getAuthorByToken);

router.post("/addBook", PostController.addBook);

router.post("/getMyBooks", PostController.getMyBooks);

router.post("/deleteBookById", PostController.deleteBookById);


export default router