import React from "react";
import * as userServices from '../utilities/users-service';

export default function OrderHistoryPage() {
    const handleCheckToken = async () => {
        const expDate = await userServices.checkToken()
        console.log(expDate);
    };

    return (
        <div>
            <h1>Order History Page</h1>
            <button onClick={handleCheckToken}>Check When My Login Expires</button>
        </div>
    );
};