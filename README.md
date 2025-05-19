# Ethereum Block Explorer

A modern, interactive block explorer built with React and Alchemy SDK that allows users to explore Ethereum blocks, transactions, and account balances.

## Features

- View current and recent blocks
- Explore block details (timestamp, miner, gas used, etc.)
- Browse transactions within blocks
- View detailed transaction information
- Check account balances
- Responsive design for all devices

## Getting Started

### 1. Create a unique Alchemy API key

If you have not already done so, create a unique Alchemy API Mainnet key
for your project as [described here](https://docs.alchemy.com/reference/api-overview?a=eth-bootcamp).

### 2. Add your API key as an environment variable

Create an empty `.env` file in the base directory of this project.

Add the following line to the `.env` file replacing `YOUR_ALCHEMY_API_KEY` with your api key.

```sh
REACT_APP_ALCHEMY_API_KEY=YOUR_ALCHEMY_API_KEY
```

Do not remove the `REACT_APP_` prefix. React uses that to import env variables.

**⚠️ Note**

> Your Alchemy API Mainnet Key is a sensitive piece of data. If we were\
> building an enterprise app to conquer the world we would never place\
> this sensitive data in the client code of our blockexplorer project that\
> could potentially be read by anyone.
>
> But hey, we're just learning this stuff right now, not conquering anything\
> yet! :-) It won't be the end of the world to put the Alchemy API key in our\
> front-end code for this project.

### 3. Install dependencies

```sh
npm install
```

### 4. Start the development server

```sh
npm start
```

Running the command above will run the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The webpage will automatically reload when you make code changes.

## Project Structure

This project was bootstrapped from the Alchemy Block Explorer template and enhanced with additional functionality:

- Added block detail views
- Implemented transaction exploration
- Created account balance checker
- Improved UI/UX with modern styling
- Added navigation between views

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built using [Alchemy SDK](https://www.alchemy.com/)
- Original template from [Alchemy Block Explorer](https://github.com/alchemyplatform/blockexplorer)
- Inspired by Ethereum community projects