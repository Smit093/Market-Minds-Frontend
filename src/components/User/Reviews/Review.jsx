import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../../contexts/UserContextProvider';
import { LoginContext } from '../../../contexts/LoginContextProvider';
import { FromContext } from '../../../contexts/FromContextProvider';

const ReviewForm = () => {
    const [formData, setFormData] = useState({
        review: '',
        ratings: 1,
        name: '',
        gender: '',
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const navigate = useNavigate();
    const { userEmail } = useContext(UserContext);
    const { loggedin } = useContext(LoginContext);
    const { setFrom } = useContext(FromContext);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            await axios.post("https://market-minds-backend.onrender.com/reviews", formData);
            setSuccess('Review submitted successfully! Redirecting to home page');
            // Reset form data
            setFormData({ review: '', ratings: 1, name: '', gender: '' });
            setTimeout(() => navigate('/'), 1300);
        } catch (error) {
            console.error("Error submitting review:", error);
            setError('Error submitting review. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Fetch user data to pre-fill name and gender
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("https://market-minds-backend.onrender.com/login");
                if (!response.ok) {
                    throw new Error('Network response was not okay!');
                }
                const result = await response.json();

                // Set name and gender based on userEmail
                const user = result.find(user => user.email === userEmail);
                if (user) {
                    setFormData(prev => ({ ...prev, name: user.name, gender: user.gender }));
                }
            } catch (error) {
                console.log('Error fetching the data:', error);
            }
        }

        fetchData();
    }, [userEmail]);

    // Redirect to login if not logged in
    useEffect(() => {
        if (!loggedin) {
            setFrom('reviews');
            navigate('/login');
        }
    }, [loggedin, navigate]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;

        // Convert ratings to a number
        if (name === 'ratings') {
            setFormData(prev => ({
                ...prev,
                [name]: Number(value), // Ensure ratings is a number
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="w-full max-w-md bg-pastel-green p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-dark-teal text-center">Submit Your Review</h2>
                {success && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
                        <strong className="font-bold">Success!</strong>
                        <span className="block sm:inline">{success}</span>
                    </div>
                )}
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                        <strong className="font-bold">Error!</strong>
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="review" className="block text-sm font-medium text-dark-teal">Review</label>
                        <textarea
                            name='review'
                            id="review"
                            value={formData.review}
                            onChange={handleChange}
                            required
                            rows="4"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-dark-teal focus:border-dark-teal sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="ratings" className="block text-sm font-medium text-dark-teal">Rating</label>
                        <input
                            type="number"
                            name="ratings"
                            id="ratings"
                            value={formData.ratings}
                            onChange={handleChange}
                            min="1"
                            max="5"
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-dark-teal focus:border-dark-teal sm:text-sm"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2 px-4 bg-dark-teal text-pastel-green font-semibold rounded-lg shadow-md ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-peach hover:text-dark-teal'} focus:outline-none focus:ring-2 focus:ring-dark-teal focus:ring-offset-2`}
                    >
                        {loading ? 'Submitting...' : 'Submit Review'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ReviewForm;