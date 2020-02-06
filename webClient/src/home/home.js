import React, { useEffect } from "react";
import useApiRequest, { FETCHING, SUCCESS, ERROR } from "../customHooks/useApiRequest";

export default () => {
    const [{ status, response }, sendCatsRequest] = useApiRequest(
        `http://localhost:5000/api/cats`, // TODO: obviously we would want this not hard coded
        {
            verb: 'get'
        }
    );

    useEffect(() => {
        if(!status) {
            sendCatsRequest();
        }
    });

    // TODO: probably good idea to redirect or at least acknowledge user not being logged in
    return (
        <>
            <h1>Your Cats</h1>
            { status === FETCHING ? ( 
                <p>Retrieving Your Cats</p>
            ) : (
                <p>Aww... You have no cats</p>
            )}
        </>
    );
};
