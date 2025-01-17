import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { setupRedis } from "./redis";
import gameDataQueue from "./workers/gameDataWorker";
import { simulateGame } from "./simulation/game";
import { simulateUserRegister } from "./simulation/user";
import { simulateUserBet } from "./simulation/userActions";
import dotenv from 'dotenv'; 

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

setupRedis(io);

async function runSimulations() {
  await simulateUserRegister();
  await simulateGame();
  await simulateUserBet();
  setTimeout(runSimulations, 30000);
}

runSimulations();

// Add a job to the queue to fetch game data periodically
setInterval(() => {
  console.log("Adding job to fetch game data");
  gameDataQueue.add({});
}, 60000); // Fetch every minute (adjust as needed)

io.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("disconnect", () => console.log("Client disconnected"));
});

httpServer.listen(3001, () => console.log("Server running on port 3001"));
