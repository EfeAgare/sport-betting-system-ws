import { faker } from '@faker-js/faker';
import axios from 'axios';

// Function to create a random game with events
function createRandomGame() {
	const events: {
		event_type: 'goal' | 'foul' | 'corner';
		team: 'home' | 'away';
		player: string;
		minute: number;
	}[] = [];
	const numberOfEvents = faker.number.int({ min: 1, max: 5 }); // Random number of events

	for (let i = 0; i < numberOfEvents; i++) {
		events.push({
			event_type: faker.helpers.arrayElement(['goal', 'foul', 'corner']),
			team: faker.helpers.arrayElement(['home', 'away']),
			player: `Player ${faker.number.int({ min: 1, max: 10 })}`,
			minute: faker.number.int({ min: 1, max: 90 }),
		});
	}

	return {
		home_team: `Team ${faker.number.int({ min: 1, max: 10 })}`, // Random home team
		away_team: `Team ${faker.number.int({ min: 1, max: 10 })}`, // Random away team
		home_score: faker.number.int({ min: 0, max: 5 }), // Random home score
		away_score: faker.number.int({ min: 0, max: 5 }), // Random away score
		time_elapsed: faker.number.int({ min: 0, max: 90 }), // Random time elapsed
		status: 'scheduled',
		events_attributes: events, // Include generated events
	};
}

// Simulate game creation
export async function simulateGame() {
	try {
		const game = createRandomGame(); // Create a random game with events

		// Send the game data to the backend
		const response = await axios.post(`${process.env.BASE_URL}/games`, {
			game: game,
		});

		// console.log('New game created:', response.data); // Log the response from the server
	} catch (error) {
		if (error instanceof Error) {
			console.error('Error during simulation:', error.message, error.name);
		} else {
			console.error('Error during simulation:', error);
		}
	}
}
