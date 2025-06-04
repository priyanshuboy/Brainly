"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const dotenv_1 = __importDefault(require("dotenv"));
const user_1 = __importDefault(require("./Routes/user"));
dotenv_1.default.config();
const app = express();
// Optional: Enable CORS if needed
// app.use(cors({
//   origin: 'http://localhost:5173'  
// }));
app.use(express.json());
app.use('/api/v1/user', user_1.default);
// ✅ Start the server with confirmation
const PORT = 3000;
app.listen(PORT, (err) => {
    if (err) {
        console.error(`❌ Server failed to start on port ${PORT}`, err);
    }
    else {
        console.log(`✅ Server is running on http://localhost:${PORT}`);
    }
});
