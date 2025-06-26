import User from '../models/user.model.js'
import jwt from 'jsonwebtoken'

export const protectedRoute=async(req, res, next)=>{
    const token = req.headers.authorization?.split(' ')[1];
    // It is like : Bearer <token> ... we are concerned with the token
    if(!token){
        return res.status(401).json({message:
            'User not authorized!'
        })
    }
    // if we get a valid token
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
        // decoded contains user id -> search from db , send the data to next middleware without pswd due to security concerns.
        next();
    }catch(err){
        res.status(401).json({message: 'Invalid token!'})
    }
}