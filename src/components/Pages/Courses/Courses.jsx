import React, { useEffect, useState, useContext } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { LoginContext } from '../../../contexts/LoginContextProvider';
import { FromContext } from '../../../contexts/FromContextProvider';
import { useNavigate } from 'react-router-dom';

export default function Courses() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading
  const { loggedin } = useContext(LoginContext); // Get logged-in status from context
  const { setFrom } = useContext(FromContext); // Set the source context for navigation
  const navigate = useNavigate(); // Use navigate for redirection

  useEffect(() => {
    Aos.init({ duration: 800 }); // Initialize AOS

    const fetchData = async () => {
      try {
        const response = await fetch("http://market-minds-backend.onrender.com//courses");
        if (!response.ok) {
          throw new Error('Network response was not okay!');
        }
        const result = await response.json();
        setData(result); // Set fetched data to state
      } catch (error) {
        console.log('Error fetching the data: ', error);
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    };

    fetchData(); // Fetch data on component mount

    // Redirect to login if not logged in
    if (!loggedin) {
      setFrom('courses'); // Set the context for where the user came from
      navigate('/login'); // Redirect to login page
    }

  }, [loggedin, navigate, setFrom]); // Include dependencies here

  return (
    <div className="container min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4 text-pastel-green">Courses</h1>
      {loading ? (
        <p>Loading...</p> // Show loading text while fetching
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.map((item, index) => (
            <div
              data-aos="fade-left"
              className="bg-dark-teal rounded-lg shadow-lg overflow-hidden p-4 transition-transform transform hover:scale-105 hover:shadow-xl"
              key={index}
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-40 object-cover mb-4 rounded"
              />
              <h3 className="text-xl font-semibold mb-2 text-pastel-green">
                {item.title}
              </h3>
              <p className="text-gray-400 mb-2">
                <i>by {item.creator}</i>
              </p>
              <p className="text-gray-300 mb-2">
                Ratings: <span className="font-bold text-peach">{item.ratings}</span>
              </p>
              <p className="text-lg font-bold text-peach mb-4">
                ₹{item.price}
              </p>
              <a
                className="text-pastel-green hover:underline"
                target="_blank"
                rel="noopener noreferrer"
                href={item.link}
              >
                Purchase Course
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}