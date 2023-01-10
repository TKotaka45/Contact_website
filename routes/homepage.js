const express = require('express')
const user = require('../models/user')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('./homepage', {
        user: new user(),
        layout: './layouts/layout2.ejs'
    })
})

module.exports = router