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
	return data.map((game: any) => ({
		...game,
		betting_odds: {
			home: Math.random() * 100,
			away: Math.random() * 100,
		},
	}));
}

export default gameDataQueue;
