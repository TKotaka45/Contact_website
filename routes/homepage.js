const { render } = require('ejs')
const express = require('express')
const user = require('../models/user')
const router = express.Router()

router.get('/:_id', async (req, res) => {
    const id = req.params._id
    try {
        const userLogin = await user.findById(id)
        if (userLogin == null) {
            res.redirect('/login')
        } else {
            res.render('./UI/homepage', {
                layout: "./layouts/layout2",
                user: userLogin
        })
        }
    } catch {
        res.redirect('/login')
    }
})

module.exports = router