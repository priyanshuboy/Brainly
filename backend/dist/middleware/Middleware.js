"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.middleware = middleware;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function middleware(req, res, next) {
    var _a;
    const Token = (_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.split('')[1];
    if (!Token) {
        res.status(401).json({
            mgs: 'Access denied : no token provided'
        });
        return;
    }
    try {
        const secretKey = process.env.JWT_SECRET || 'default';
        const verify = jsonwebtoken_1.default.verify(Token, secretKey);
        req.user = verify;
        next();
    }
    catch (error) {
        res.status(400).json({
            mgs: 'invalid token'
        });
        return;
    }
}
