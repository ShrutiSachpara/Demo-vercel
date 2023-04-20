const jwt = require("jsonwebtoken");
const { UnAuthorized } = require("../utils/error");
const logger = require('../logger/logger')
const { INVALID_TOKEN_ERROR, AUTHENTICATION_ERROR, TOKEN_NOT_FOUND_ERROR } = require('../utils/constants')
const authenticate = (role) => {
    return (req, res, next) => {
        let token = req.headers["x-access-token"] || req.headers["authorization"];
        if (token) {
            if (token.startsWith("Bearer ")) {
                token = token.slice(7, token.length);
            }
            jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
                if (err) {
                    logger.error(err);
                    next(new UnAuthorized(INVALID_TOKEN_ERROR));
                } else {
                    if (decoded.data.role === role) {
                        req.decoded = decoded;
                        next();
                    }
                    else {
                        next(new UnAuthorized(AUTHENTICATION_ERROR))
                    }
                }
            });
        } else {
            next(new UnAuthorized(TOKEN_NOT_FOUND_ERROR));
        }
    };
}
const generateToken = (data) => {
    return jwt.sign({ data }, process.env.SECRET_KEY, { expiresIn: '1h' });
};


module.exports = {
    authenticate, generateToken
}