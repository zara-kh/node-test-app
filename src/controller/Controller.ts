import { Request, Response } from "express";
const { Author, Book, sequelize } = require("../model/model")
const bcrypt = require("bcrypt")
const uniqid = require("uniqid")

class PostController {
    async register(req: Request, res: Response) {
        if (await Author.findOne({
            where: { email: req.body.email }
        })) {
            res.send({ error: "Login is busy" })
        } else {
            await Author.create({ ...req.body, password: bcrypt.hashSync(req.body.password, 10) })
            res.send({ status: "ok" })
        }
    }
    async login(req: Request, res: Response) {
        const author = await Author.findOne({
            where: {
                email: req.body.email
            }
        })
        if (author) {
            if (bcrypt.compareSync(req.body.password, author.dataValues.password)) {
                const token = uniqid();
                await Author.update({ token }, { where: { id: author.dataValues.id } })
                res.send({ status: "ok", token })
            } else {
                res.send({ error: "invalid password" })
            }
        } else {
            res.send({ error: "invalid email" })
        }
    }
    async getAuthorByToken(req: Request, res: Response) {
        const author = await Author.findOne({ where: { token: req.body.token } })
        if (author) {
            const token = uniqid();
            await Author.update({ token }, { where: { id: author.dataValues.id } })
            res.send({ ...author.dataValues, token })
        } else {
            res.send({ error: "token error" })
        }
    }
    async addBook(req: Request, res: Response) {
        try {
            const loginedAuthor = await Author.findOne({ where: { token: req.body.token } });
            await Book.create({ name: req.body.name, authorId: loginedAuthor.dataValues.id });
            res.send({ status: "ok" });
        } catch (e) {
            res.send({ error: "invalid token" });
        }
    }
    async getMyBooks(req: Request, res: Response) {
        try {
            const loginedAuthor = await Author.findOne({ where: { token: req.body.token } })
            const myBooks = await Book.findAll({ where: { authorId: loginedAuthor.dataValues.id } })
            res.send({ myBooks })
        } catch (e) {
            res.send({ error: "Invalid token" })
        }
    }
    async deleteBookById(req: Request, res: Response) {
        try {
            const loginedAuthor = await Author.findOne({ where: { token: req.body.token } })
            await Book.destroy({ where: { authorId: loginedAuthor.dataValues.id, id: req.body.id } })
            res.send({ status: "ok" })
        } catch (e) {
            res.send({ error: "invalid token" })
        }
    }
}

module.exports = new PostController()