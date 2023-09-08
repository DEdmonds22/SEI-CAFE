import React from "react";
import SignUpForm from "../components/SignUpForm/SignUpForm";
import LoginForm from "../components/LoginForm/LoginForm";

export default function AuthPage({setUser}) {
    return (
        <main>
            <h1>Auth Page</h1>
            <h2>Sign Up</h2>
            <SignUpForm setUser={setUser} />
            <h2>Log In</h2>
            <LoginForm setUser={setUser} />
        </main>
    );
};