const jwt = require("jsonwebtoken");

module.exports = async(req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodeToken = jwt.verify(token, "12345");
        req.userData = {
            email: decodeToken.email,
            userId: decodeToken.userId,
            role: decodeToken.role
        }
        next();
    } catch (error) {
        res.status(401).json({
            message: "You are not Authenticated!"
        })
    }
}