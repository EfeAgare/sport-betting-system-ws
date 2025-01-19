import Queue from 'bull';
import axios from 'axios';
import { getPubClient } from '../redis';
const gameDataQueue = new Queue('gameDataQueue');

gameDataQueue.process(async (job) => {
	try {
		const response = await axios.get(`${process.env.BASE_URL}/games`);
		const gameData = response.data;

		const processedData = processGameData(gameData);

		// Publish processed data to Redis for WebSocket server to send to clients
		const redisClient = getPubClient(); // Get the publish Redis client
		await redisClient.publish(
			'game_data_updates',
			JSON.stringify(processedData)
		);
	} catch (error) {
		console.error('Error fetching game data:', error);
	}
});

function processGameData(data: any) {
  try {
    // Ensure `data.games` exists and is an array
    if (!data.games || !Array.isArray(data.games)) {
      throw new Error("Invalid data format: Expected 'games' to be an array.");
    }

    // Process each game in the `games` array
    const processedGames = data.games.map((game: any) => ({
      ...game,
      betting_odds: {
        home: Math.random() * 100,
        away: Math.random() * 100,
      },
    }));

    return {
      games: processedGames,
      meta: data.meta, // Preserve the meta object
    };
  } catch (error) {
    console.error("Error processing game data:", error);
    return {
      games: [],
      meta: data?.meta || {}, // Return empty games array and preserve meta if available
    };
  }
}

export default gameDataQueue;
