const jsonWebToken = require('jsonwebtoken');

module.exports = (req, res, next) =>{
    const authHeader = req.get('Authorization');
    if (!authHeader){
        req.isAuth = false;
        return next();
    }
    const token = authHeader.split(' ')[1]; //Authorization: Bearer tokenData
    if(!token || token === ''){
        req.isAuth = false;
        return next();
    }
    try{
        tokenVerification = jsonWebToken.verify(token, 'ThisIsAKeyForHashingTheTokenForSecurity');
    }
    catch{
        req.isAuth = false;
        return next();
    }
    if(!tokenVerification){
        req.isAuth = false;
        return next();
    }
    req.isAuth = true;
    req.userId = tokenVerification.userId;
    next();
}