
var jwt = require('jsonwebtoken');

const middlewareFunc = (req, res, next) => {

    const token = clearToken(req.headers.authorization);
  
    jwt.verify(token, secretOrCert, options, (err, decoded) => {
        if (err) {
            res.status(403).json(isEmpty(err) ? { message: 'Wrong token!' } : err);
        } else {
            req.tokenData = decoded;
            next();
        }
    });
};
module.exports = middlewareFunc;
