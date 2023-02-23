const db = require('./../models');
const md5 = require('md5');
const jwt = require('jsonwebtoken');
function gettoken(string) {
    return jwt.sign(JSON.stringify(string), process.env.ACCESS_KEYL_TOKEN);
}

/**
 * get list of people api
 * @param {*} req
 * @param {*} res
 * @return 
 */

exports.list = async function (req, res) {
    try {
        const listpeople = await db.peoples.findAll({});
        return res.json({
            status: 'success',
            message: 'list of people found',
            data: {
                list: listpeople
            }
        })
    } catch (err) {
        console.log(err);
        return res.json({
            status: 'error',
            message: 'internal server error'
        })
    }
}

/**
 * register people api 
 * @param {*} req
 * @param {*} res
 * @return
 */

exports.register = async function (req, res) {
    try {

        const register = await db.peoples.create({
            username: req.body.username,
            password: md5(req.body.password),
            email: req.body.email,
            dob: req.body.dob,
            phone: req.body.phone,
            nationality: req.body.nationality
        })

        return res.json({
            status: 'success',
            message: 'people registered successfully',
            data: {
                people: register
            }
        })

    } catch (error) {
        console.log(error);
        return res.json({
            status: 'error',
            message: 'unable to register people'
        })
    }
}

/** 
 * login system for people via JWT token
 * @param {*} req
 * @param {*} res
 * @return 
 */

exports.login = async function (req, res) {
    try {
        const login = await db.peoples.findOne({ where: { username: req.body.username, password: md5(req.body.password) } })
        if (!login) {
            console.log("user not found");
        } else {
            return res.json({
                status: 'success',
                message: 'people loggedin successfully',
                data: {
                    people: gettoken(login)
                }
            })
        }
    } catch (error) {
        console.log(error);
        return res.json({
            status: 'error',
            message: 'unable to register people'
        })
    }
}

/**
 * vverify user via token
 *  @param {*} req
 *  @param {*} res
 *  @return 
 */

exports.verify = async function (req, res) {
    try {

        const enctoken = req.headers.authorization.split(' ')[1];
        const token = jwt.verify((enctoken).toString(), process.env.ACCESS_KEYL_TOKEN);
        console.log(token);
        if (!token) {
            console.log('user not logged in');
        } else {
            return res.json({
                status: 'success',
                message: 'people loggedin successfully',
                data: {
                    people: token
                }
            });
        }
    } catch (error) {
        console.log(error);
        return res.json({
            status: 'error',
            message: 'internal server error'
        })
    }
}

/**
 * Create a complain 
 * @param {*} req
 * @param {*} res
 * @return 
 */



exports.createcomplain = async function (req, res) {
    try {
        const enctoken = req.headers.authorization.split(' ')[1];
        const token = jwt.verify((enctoken).toString(), process.env.ACCESS_KEYL_TOKEN);

        if (!token) {
            return res.json({
                status: 'error',
                message: 'token is not a valid'
            })
        } else {

            const post = await db.complains.create({
                userid: token.id,
                matter: req.body.matter,
                complain: req.body.complain,
                createdAt: new Date(),
                updatedAt: new Date()
            })
            return res.json({
                status: "success",
                message: "complain registered successfully",
                data: {
                    complain: post
                }
            })
        }

    } catch (error) {
        console.log(error);
        return res.json({
            status: 'error',
            message: 'internal server error'
        })
    }
}


/**
 * delete a complain 
 * @param {*} req
 * @param {*} res
 * @request
 */

exports.deletecomplain = async function (req, res) {
    try {
        const enctoken = req.headers.authorization.split(' ')[1];
        const token = jwt.verify((enctoken).toString(), process.env.ACCESS_KEYL_TOKEN);

        if (!token) {
            return res.json({
                status: 'error',
                message: 'token is not a valid'
            })
        } else {
            const post = await db.complains.destroy({ where: { userid: token.id } })
            return res.json({
                status: "success",
                message: "complain deleted successfully",
                data: {
                    complain: post
                }
            })
        }
    } catch (error) {
        console.log(error);
        return res.json({
            status: 'error',
            message: 'internal server error'
        })
    }
}


/**
 * list a complain 
 * @param {*} req
 * @param {*} res
 * @request
 */

exports.listcomplian = async function (req, res) {
    try {
        const listcom = await db.complains.findAll({})
        return res.json({
            status: "success",
            message: "list of complin ",
            data: {
                list: listcom
            }
        })

    } catch (error) {
        console.log(error);
        return res.json({
            status: 'error',
            message: 'internal server error'
        })
    }
}
