import jwt from 'jsonwebtoken';

const cookieJwtAuth = (req, res, next) => {
    const {token} = req.cookies;

    try {
        const {MY_JWT_SECRET} = process.env;
        const user = jwt.verify(token, MY_JWT_SECRET);
        req["user"] = user; 
        next();
    } catch (error) {
        res.clearCookie("token");
        res.status(400).send();
    }
};

export default cookieJwtAuth;