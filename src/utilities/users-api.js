// This file is often responsible for handling communication with external APIs or services related to users. It may contain functions or methods for making HTTP requests to user-related endpoints, parsing API responses, and handling API-specific concerns like error handling or data transformation.

// This file contains functions that directly interact with the server's API endpoints related to user actions

// This is the base path of the Express route we'll define. Serves as the API endpoint where the signup req is made.
const BASE_URL = '/api/users';

export async function signUp(userData) {
    // fetch uses an options object as a second arg to make requests other than basic GET requests, include date, headers, etc.
    const res = await fetch(BASE_URL, {
        // a post req is often used to submit data to the server, such as creating a new user account like were doing.
        method: 'POST',
        // this sets the `Content-type` header to indicate that the data being sent in the req body is in JSON format (`application/json`). This is important because it tells the server how to interpret the data in the req body.
        headers: {'Content-type': 'application/json'},
    
        // this part of your code converts the userData object, which is a JavaScript object, into a JSON-formatted string. ex. "{"name":"John","email":"john@example.com","password":"secret123"}"
        body: JSON.stringify(userData)
    });

    // checks if req was successful
    if (res.ok) {
        // res.json() will resolve to the JWT. res.json method is a built-in JS fun used to parse the response body of an HTTP response as JSON. To work with the JSON data in JavaScript, you need to parse it from the response body (which is typically in string format) into a JavaScript object. This allows you to access and manipulate the data in a structured way. This it reads the response body as text, parses it as JSON, and returns a promise that resolves to the resulting JavaScript object. ex. {name: "John", email: "john@example.com", password:"secret123"}
        return res.json()
    } else {
        throw new Error('Invalid Sign Up');
    }
}

/* HTTP headers provide context and instructions on how to process the message. In some cases it helps with security features. In summary, identifying and defining HTTP headers and their types is essential for ensuring the correct and secure operation of web services, APIs, and web applications. So, setting the Content-type header to 'application/json' doesn't change the structure or display of the userData object in your JavaScript code. It simply informs the server that the data you're sending in the request body is in JSON format, allowing the server to process it correctly.*/

/* Most HTTP libraries and servers expect the body of a POST request to be a string, not a JavaScript object. Therefore, you typically need to stringify a JavaScript object to JSON format before sending it in the request body. */