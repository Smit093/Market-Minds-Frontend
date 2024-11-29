import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { LoginContext } from '../../../contexts/LoginContextProvider';
import { FromContext } from '../../../contexts/FromContextProvider';

export default function Videos() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const { loggedin } = useContext(LoginContext);
  const { setFrom } = useContext(FromContext);

  // Initialize AOS once on mount
  useEffect(() => {
    Aos.init({ duration: 800 });

    async function fetchData() {
      try {
        const response = await fetch("https://market-minds-backend.onrender.com/videos");
        if (!response.ok) {
          throw new Error('Network response was not okay!');
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.log('Error fetching the data: ', error);
      }
    }

    fetchData();

    // Redirect to login if not logged in
    if (!loggedin) {
      setFrom('videos');
      navigate('/login');
    }

  }, [loggedin, navigate]); // Include dependencies here

  // Render videos if logged in
  if (!loggedin) return null; // Or a loading spinner/message

  return (
    <div className="container min-h-screen p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((item, index) => (
          <div data-aos="fade-left" className="bg-dark-teal rounded-lg shadow-lg overflow-hidden p-4 transition-transform transform hover:scale-105 hover:shadow-xl" key={index}>
            <h3 className="text-xl font-semibold mb-2 text-pastel-green">{item.title}</h3>
            <div className="mb-4">
              <iframe className="w-full h-64" src={`https://www.youtube.com/embed/${item.code}`} title={item.title} allowFullScreen></iframe>
            </div>
            <div className="text-pastel-green">
              <p className="mb-2">{item.description}</p>
              <p className="font-bold text-peach"><i>Likes: {item.likes}</i></p>
            </div>
            <a className="text-pastel-green hover:underline" target="_blank" rel="noopener noreferrer" href={item.link}>Take me to YouTube</a>
          </div>
        ))}
      </div>
    </div>
  );
}