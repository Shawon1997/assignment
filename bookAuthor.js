//const { application } = require("express");
const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json())
const connection = () => {
    return mongoose.connect("mongodb+srv://Shawon1997:jaya1997@cluster0.keuhw.mongodb.net/test")
};


const userSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
}, {
    versionKey: false,
    timeseries: true
});
const User = mongoose.model("user", userSchema)

const sectionSchema = new mongoose.Schema({
    name: { type: String, required: true }
}, {
    timeseries: true,
    versionKey: false
})

const Section = mongoose.model("section", sectionSchema)

const bookSchema = new mongoose.Schema({
    sectionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "section",
        required: true,
    },
    name: { type: String, required: true },
    body: { type: String, required: true }
}, {
    versionKey: false,
    timeseries: true
})
const Book = mongoose.model("book", bookSchema)


const authorSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    }

}, {
    versionKey: false,
    timeseries: true
});
const Author = mongoose.model("author", authorSchema)

const bookAuthorSchema = new mongoose.Schema({
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "book",
        required: true,
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "author",
        required: true,
    }
})
const BookAuthor = mongoose.model("bookAuthor", bookAuthorSchema)
const checkoutSchema = new mongoose.Schema({
        bookId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "book",
            required: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
        checkOutTime: { type: Boolean, required: true },
        checkInTime: { type: Boolean, reqired: true }
    })
    //CRUD

app.get("/users", async(req, res) => {
    try {
        const users = await User.find().lean().exec()
        return res.status(200).send(users);
    } catch (err) {
        return res.status(500).send(err.message)
    }
})
app.post("/users", async(req, res) => {
    try {
        const user = await User.create(req.body)
        return res.status(201).send(user);
    } catch (err) {
        return res.status(500).send(err.message)
    }
})
app.get("/author", async(req, res) => {
    try {
        const author = await User.find().lean().exec()
        return res.status(200).send(author);
    } catch (err) {
        return res.status(500).send(err.message)
    }
})
app.post("/author", async(req, res) => {
    try {
        const author = await User.create(req.body)
        return res.status(201).send(author);
    } catch (err) {
        return res.status(500).send(err.message)
    }
})
app.get("/bookauthor", async(req, res) => {
    try {
        const bookauthor = await User.find().lean().exec()
        return res.status(200).send(bookauthor);
    } catch (err) {
        return res.status(500).send(err.message)
    }
})
app.post("/bookauthor", async(req, res) => {
    try {
        const bookauthor = await User.create(req.body)
        return res.status(201).send(bookauthor);
    } catch (err) {
        return res.status(500).send(err.message)
    }
})
app.get("/section", async(req, res) => {
    try {
        const section = await Section.find().lean().exec()
        return res.status(200).send(section);
    } catch (err) {
        return res.status(500).send(err.message)
    }
})
app.post("/section", async(req, res) => {
    try {
        const sectio = await Section.create(req.body)
        return res.status(201).send(sectio);
    } catch (err) {
        return res.status(500).send(err.message)
    }
})

app.listen(3096, async() => {
    try {
        await connection();
    } catch (err) {
        console.log(err)
    }
    console.log("i am in port 3096")
})