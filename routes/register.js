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
            if (err) {
                res.render('./userAuth/register', {
                    layout: './layouts/layout1',
                    user: user,
                    errorMessage: 'Username already in use'
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
            errorMessage: error
        })
    }

})

module.exports = router