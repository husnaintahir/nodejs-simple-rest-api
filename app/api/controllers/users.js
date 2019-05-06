const userModel = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    create: function (req, res, next) {

        userModel.find({ email: req.body.email }, function (err, data) {
            if (err) {
                next(err);
            } else {
                if (data.length > 0) {
                    res.json({
                        statusCode: 200,
                        error: "User already exist",
                        response: null
                    });
                } else {
                    const userData = {
                        email: req.body.email,
                        password: req.body.password,
                        first_name: req.body.first_name
                    };

                    userModel.create(userData, function (err, data) {
                        if (err) {
                            next(err);
                        } else {
                            createReturnJWT(req, res, data);
                        }
                    });
                }
            }
        });

    },

    authenticate: function (req, res, next) {
        if (req.body.social_login) {
            userData = {
                email: req.body.email
            }

            let { image_url, height, width, ext, hash } = req.body

            image_url = `${image_url}&height=${height}&width=${width}&ext=${ext}&hash=${hash}`

            userModel.findOneAndUpdate(
                userData,
                {
                    $set: {
                        email: req.body.email,
                        first_name: req.body.first_name,
                        last_name: req.body.last_name,
                        middle_name: req.body.middle_name,
                        image_url: image_url
                    }
                },
                {
                    upsert: true,
                    new: true
                }, function (err, userInfo) {
                    if (err) {
                        next(err);
                    } else {
                        if (userInfo) {
                            createReturnJWT(req, res, userInfo);

                        } else {
                            res.json({
                                statusCode: 200,
                                error: "Some error occurred",
                                response: null
                            });
                        }
                    }
                });
        } else {
            if (req.body.email && req.body.password) {
                userData = {
                    $and: [{ email: req.body.email }]
                }
                userModel.findOne(userData, function (err, userInfo) {
                    if (err) {
                        next(err);
                    } else {
                        if (userInfo && userInfo.password) {
                            if (bcrypt.compareSync(req.body.password, userInfo.password)) {

                                createReturnJWT(req, res, userInfo);
                            } else {
                                res.json({
                                    statusCode: 200,
                                    error: "Invalid username or password",
                                    response: null
                                });
                            }
                        } else {
                            res.json({
                                statusCode: 200,
                                error: "Invalid username or password",
                                response: null
                            });
                        }

                    }
                });
            } else {
                res.json({
                    statusCode: 200,
                    error: "Input parameter missing",
                    response: null
                });
            }
        }
    },
}

function createReturnJWT(req, res, userInfo) {


    const jwtObj = {
        id: userInfo._id,
        first_name: userInfo.first_name,
        last_name: userInfo.last_name,
        middle_name: userInfo.middle_name,
        email: userInfo.email,
        image_url: userInfo.image_url || undefined
    }

    const token = jwt.sign(jwtObj, req.app.get('secretKey'));
    res.json({
        statusCode: 200,
        error: null,
        response: { jwt: token }
    });

}