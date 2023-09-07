// This typically contains business logic and services related to user management. It might include functions for user registration, login, authentication, authorization, user profile updates, and other user-related operations.

// This is a module that contains functions related to user management, particularly the interaction with external APIs or services. It acts as a bridge between the react components and the API endpoints. 

import * as usersAPI from './users-api';

export async function signUp(userData) {
    // delegate the network request code to the users-api.js API module which will ultimately return a JSON Wen Token (JWT)
    const token = await usersAPI.signUp(userData);
    // returns token up to SignUpForm.js
    return token;
}