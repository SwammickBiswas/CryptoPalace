import express from 'express';
import cors from 'cors';
import "dotenv/config";
import connectDB from './configs/db.js';
import userRouter from './routes/userRoutes.js';
import coinRouter from './routes/coinRoutes.js';
import historyRouter from './routes/historyRoutes.js';
import './cronJob.js'; 

const app = express();

app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
  res.send("Server is live!");
})

app.use("/api/user", userRouter);
app.use("/api/coins", coinRouter);
app.use("/api/history", historyRouter);

const port = process.env.PORT || 4000;

const startServer = async () => {
  await connectDB();
  app.listen(port, () => console.log(`Server running on port ${port}`));
};

startServer();
