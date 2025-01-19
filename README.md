# Sports betting and leaderboard system
The webSocket server for handling real-time events and communications.

## Setup

Clone this repository and cd into the clone specific folder and run the following command accordingly

```
npm i
```

```
npm run build
```

```
npm start
```

## Deployment to Render

To deploy this application to Render, follow these steps:

1. **Create a Render Account**: Sign up for an account at [Render](https://render.com).

2. **Create a New Web Service**:
   - Click on "New" and select "Web Service".
   - Connect your GitHub repository containing this project.

3. **Configure Environment Variables**:
   - In the Render dashboard, navigate to the "Environment" section.
   - Set the following environment variables:
     - `BASE_URL`: Update this to the production URL of your deployed application.

4. **Build Command**: Set the build command to:
   ```
   npm run build
   ```

5. **Start Command**: Set the start command to:
   ```
   npm start
   ```

6. **Deploy**: Click on "Create Web Service" to start the deployment process.

## Set Environment Variables
Create a .env file in the root of your Rails project and follow the pattern of variables in env.example

- When you run the code it tries to simulate the steps of a user, registering/logging in, then placing a bet, fetching the betting history as well.
