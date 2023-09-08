import React from "react";
import { Link } from "react-router-dom";

// using this import, we can call any exported function using: userService.someMethod()
import * as userService from '../utilities/users-service';

export default function NavBar({user, setUser}) {

    function handleLogOut() {
        // delegate to the uers-service
        userService.logOut();

        // update state will also casue a re-render
        setUser(null);
    }

    return (
        <nav>
            <Link to='/orders' >Order History</Link>
            &nbsp; | &nbsp;
            <Link to='/orders/new' >New Order</Link>
            &nbsp;&nbsp;<span>Welcome, {user.name}!</span>
            &nbsp;&nbsp;<Link to='' onClick={handleLogOut} >Log Out</Link>
        </nav>
    )
}