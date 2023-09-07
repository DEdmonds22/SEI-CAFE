// This file is often responsible for handling communication with external APIs or services related to users. It may contain functions or methods for making HTTP requests to user-related endpoints, parsing API responses, and handling API-specific concerns like error handling or data transformation.

// This is the base path of the Express route we'll define
const BASE_URL = '/api/users';

export async function signUp(userData) {
    // fetch uses an options object as a second arg to make requests other than basic GET requests, include date, headers, etc.
    const res = await fetch(BASE_URL, {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        // fetch reqs data payloads to be stringified and assigned to a body property on the options object
        body: JSON.stringify(userData)
    });

    // checks if req was successful
    if (res.ok) {
        // res.json() will resolve to the JWT
        return res.json()
    } else {
        throw new Error('Invalid Sign Up');
    }
}