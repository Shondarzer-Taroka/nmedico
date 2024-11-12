

'use client'
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/autoplay'; // Import autoplay styles if necessary
import { EffectCards, Autoplay } from 'swiper/modules'; // Import Autoplay module

const Review = () => {
    const [reviews, setReviews] = useState([]);

    // Fetch reviews in useEffect
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const res = await fetch('/reviews/reviews.json');
                const data = await res.json();
                setReviews(data); // Update state with the fetched reviews
            } catch (error) {
                console.error("Failed to fetch reviews:", error);
            }
        };

        fetchReviews();
    }, []);

    return (
        <section
            className="min-h-screen flex items-center justify-between bg-cover bg-center hidden md:block "
            style={{
                backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("/assets/pexels-artempodrez-6823613.jpg")', // Dark overlay added with linear-gradient
                backgroundSize: 'cover',  // Ensures the background image covers the entire section
                backgroundPosition: 'center',  // Centers the background image
            }} // Set your background image URL here
         >

            <div className='w-full'>
                <Swiper
                    effect={'cards'}
                    grabCursor={true}
                    modules={[EffectCards, Autoplay]}
                    className="mySwiper w-[350px]"
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                >
                    {reviews.length > 0 ? (
                        reviews.map((review, index) => (
                            <SwiperSlide key={index + 786587657} className="">
                                <aside
                                    key={index}
                                    className="glass-card border shadow-lg rounded-lg w-full md:w-[350px] p-6 transition duration-300 transform hover:scale-105 hover:shadow-2xl"
                                    style={{
                                        background: 'rgba(255, 255, 255, .9)', // Semi-transparent background
                                        backdropFilter: 'blur(10px)', // Glassmorphism blur effect
                                        border: '1px solid rgba(255, 255, 255, 0.2)',
                                        borderRadius: '12px',
                                    }}
                                >
                                    <div className="text-center text-black">
                                        <div className="flex justify-center mb-4">
                                            <Image
                                                src={review.image}
                                                alt={`Review from ${review.name}`}
                                                width={70}
                                                height={70}
                                                className="rounded-full border"
                                            />
                                        </div>
                                        <h2 className="font-semibold text-xl mb-2">{review.name}</h2>
                                        <h4 className="text-yellow-400 mb-3">Rating: {review.star} ⭐</h4>
                                        <div className="text-lg">
                                            <i className='opacity-70'><FaQuoteLeft /></i>
                                            <i className='opacity-75'>{review.review}</i>
                                            {/* <FaQuoteRight /> */}
                                        </div>
                                    </div>
                                </aside>
                            </SwiperSlide>
                        ))
                    ) : (
                        <p className="text-white">Loading reviews...</p>
                    )}
                </Swiper>
            </div>
        </section>
    );
};

export default Review;
