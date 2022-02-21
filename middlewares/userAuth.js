const jwt=require('jsonwebtoken');
exports.authJwt = (req, res, next) => {
    if (req.cookies && req.cookies.authToken) {
        jwt.verify(req.cookies.authToken, "mitra@535jhgfsajf",(err,data) => {
            req.student_register=data
            next()
        })
    } else {
        next()
    }
}