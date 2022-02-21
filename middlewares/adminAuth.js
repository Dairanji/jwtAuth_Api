const jwt=require('jsonwebtoken');
exports.authJwt = (req, res, next) => {
    if (req.cookies && req.cookies.adminToken) {
        jwt.verify(req.cookies.adminToken, "mitra@535jhgfsajf",(err,data) => {
            req.admin=data
            next()
        })
    } else {
        next()
    }
}