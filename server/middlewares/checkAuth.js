

const jwt = require('jsonwebtoken'); // npm install jsonwebtoken
module.exports = (req, res, next) => {
    try {
        // console.log(req);
        const token = req.headers.authorization.split(' ')[1]; // from frontend given as - beare.token , 0th index is bearer and 1st index is token ||'so split and take 1st index'
        const decodedToken = jwt.verify(token, 'secret_key_not_exclusive'); //decoded using verify method in jwt library ||secret key is used to decode - it is generated during login 
        console.log("decodedoken", decodedToken);

        if (decodedToken.role == 1) {
            req.userData = {
                userid: decodedToken.userid,
                username: decodedToken.username,
                role: decodedToken.role,
            };
            console.log('user data', req.userData);
        }

        else if (decodedToken.role == 0) {
            req.adminData = {
                shopid: decodedToken.shop_id,
                username: decodedToken.username,
                shopname: decodedToken.shopname,
                role: decodedToken.role,
            };
            console.log(req.adminData);
        }

        next();

    }
    catch (error) {
        return res.status(401).json({ message: 'Auth failed' });
    }
};