const bcrypt = require("bcrypt");
const Users = require("../models/user");
const jwt = require("jsonwebtoken");

exports.add_user = (req, res) => {
    const email = req.body.email;
    Users.sync()
        .then(() => {
            Users.findAll({ where: { email: email } })
                .then((user) => {
                    if (user.length >= 1) {
                        return res.status(409).json({
                            message: 'User Already exist'
                        })
                    } else {
                        bcrypt.hash(req.body.password, 10, (err, hash) => {
                            req.body.password = hash;
                            if (err) {
                                return res.status(500).json({
                                    error: err
                                });
                            } else {
                                const params = (req.body)
                                Users.create(params)
                                    .then((response) => {
                                        res.status(201).json({
                                            message: 'User created successfully'
                                        })
                                    })
                                    .catch((err) => {
                                        res.status(500).json({
                                            error: err,
                                        });
                                    })

                            }
                        })

                    }
                })

        })
        .catch((err) => {
            res.status(500).json({
                error: err,
            });
        })

};

exports.login = (req, res) => {
    const { email, password } = req.body;

    Users.findAll({ where: { email: email } })
        .then(user => {

            if (user.length < 1) {
                return res.status(404).json({
                    message: 'Email not found'
                });
            } else {
                const User = user[0];
                bcrypt.compare(password, User.password, (ismatch, result) => {
                    if (result) {
                        const token = jwt.sign({
                            email: user[0].email,
                            first_name: user[0].first_name
                        }, process.env.JWT_KEY, { expiresIn: '24h' });
                        return res.status(200).json({
                            message: "Login successfully",
                            User,
                            token,
                        });

                    } else {
                        res.status(401).json({
                            message: "Username or Password is incorrect.",
                        });
                    }
                });
            }


        })
        .catch(err => {
            console.log('error', err)
            res.status(500).json({

                error: err,
            });
        });
};

// exports.forgot_password = (req, res) => {
//     Users.findOne({ where: { email: req.body.email } })
//         .then((user, err) => {
//             if (err || !user) {
//                 res.status(404).json({
//                     error: 'Email does not exists'
//                 })
//             } else {
//                 res.status(200).json({
//                     message: 'Email is available for DB'
//                 })
//             }
//         })
//         .catch((err) => {
//             res.status(500).json({
//                 error: err,
//             });
//         })
// };

// exports.resetPassword = (req, res, next) => {
//     Users.findOne({ where: { email: req.body.email } })
//         .then((user, err) => {
//             if (err || !user) {
//                 res.status(404).json({
//                     error: 'Email does not exists'
//                 })
//             } else {
//                 bcrypt.hash(req.body.newPassword, 10, (err, hash) => {
//                     if (err) {
//                         return res.status(500).json({
//                             error: err
//                         });
//                     }
//                     Users.update({ password: hash }, { where: { email: req.body.email } })
//                         .then(result => {
//                             return res.status(200).json({
//                                 message: 'Your password has been changed '
//                             });
//                         })
//                         .catch(result => {
//                             return res.status(500).json({
//                                 error: 'Unable to Reset Password. Try Again'
//                             });
//                         });
//                 });
//             }
//         })
//         .catch((err) => {
//             res.status(500).json({
//                 error: err,
//             });
//         })
// };

exports.all_users = (req, res) => {
    Users.findAll().then(users => {
        return (
            res.status(200).json({
                message: 'All Users',
                data: users
            })
        )

    });
};

// exports.update_user = (req, res) => {
//     const params = req.body
//     const id = req.params.id;
//     Users.update(params, { where: { id: id } })
//         .then((user) => {
//             res.status(200)
//                 .json({ message: "Users updated successfully" });
//         })
//         .catch((error) => {
//             res.status(500).json({ message: error });
//         })
// };


// exports.bulk_status_change = (req, res) => {
//     let ids = req.body.id;
//     Users.update({ status: req.body.status }, { where: { id: ids } })
//         .then((users) => {
//             res.status(200).json({
//                 message: 'Status updated'
//             })
//         })
//         .catch((err) => {
//             res.status(500).json({
//                 error: err
//             });
//         })
// };