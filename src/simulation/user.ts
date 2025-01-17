import { faker } from '@faker-js/faker';
import axios from 'axios';

// Function to create a random user
function createRandomUser() {
	return {
		username: faker.person.firstName(),
		email: faker.internet.email(),
		password: 'passwerk', //faker.internet.password(),
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
		const token = userData.token;

		// Update the new user
		const update = await axios.put(
			`${process.env.BASE_URL}/users/update`,
			{
				user: {
					username: userData.username,
					balance: parseFloat(
						faker.finance.amount({ min: 1000, max: 1000000 })
					),
				},
			},
			{ headers: { Authorization: `Bearer ${token}` } }
		);

		const updateData = response.data;

		// console.log('New user created:', userData);
		// console.log('update user created:', updateData);
	} catch (error) {
		if (error instanceof Error) {
			console.error('Error during simulation:', error.message);
		} else {
			console.error('Error during simulation:', error);
		}
	}
}
