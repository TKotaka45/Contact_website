<<<<<<< HEAD
const express = require('express')
const router = express.Router()
const User = require('../models/user')

router.get('/', (req, res) => {
    res.render('./user/login', {
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
            res.render('./user/homepage', {
                user: user
            })
        } else {
            res.render('/', {
                errorMessage: "Log in failed"
            })
        }
    }
    catch (error) {
        res.render('/', {
            user: user,
            errorMessage: "Log in error occured"
        })
    }


})

=======
const express = require('express')
const router = express.Router()
const User = require('../models/user')

router.get('/', (req, res) => {
    res.render('./user/login', {
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
            res.render('./user/homepage', {
                user: user
            })
        } else {
            res.render('/', {
                errorMessage: "Log in failed"
            })
        }
    }
    catch (error) {
        res.render('/', {
            user: user,
            errorMessage: "Log in error occured"
        })
    }


})

>>>>>>> da00b4ab8808edc54e00810eb49979dddfbb40cd
module.exports = router