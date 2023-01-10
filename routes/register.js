const express = require('express')
const router = express.Router()
const User = require('../models/user')

router.get('/', (req, res) => {
    res.render('./user/register', {
        layout: './layouts/layout1',
        user: new User()
    })
})

// New User Path
router.post('/', async (req, res) => {
    //First Check if the user has entered a username and password
    const user = new User({
        username: req.body.username,
        password: req.body.password
    })

    try {
        const newUser = await user.save(function (err) {
            if (err) {
                res.render('./user/register', {
                    layout: './layouts/layout1',
                    user: user,
                    errorMessage: 'Username already in use'
                })
            } else {
                res.render('./user/login', {
                    layout: './layouts/layout1',
                    user: user,
                    errorMessage: 'User successfully created'
                })
            }
        })

    } catch (error) {
        res.render('./user/register', {
            layout: './layouts/layout1',
            user: user,
            errorMessage: error
        })
    }

})

module.exports = router