import { faker } from '@faker-js/faker';
import axios from 'axios';

// Function to create a random user
function createRandomUser() {
	return {
		username: faker.person.firstName(),
		email: faker.internet.email(),
		password: 'passwerk', //faker.internet.password(),
		balance: parseFloat(faker.finance.amount()), // Ensure balance is a number
	};
}

// Simulate user creation
export async function simulateUserRegister() {
	try {
		const newUser = createRandomUser();

		// Register the new user
		const response = await axios.post(`${process.env.BASE_URL}/sign_up`, {
			user: newUser,
		});

		const userData = response.data;

		// console.log('New user created:', userData);
	} catch (error) {
		if (error instanceof Error) {
			console.error('Error during simulation:', error.message);
		} else {
			console.error('Error during simulation:', error);
		}
	}
}
