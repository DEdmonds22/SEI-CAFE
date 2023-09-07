import { Component } from "react";
import { signUp } from '../../utilities/users-service';

export default class SignUpForm extends Component {
    // state maintains a local state using the `state` object. It stores the values of the form fields and an `error` message. It is a property name used within React classes, When declared in a class-based component, you are essentially defininf the inital state of the commponent.
    state = {
        name: "",
        email: "",
        password: "",
        confirm: "",
        error: ""
    };

    handleChange = (evt) => {
        // `setState` is a method provided by React for updating the state of the component. When you call `this.setState` within a component method, your telling React to update the component's state, which will trigger a re-render of the component.
        this.setState({
            [evt.target.name]: evt.target.value,
            error: ''
        });
    };

    // `async` tells JS that this function may contain asynchronous operations. Asynchronous operations are those that might take some time to complete, such reading date from a file, making a network request, or waiting for a timer.
    handleSubmit = async (evt) => {
        // Prevent form from being subitted to the server and refeshening the page
        evt.preventDefault();
        try {
            // We don't want/need to send the `error` or `confirm` property, so we'll make a copy of the state object, then delete those properties from the copied state object.
            const formData = {...this.state};
            delete formData.confirm;
            delete formData.error;
            // To interact with asynchronous code inside of an `async` object function, you use the `await` keyword. It is used in frt of a promise (a value that reps the result of an async operation) to pause the execution of the `async` func until the promise is resolves or rejected. The promise returned by the signUp service method (in users-service.js) will resolve to the user object included in the payload of the JSON Web Token (JWT). Ideally console.log wont be executed until the promise is fufilled.
            const user = await signUp(formData);
            console.log(user);
        } catch {
            // if an error occurs while submitting the form
            this.setState({error: 'Sign Up Failed - Try Again'})
        }
    }

    render() {
        // this aids in disabling the `SIGN UP` btn if both password entries don't match
        const disable = this.state.password !== this.state.confirm;
        return (
            <div>
                <div className="form-container">
                <form autoComplete="off" onSubmit={this.handleSubmit}>
                    <label>Name</label>
                    <input type="text" name="name" value={this.state.name} onChange={this.handleChange} required />
                    <label>Email</label>
                    <input type="email" name="email" value={this.state.email} onChange={this.handleChange} required />
                    <label>Password</label>
                    <input type="password" name="password" value={this.state.password} onChange={this.handleChange} required />
                    <label>Confirm</label>
                    <input type="password" name="confirm" value={this.state.confirm} onChange={this.handleChange} required />
                    <button type="submit" disabled={disable}>SIGN UP</button>
                </form>
                </div>
                <p className="error-message">&nbsp;{this.state.error}</p>
            </div>
        );
    };
};

/* `state` and `setState` are not keywords but are specific to React and its component state management system. */