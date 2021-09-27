const user = require("./../database/model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const users = require("./../database/model/user");



exports.saveUser = async (req, res, next) => {
    try {
        const { u_name, u_email, u_mobile, u_password, u_address, u_orders } = req.body;
        console.log(req.body);
        const encpass = await bcrypt.hash(u_password, 10);
        const saveUser = new user({
            u_name: u_name,
            u_email: u_email,
            u_mobile: u_mobile,
            u_address: u_address,
            u_orders: u_orders,
            u_password: encpass
        });
        console.log(saveUser)
        const users = await saveUser.save();

        res.status(201).json({
            message: 'success',
            body: users
        })
    } catch (error) {
        console.log(error)
    }
}



exports.userLogin = async (req, res, next) => {
    try {
        const users = await user.findOne({ u_email: req.body.email });
        if (!users) {
            return res.status(401).json({
                message: "Authentication failed"
            })
        }
        const check = await bcrypt.compare(req.body.password, users.u_password);

        if (!check) {
            return res.status(401).json({
                message: "Authentication failed"
            })
        }


        console.log(users);
        const token = jwt.sign({ email: users.u_email, userId: users._id, role: "user" }, "12345", {
            expiresIn: "1h"
        })

        return res.status(200).json({
            accessToken: token,
            expiresIn: 3600,
            userid: users._id,
            role:users.role
        })
    } catch (error) {
        return res.status(401).json({
            message: "Invalid Authentication Credentials!",
            error: error
        })
    }
}


exports.getUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const userDetail = await user.findById({ _id: id });
        return res.status(200).json({
            message: "success",
            users: userDetail,
            
        })
    } catch (error) {
        console.log(error)
    }
}