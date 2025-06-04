
import jwt from 'jsonwebtoken';
import { Request, Response ,NextFunction, RequestHandler } from 'express';

interface JwtPayload {
  userId: string; // Add more fields if needed
}
export interface AuthRequest extends Request {
  user?: JwtPayload;
}

export function middleware (req: AuthRequest,res : Response,next : NextFunction):void {
    const Token = req.headers['authorization']?.split('')[1];

    if(!Token){
           res.status(401).json({
            mgs : 'Access denied : no token provided'
        })
        return
    }

    try{
         const secretKey = process.env.JWT_SECRET || 'default';
         const verify = jwt.verify(Token ,secretKey) as JwtPayload;
         req.user= verify; 
       next();

        }catch(error){
             res.status(400).json({
                mgs : 'invalid token'
            })
            return
        }
    }

 