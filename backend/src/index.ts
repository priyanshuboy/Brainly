import express = require('express');
import dotenv from 'dotenv';
import UserRouter from './Routes/user';
import cors from "cors";

dotenv.config();

const app = express();

// Optional: Enable CORS if needed
// app.use(cors({
//   origin: 'http://localhost:5173'  
// }));

app.use(express.json());
app.use('/api/v1/user', UserRouter);

// ✅ Start the server with confirmation
const PORT = 3000;

app.listen(PORT, (err?: any) => {
  if (err) {
    console.error(`❌ Server failed to start on port ${PORT}`, err);
  } else {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
  }
});
