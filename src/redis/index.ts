import { createClient } from 'redis';
import { Server } from 'socket.io';

let pubClient: ReturnType<typeof createClient>;
let subClient: ReturnType<typeof createClient>;

export const setupRedis = async (io: Server) => {
  pubClient = createClient();
  subClient = pubClient.duplicate();

  pubClient.on('error', (err) => {
    console.error('Redis client error', err);
  });
  
  subClient.on('error', (err) => {
    console.error('Redis client error', err);
  });

  await pubClient.connect().catch(err => {
    console.error('Failed to connect to Redis:', err);
  });

  await subClient.connect().catch(err => {
    console.error('Failed to connect to Redis:', err);
  });

  subClient.subscribe('game_updates', (message) => {
    try {
      const gameUpdate = JSON.parse(message);
      io.emit('game_updates', gameUpdate);
    } catch (error) {
      console.error('Failed to parse game update message', error);
    }
  });

  subClient.subscribe('leaderboard_updates', (message) => {
    try {
      const leaderboard = JSON.parse(message);
      io.emit('leaderboard_update', leaderboard);
    } catch (error) {
      console.error('Failed to parse leaderboard message', error);
    }
  });

  console.log("Subscribed to 'game_updates' and 'leaderboard_updates'.");
};

export const getPubClient = () => {
  if (!pubClient) {
    throw new Error('Publish Redis client is not initialized');
  }
  return pubClient;
};