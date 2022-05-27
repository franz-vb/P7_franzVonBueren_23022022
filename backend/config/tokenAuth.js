const jwt = require('jsonwebtoken');

/* Verification du token valide*/
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

/* Autorisation pour action sur son compte*/
exports.checkTokenS = (req, res, next) => {
    let token = req.get('Authorization');

    const id = req.body.userId;
    const method = req.method;

    if (token) {
        token = token.slice(7);
        jwt.verify(token, "secretkey", (err, decoded) => {

            if (method === "DELETE" || method === 'PUT' || method === 'POST') {

                if (decoded.result.id == id || decoded.result.groupe === 'admin') {
                    next();
                    
                } else {
                    res.json({
                        success: 0,
                        message: "Access Token invalid"
                    })
                }

            } else {
                res.json({
                    success: 0,
                    message: "Access Token invalid"
                })
            };

        })
    } else {
        res.json({
            success: 0,
            message: 'Access denied !'
        })
    }
}

