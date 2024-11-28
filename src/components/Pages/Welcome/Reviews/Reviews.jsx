import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import BasicRating from './Ratings'; // Ensure this path is correct
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
const male = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnSA1zygA3rubv-VK0DrVcQ02Po79kJhXo_A&s"
const female = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuvwJG3J0AvDmbaE8_obrEW5IHHEB2zDaYEw&s"
function Reviews() {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null); // State to handle errors

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: data.length === 1 ? 1 : 3, // Show 1 slide if there's only one review
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: '20px',
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: false,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}`);

                if (!response.ok) {
                    throw new Error('Network response was not okay!');
                }

                const result = await response.json();
                setData(result.reviews); // Assuming result.reviews is an array
                console.log(result.reviews);
            } catch (error) {
                console.log('Error fetching the data:', error);
                setError(error.message); // Set error message if needed
            }
        }

        fetchData();
    }, []);

    return (
        <Box sx={{ padding: 2 }}>
            <h2 className="text-center text-2xl font-bold font-kaisei text-pastel-green">:-What Our Users Say-:</h2>
            {error && <Typography color="error">{error}</Typography>}
            {data.length > 0 ? ( // Check if there are reviews to display
                <Slider {...settings}>
                    {data.map((review) => (
                        <Box key={review._id} sx={{ padding: 2, textAlign: 'center' }}>
                            <div className="bg-pastel-green rounded-lg p-4 text-center">
                                {review.gender == "male" ? (

                                    <img className="w-24 h-24 rounded-full mx-auto" src={male} alt="" />
                                ) : (
                                    <img className="w-24 h-24 rounded-full mx-auto" src={female} alt="" />
                                )}
                                <Typography variant="h6">{review.name}</Typography> {/* Displaying name */}
                                <Typography variant="body1">{review.review}</Typography> {/* Displaying review content */}
                                <BasicRating value={review.ratings} /> {/* Using ratings field */}
                            </div>
                        </Box>
                    ))}
                </Slider>
            ) : (
                <Typography variant="body1" sx={{ textAlign: 'center' }}>No reviews available.</Typography>
            )}
        </Box>
    );
}

export default Reviews;