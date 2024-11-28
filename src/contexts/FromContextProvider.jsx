import React, { createContext, useState } from 'react';

// Create the FromContext
const FromContext = createContext();

// Create the FromContextProvider component
const FromContextProvider = ({ children }) => {
    const [from, setFrom] = useState('');

    return (
        <FromContext.Provider value={{ from, setFrom }}>
            {children}
        </FromContext.Provider>
    );
};

// Export both the context and the provider
export { FromContext, FromContextProvider };