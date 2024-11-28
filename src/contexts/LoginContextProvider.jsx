import React, { createContext, useState } from 'react';

// Create the LoginContext
const LoginContext = createContext();

// Create the LoginContextProvider component
const LoginContextProvider = ({ children }) => {
    const [loggedin, setLoggedin] = useState(false);

    return (
        <LoginContext.Provider value={{ loggedin, setLoggedin }}>
            {children}
        </LoginContext.Provider>
    );
};

// Export both the context and the provider
export { LoginContext, LoginContextProvider };