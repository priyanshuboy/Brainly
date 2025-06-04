"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const zod_1 = require("zod");
const database_1 = require("../Database/database");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Middleware_1 = require("../middleware/Middleware");
const utils_1 = require("../utils");
const router = express_1.default.Router();
// Signup-endPoint
const app = (0, express_1.default)();
app.use(express_1.default.json());
router.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Received body:", req.body);
    try {
        const Userdetail = zod_1.z.object({
            email: zod_1.z.string().max(30).min(3).email(),
            password: zod_1.z.string().max(30).min(3)
        });
        const Parsedetails = Userdetail.safeParse(req.body);
        if (!Parsedetails.success) {
            res.status(400).json({
                mgs: 'Invalid inputs'
            });
            return;
        }
        const { email, password } = Parsedetails.data;
        const Finduser = yield database_1.UserModel.findOne({ email });
        if (Finduser) {
            res.status(409).json({
                mgs: 'user already exsists'
            });
            return;
        }
        const SecurePassword = yield bcrypt_1.default.hash(password, 5);
        yield database_1.UserModel.create({
            email: email,
            password: SecurePassword
        });
        res.status(200).json({
            mgs: 'User Created'
        });
        return;
    }
    catch (error) {
        res.status(500).json({
            mgs: 'server down'
        });
    }
}));
// Signin-endPoint
router.post('/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Userdetail = zod_1.z.object({
            email: zod_1.z.string().max(30).min(3).email(),
            password: zod_1.z.string().max(30).min(3)
        });
        const Parsedetails = Userdetail.safeParse(req.body);
        if (!Parsedetails.success) {
            res.status(400).json({
                mgs: 'Invalid input'
            });
            return;
        }
        const { email, password } = Parsedetails.data;
        const Finduser = yield database_1.UserModel.findOne({ email });
        if (!Finduser) {
            res.status(404).json({
                mgs: 'User not found'
            });
            return;
        }
        const check = bcrypt_1.default.compare(password, Finduser.password);
        if (!check) {
            res.status(400).json({
                mgs: 'invalid password'
            });
        }
        const secretKey = process.env.JWT_SECRET || 'default';
        const token = jsonwebtoken_1.default.sign({ userId: Finduser._id }, secretKey, {
            expiresIn: '1h'
        });
        res.status(200).json({
            mgs: 'you are signed in',
            token: token
        });
        return;
    }
    catch (error) {
        res.status(500).json({
            mgs: 'server down'
        });
    }
}));
router.post('/content', Middleware_1.middleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const Userid = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    const { title, link, type } = req.body;
    yield database_1.UserContent.create({
        title,
        link,
        type,
        Userid
    });
    res.json({
        mgs: "Content added"
    });
}));
router.get('/contents', Middleware_1.middleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const Userid = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
        const Content = yield database_1.UserContent.find({ UserId: Userid }).populate('email');
        if (!Content) {
            res.status(404).json({
                mgs: 'No content found'
            });
        }
        res.status(200).json({
            Content
        });
    }
    catch (error) {
        res.status(500).json({
            mgs: 'server down'
        });
    }
}));
router.get('/delete/content', Middleware_1.middleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const Userid = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    const deleted = yield database_1.UserContent.findByIdAndDelete({ userId: Userid });
    if (!deleted) {
        res.status(404).json({ mgs: "Content not found" });
        return;
    }
    ;
    res.status(200).json({
        mgs: 'content deleted'
    });
}));
router.post('/brain/share', Middleware_1.middleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const { share } = req.body;
    if (share) {
        const Linkexists = yield database_1.UserLinks.findOne({ userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId });
        if (Linkexists) {
            res.status(409).json({
                mgs: ' already exsists'
            });
            return;
        }
        yield database_1.UserLinks.create({
            hash: (0, utils_1.RandomLinks)(10),
            userId: (_b = req.user) === null || _b === void 0 ? void 0 : _b.userId
        });
    }
    else {
        yield database_1.UserLinks.findByIdAndDelete({
            userId: (_c = req.user) === null || _c === void 0 ? void 0 : _c.userId
        });
    }
    res.status(200).json({
        mgs: ' updated shared link'
    });
}));
router.get('/brain/:sharelink', Middleware_1.middleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = req.params.sharelink;
    const link = yield database_1.UserLinks.findOne({ hash });
    if (!link) {
        res.status(411).json({
            mgs: 'invalid input'
        });
        return;
    }
    const Content = yield database_1.UserContent.findOne({
        userId: link.userId
    });
    const user = yield database_1.UserModel.findOne({
        _id: link.userId
    });
    if (!user) {
        res.status(411).json({
            mgs: ' user not found'
        });
        return;
    }
    res.status(200).json({
        username: user === null || user === void 0 ? void 0 : user.email,
        Content: Content
    });
}));
exports.default = router;
app.listen(5500);
