import React, { useContext, useEffect, useState } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';

import { LoginContext } from '../../../contexts/LoginContextProvider';
import { FromContext } from '../../../contexts/FromContextProvider';
import { useNavigate } from 'react-router-dom';

export default function Book() {
  const [books, setBooks] = useState([]); // State to hold fetched books
  const [loading, setLoading] = useState(true); // State to manage loading state
  const { loggedin } = useContext(LoginContext);
  const { setFrom } = useContext(FromContext);
  const navigate = useNavigate(); // Use navigate for redirection

  useEffect(() => {
    Aos.init({ duration: 800 }); // Initialize AOS

    const fetchBooks = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}books`); // Adjust URL as needed
        if (!response.ok) {
          throw new Error('Network response was not okay!');
        }
        const data = await response.json();
        setBooks(data); // Set fetched books to state
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false); // Update loading state regardless of success or failure
      }
    };

    fetchBooks(); // Fetch books when component mounts

    // Redirect to login if not logged in
    if (!loggedin) {
      setFrom('books'); // Set the context for where the user came from
      navigate('/login'); // Redirect to login page
    }

  }, [loggedin, navigate]); // Include dependencies here

  return (
    <div className="container min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4 text-pastel-green">Books</h1>
      {loading ? (
        <p>Loading...</p> // Show loading text while fetching
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {books.map((book, index) => (
            <div
              data-aos="fade-left"
              className="bg-dark-teal rounded-lg shadow-lg overflow-hidden p-4 transition-transform transform hover:scale-105 hover:shadow-xl"
              key={index}
            >
              <div className="mb-4">
                <img
                  className="w-full h-64 object-cover"
                  src={book.cover || '/default-cover.jpg'}
                  alt={`Cover of ${book.title}`}
                />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-pastel-green">
                {book.title}
              </h3>
              <p className="text-pastel-green">
                {book.reviews}
              </p>
              <p className="font-bold text-peach">
                <i>Ratings: {book.ratings}</i>
              </p>
              <p className="text-peach">
                {book.available}
              </p>
              <a
                className="text-pastel-green hover:underline"
                href={book.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                Read Free PDF
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}