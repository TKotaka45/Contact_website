const express = require('express')
const router = express.Router()
const User = require('../models/user')

router.get('/', (req, res) => {
    res.render('./userAuth/login', {
        layout: './layouts/layout1',
        user: new User()
    })
})

router.post('/', async (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    })

    try {
        const loguser = await User.findOne({
            username: req.body.username,
            password: req.body.password
        })
        if (loguser) {
            res.redirect('./homepage')
        } else {
            res.render('./userAuth/login', {
                user:user,
                errorMessage: "Log in failed"
            })
        }
    }
    catch (error) {
        res.render('./userAuth/login', {
            user: user,
            errorMessage: "Log in error occured"
        })
    }


})

module.exports = router