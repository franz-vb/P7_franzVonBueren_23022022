const jwt = require('jsonwebtoken');

exports.checkToken = (req, res, next) =>{
    let token = req.get('Authorization');

    if (token) {
        token = token.slice(7);
        jwt.verify(token, "secretkey", (err, decoded) => {
            if (err) {
                res.json({
                    success: 0,
                    message: "Token invalid"
                })
            } else {
                next();
            }

        })
    } else {
        res.json({
            success: 0,
            message: 'Access denied !'
        })
    }
}

