# Frontend User Authentication Microservice

This project is a frontend microservice for user authentication, built using React. It communicates with the backend microservice to handle user registration and login.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Contributing](#contributing)
- [License](#license)

## Features

- User registration and login forms
- Communicates with the backend API for authentication
- Routing using React Router
- State management using React hooks
- Axios for HTTP requests

## Prerequisites

- Node.js (>=14.x.x)
- npm (>=6.x.x)

## Installation

1. Clone the repository:

    ```bash
    git clone <repository-url>
    cd frontend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

## Configuration

1. Create a `config.js` file in the `src` directory with the following content:

    ```javascript
    const config = {
        apiUrl: 'http://localhost:4001/auth'
    };

    export default config;
    ```

    Ensure the `apiUrl` points to your backend authentication API.

## Running the Application

1. Start the development server:

    ```bash
    PORT=4000 npm start
    ```

    The application will run on `http://localhost:4000`.

## Project Structure
frontend/
├── public/
│   └── index.html         # HTML template for the React application.
├── src/
│   ├── components/
│   │   ├── Home.js        # Home component that displays a greeting message.
│   │   ├── Login.js       # Login component for user login form.
│   │   ├── Register.js    # Register component for user registration form.
│   ├── services/
│   │   └── authService.js # Service to handle API calls for authentication.
│   ├── App.js             # Main React component that sets up routing.
│   ├── config.js             # Main React component that sets up routing.
│   ├── index.js           # Entry point for the React application.
│   ├── index.css          # Global CSS styles for the React application.
├── package.json           # Dependencies and scripts for the frontend project.


- **public/index.html**: HTML template for the React application.
- **src/components/Home.js**: Home component that displays a greeting message.
- **src/components/Login.js**: Login component for user login form.
- **src/components/Register.js**: Register component for user registration form.
- **src/services/authService.js**: Service to handle API calls for authentication.
- **src/config.js**: Configuration file containing API endpoint.
- **src/App.js**: Main React component that sets up routing.
- **src/index.js**: Entry point for the React application.
- **src/index.css**: Global CSS styles for the React application.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:4000](http://localhost:4000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.
