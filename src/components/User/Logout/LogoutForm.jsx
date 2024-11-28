import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from "../../../contexts/LoginContextProvider";
import { UserContext } from "../../../contexts/UserContextProvider";

export default function LogoutForm() {
  const { setLoggedin, loggedin } = useContext(LoginContext);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const { userEmail } = useContext(UserContext);

  console.log(userEmail);

  const handleLogout = (event) => {
    event.preventDefault();
    setLoggedin(false);
    setSuccessMessage('Logout successful! Redirecting to home page.');
    setTimeout(() => {
      navigate('/');
    }, 1300);
  };

  // Check if the user is logged in
  if (!loggedin) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 w-80">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> Please log in first.</span>
        </div>
        <button
          type="button"
          onClick={() => navigate('/login')} // Redirect to login page
          className="px-4 py-2 bg-dark-teal text-pastel-green rounded hover:bg-peach hover:text-dark-teal focus:outline-none focus:ring-2 focus:ring-dark-teal focus:ring-offset-2"
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-pastel-green p-8 rounded-lg shadow-lg w-80">
        <h2 className="text-2xl font-bold mb-4 text-dark-teal">Logout</h2>
        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
            <strong className="font-bold">Success!</strong>
            <span className="block sm:inline">{successMessage}</span>
          </div>
        )}
        <form onSubmit={handleLogout} className="space-y-4">
          <p className="text-dark-teal mb-4">Are you sure you want to log out from {userEmail}?</p>
          <div className="flex justify-between">
            <button
              type="submit"
              className="px-4 py-2 bg-dark-teal text-pastel-green rounded hover:bg-peach hover:text-dark-teal focus:outline-none focus:ring-2 focus:ring-dark-teal focus:ring-offset-2"
            >
              Logout
            </button>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}