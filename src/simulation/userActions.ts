import { faker } from '@faker-js/faker';
import axios from 'axios';

// Simulate user creation
export async function simulateUserBet() {
	try {
		// the new user
		const userResponse = await axios.get(`${process.env.BASE_URL}/users`);
		const users = userResponse.data;

		// Fetch available games
		const gameResponse = await axios.get(`${process.env.BASE_URL}/games`);
		const games = gameResponse.data;

		// Check if games are available
		if (users.length === 0 || games.length === 0) {
			console.log('No users or games available for betting.');
			return;
		}

		// Randomly select a user and a game
		const user = users[Math.floor(Math.random() * users.length)];
		const game = games[Math.floor(Math.random() * games.length)];

		// Prepare bet data
		const betTypes = [
			'winner',
			'scoreExact',
			'loser',
			'overUnder',
			'firstTeamToScore',
			'halfTimeFullTime',
			'drawNoBet',
		];

		const betType = betTypes[Math.floor(Math.random() * betTypes.length)];
		const picks = ['home', 'away'];
		const pick = picks[Math.floor(Math.random() * picks.length)];

		// Register the new user
		const response = await axios.post(`${process.env.BASE_URL}/sign_in`, {
			user: {
				email: user.email,
				password: 'passwerk',
			},
		});

		const userLoginData = response.data;

		const token = userLoginData.token;

		const bet = {
			game_id: game.id,
			bet_type: betType,
			pick: pick,
			amount: parseFloat(faker.number.float({ min: 1, max: 15 }).toString()), // Random amount between 10 and 100
			odds: parseFloat(
				faker.number.float({ max: 10, fractionDigits: 2 }).toString()
			), // Random odds
		};

		// Place the bet
		const betResponse = await axios.post(
			`${process.env.BASE_URL}/bets`,
			{ bet: bet },
			{ headers: { Authorization: `Bearer ${token}` } }
		);

		// Get the user's bets
		const betHistoryResponse = await axios.get(
			`${process.env.BASE_URL}/users/${user.id}/bets`,
			{ headers: { Authorization: `Bearer ${token}` } }
		);

		// console.log('Bet placed:', betResponse.data);
		// console.log('Bet history:', betHistoryResponse.data);
	} catch (error) {
		if (error instanceof Error) {
			console.error('Error during simulation:', error.message);
		} else {
			console.error('Error during simulation:', error);
		}
	}
}
