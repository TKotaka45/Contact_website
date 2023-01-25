const { render } = require('ejs')
const express = require('express')
const user = require('../models/user')
const router = express.Router()

// User homepage (Will soon display all of users contacts)
router.get('/:_id', async (req, res) => {
    const id = req.params._id

    const userExists = await checkUser(id)
    if (userExists) {
        res.render('./UI/user', {
            layout: "./layouts/layout2",
            user: userExists,
            link: "/user/" + userExists._id,
            editlink: "/user/" + userExists._id + '/edituser',
        })
    } else {
        res.redirect('/login')
    }
})


// Edit User Route
router.get('/:_id/edituser', async (req, res) => {
    const id = req.params._id
    const userExists = await checkUser(id)

    if (userExists) {

        res.render('./UI/editUser', {
            layout: "./layouts/layout2",
            user: userExists,
            link: "/user/" + userExists._id,
            postLink: '/user/' + userExists._id + '/edituser',
            editlink: "/user/" + userExists._id + '/edituser',
        })
    } else {
        res.redirect('/login')
    }
})

router.post('/:_id/edituser', async (req, res) => {
    const id = req.params._id
    const userExists = await checkUser(id);

    if (req.body.password1 == req.body.password2) {
        try {
            const updateUser = await user.findOne({ _id: id });
            updateUser.overwrite({
                username: req.body.username,
                password: req.body.password1
            });
            await updateUser.save(function (err) {
                // Error handling Mongoose and checking for username uniqueness
                if (err && err.code == 11000) {
                    console.log(err.code);
                    res.render('./UI/editUser', {
                        layout: "./layouts/layout2",
                        user: userExists,
                        link: "/user" + userExists._id,
                        postLink: '/user/' + userExists._id + '/edituser',
                        errorMessage: "Username already in use"
                    })
                } else if (err) {
                    console.log(err.code);
                    res.render('./UI/editUser', {
                        layout: "./layouts/layout2",
                        user: userExists,
                        link: "/user" + userExists._id,
                        postLink: '/user/' + userExists._id + '/edituser',
                        errorMessage: "An unknown error occured"
                    })
                } else {
                    res.render('./UI/user', {
                        layout: "./layouts/layout2",
                        user: userExists,
                        link: "/user/" + userExists._id,
                        editlink: "/user/" + userExists._id + '/edituser',
                        errorMessage: "User information Updated"
                    })
                }
            });
        } catch (error) {
            res.render('./UI/editUser', {
                layout: "./layouts/layout2",
                user: userExists,
                link: "/user" + userExists._id,
                postLink: '/user/' + userExists._id + '/edituser',
                errorMessage: "An unknown error occured"
            })
        }

    } else {
        res.render('./UI/editUser', {
            layout: "./layouts/layout2",
            user: userExists,
            link: "/user/" + userExists._id,
            postLink: '/user/' + userExists._id + '/edituser',
            errorMessage: "Passwords must match"
        })
    }
})

// Create new Contact Route
router.get('/:_id/addcontact', async (req, res) => {
    const id = req.params._id

    const userExists = await checkUser(id);

    if (userExists) {
        res.render('./UI/createContact', {
            layout: "./layouts/layout2",
            user: userExists
        })
    } else {
        res.redirect('/login')
    }
})


// Function to check userId in url to clean routes
//Returns false if the userID does not exist of if there is an error
async function checkUser(id) {
    try {
        const userLogin = await user.findById(id)
        if (userLogin == null) {
            return (null)
        } else {
            return (userLogin)
        }
    } catch {
        return (null)
    }
}

module.exports = router