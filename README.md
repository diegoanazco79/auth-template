# Auth Template

This project provides a robust and reusable template for easily implementing authentication and authorization features in web applications. Designed with flexibility in mind, this template allows for the quick integration of essential login and access control features, enabling developers to focus on building the specific logic of their applications.

Explore a live demo of the project [here](https://auth-template-topaz.vercel.app/login).


## Features

- **Google Authentication**: Allows users to log in using their Google account.
  
- **Normal Authentication (password, email)**: Users can register and log in using an email and password.
  
- **Password Recovery**: Functionality for users to recover their password in case of forgetfulness.
  
- **User Registration**: Enables new users to register on the platform.

## Technologies Used

- [Vite](https://vitejs.dev/): Fast and lightweight bundler for web applications.
  
- [Material UI](https://mui.com/): React user interface components for an attractive visual design.
  
- [React Router](https://reactrouter.com/): Single-page application navigation with React.
  
- [Zustand](https://github.com/pmndrs/zustand): Hassle-free global state for React.
  
- [React Query](https://react-query.tanstack.com/): Manage, share, and automatically update the application state.
  
- [Axios](https://axios-http.com/): Promise-based HTTP client for the browser and Node.js.
  
- [React Hook Form](https://react-hook-form.com/): Library for managing forms in React.
  
- [Yup](https://github.com/jquense/yup): Schema validation for JavaScript and TypeScript.

## Environment Variables

Make sure to configure the following environment variables before running the application:

- **VITE_GOOGLE_AUTH_CLIENT_ID**: Google Authentication client ID. You can obtain this by creating a project in the [Google Developers Console](https://console.developers.google.com/).
  
- **VITE_API_URL**: URL of the API used for authentication. Ensure it's the correct URL for your backend instance.

## Installation

1. Clone this repository.
2. Run `npm install` to install the dependencies.
3. Set up the environment variables as per the above instructions.
4. Run `npm run dev` to start the application.

## Contributions

If you encounter any issues or have suggestions to improve the project, feel free to create an issue or pull request!

