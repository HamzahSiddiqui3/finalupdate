const admin = require("./../database/model/admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



exports.saveUser = async(req, res, next) => {
    try {
        const { name, email, mobile, password } = req.body;
        const encpass = await bcrypt.hash(password, 10);

        const saveUser = new admin({
            name: name,
            email: email,
            mobile: mobile,
            password: encpass
        });
        const admins = await saveUser.save();

        res.status(201).json({
            message: 'success'
        })
    } catch (error) {
        console.log(error)
    }
}



exports.userLogin = async(req, res, next) => {
    try {
        const admins = await admin.findOne({ email: req.body.email });
        if (!admins) {
            return res.status(401).json({
                message: "Authentication failed"
            })
        }
        const check = await bcrypt.compare(req.body.password, admins.password);
        if (!check) {
            return res.status(401).json({
                message: "Authentication failed"
            })
        }

        const token = jwt.sign({ email: admins.email, userId: admins._id, role: admins.admin_role }, "12345", {
            expiresIn: "1h"
        })
        return res.status(200).json({
            accessToken: token,
            expiresIn: 3600,
            adminid: admins._id,
            role:admins.admin_role

        })
    } catch (error) {
        return res.status(401).json({
            message: "Invalid Authentication Credentials!",
            error: error
        })
    }
}