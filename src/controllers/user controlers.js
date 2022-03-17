const express = require("express");
const User = require("../models/user_model")
const upload = require("../midlewares/upload")
const router = express.Router();


router.get("", async(req, res) => {
    try {
        const users = await User.find().lean().exec()
        return res.status(200).send(users)
    } catch (err) {
        return res.status(500).send(err.message)
    }
})

router.post("", upload.single("profile_pic"), async(req, res) => {
    try {
        const users = await User.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            profile_pic: req.file.path
        })
        return res.status(200).send(users)
    } catch (err) {
        return res.status(500).send(err.message)
    }
})

router.post("/multiple", upload.any("profile_pic"), async(req, res) => {
    try {
        const filePaths = req.files.map((file) => {
            return file.path
        })
        const users = await User.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            profile_pic: req.file.path
        })
        return res.status(200).send(users)
    } catch (err) {
        return res.status(500).send(err.message)
    }
})
module.exports = router;