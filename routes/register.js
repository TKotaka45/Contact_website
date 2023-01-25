const express = require('express')
const router = express.Router()
const User = require('../models/user')

router.get('/', (req, res) => {
    res.render('./userAuth/register', {
        layout: './layouts/layout1',
        user: new User()
    })
})

// New User Path
router.post('/', async (req, res) => {

    const user = new User({
        username: req.body.username,
        password: req.body.password
    })

    try {
        const newUser = await user.save(function (err) {

            //Error handling on send to mongoDB
            // Check for unique username & check username and password entered
            if (err && err.code == 11000) {
                console.log(err.code);
                res.render('./userAuth/register', {
                    layout: './layouts/layout1',
                    user: user,
                    errorMessage: 'Username already in use'
                })

            } else if (err && err.name === "ValidationError") {
                res.render('./userAuth/register', {
                    layout: './layouts/layout1',
                    user: user,
                    errorMessage: 'Please enter Username and Password'
                })
            } else {
                res.render('./userAuth/login', {
                    layout: './layouts/layout1',
                    user: user,
                    errorMessage: 'User successfully created'
                })
            }
        })

    } catch (error) {
        res.render('./userAuth/register', {
            layout: './layouts/layout1',
            user: user,
            errorMessage: "An unknown error occured"
        })
    }

})

module.exports = router