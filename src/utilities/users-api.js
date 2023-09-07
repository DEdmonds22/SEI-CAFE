// This file is often responsible for handling communication with external APIs or services related to users. It may contain functions or methods for making HTTP requests to user-related endpoints, parsing API responses, and handling API-specific concerns like error handling or data transformation.

// This file contains functions that directly interact with the server's API endpoints related to user actions

const BASE_URL = '/api/users';

export async function signUp(userData) {
    // fetch uses an options object as a second arg to make requests other than basic GET requests, include date, headers, etc.
    const res = await fetch(BASE_URL, {
        // a post req is often used to submit data to the server, such as creating a new user account like were doing.
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        // this part of your code converts the userData object, which is a JavaScript object, into a JSON-formatted string. ex. "{"name":"John","email":"john@example.com","password":"secret123"}"
        body: JSON.stringify(userData)
    });

    if (res.ok) {
        // This it reads the response body as text, parses it as JSON, and returns a promise that resolves to the resulting JavaScript object. ex. {name: "John", email: "john@example.com", password:"secret123"}
        return res.json()
    } else {
        throw new Error('Invalid Sign Up');
    }
}