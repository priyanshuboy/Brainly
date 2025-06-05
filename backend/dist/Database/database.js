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
exports.UserLinks = exports.UserContent = exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
function MongoConnect() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect('MONGODB_URL');
            console.log('Database connected');
        }
        catch (error) {
            console.log(error);
        }
    });
}
MongoConnect();
const schema = mongoose_1.default.Schema;
const userSchema = new schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
const type = ['image', 'vedio', 'audio', 'link'];
const ContentSchema = new schema({
    title: { type: String, required: true },
    link: { type: String, required: true },
    type: { type: String, enum: type, required: true },
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: true }
});
const ShareSchema = new schema({
    hash: { type: String },
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: true, unique: true }
});
const UserModel = mongoose_1.default.model('User', userSchema);
exports.UserModel = UserModel;
const UserContent = mongoose_1.default.model('Content', ContentSchema);
exports.UserContent = UserContent;
const UserLinks = mongoose_1.default.model('Links', ShareSchema);
exports.UserLinks = UserLinks;
