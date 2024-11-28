import React, { createContext, useState } from 'react';

// Create the UserContext
const UserContext = createContext();

// Create the UserContextProvider component
const UserContextProvider = ({ children }) => {
    const [userEmail, setUserEmail] = useState('');

    return (
        <UserContext.Provider value={{ userEmail, setUserEmail }}>
            {children}
        </UserContext.Provider>
    );
};

// Export both the context and the provider
export { UserContext, UserContextProvider };