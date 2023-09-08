// This typically contains business logic and services related to user management. It might include functions for user registration, login, authentication, authorization, user profile updates, and other user-related operations.

// This is a module that contains functions related to user management, particularly the interaction with external APIs or services. It acts as a bridge between the react components and the API endpoints. 

import * as usersAPI from './users-api';

export async function signUp(userData) {
    // delegate the network request code to the users-api.js API module which will ultimately return a JSON Wen Token (JWT)
    const token = await usersAPI.signUp(userData);
    // persist the `token`. When data id persistedm it is preserved beyond the current session or program executed and is typically stored in a way that survives system reboots, program terminations, or other temporary events. setItem sets the value of the pair identified by key to value, creating a new key/value pair if none existed for key previously. Note: Local Storage only stores and retrieves strings. When saving, the data will automatically be converted to a str, however, you will be responsible for using JSON.parse() to convert the str retrieved from the local storage back into a number, boolean, array, obj, ect.
    localStorage.setItem('token', token);
}