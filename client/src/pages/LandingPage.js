import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Navbar from '../components/Navbar';
import "./LandingPage.css";

function LandingPage() {
    const [featuredProperties, setFeaturedProperties] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchFeaturedProperties();
    }, []);

    const fetchFeaturedProperties = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/properties?limit=4");
            setFeaturedProperties(response.data); 
        } catch (err) {
            setError(err.response?.data?.message || "Failed to fetch featured properties.");
        }
    };

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 768, 
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 1024, 
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    const houseImages = [
        { src: "/images/house1.jpeg", alt: "Beautiful house with a garden" },
        { src: "/images/house2.jpeg", alt: "Modern apartment interior" },
        { src: "/images/house3.jpeg", alt: "Cozy home with a pool" },
        { src: "/images/house4.jpeg", alt: "Luxurious villa by the beach" },
        { src: "/images/house5.jpeg", alt: "Spacious countryside home" },
    ];

    return (
        <div className="landing-page">
            <Navbar />

            {/* Hero Section */}
            <div className="hero-container">
                <section className="hero">
                    <div>
                        <h1>Find Your Home</h1>
                        <p>
                            Explore the best rental properties in your area with ease and
                            convenience.
                        </p>
                        <button onClick={() => window.location.href = '/signup'}>Get Started</button>

                    </div>
                </section>
            </div>

            {/* Listings Placeholder */}
            <section className="listings">
                <h3>Featured Listings</h3>
                {error && <p className="error">{error}</p>}
                <div className="listing-grid">
                    {featuredProperties.map((property) => (
                        <div
                            key={property._id}
                            className="listing-item"
                            onClick={() => navigate(`/property-details/${property._id}`)}
                        >
                            <img
                                src={
                                    property.media && property.media.length > 0
                                        ? `http://localhost:5000/${property.media[0]}`
                                        : "default-image.jpg"
                                }
                                alt={property.title || "Property Image"}
                            />
                            <h4>{property.title}</h4>
                            <p>Location: {property.location.city}</p>
                            <p>Price: ${property.pricePerMonth}</p>
                        </div>
                    ))}
                </div>
                <div className="view-more">
                    <a href="/properties" className="view-more-link">
                        View More Properties
                    </a>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="features">
                <h3>Why Choose LetsFindCasa?</h3>
                <div className="feature-list">
                    <div className="feature">
                        <h4>Comprehensive Listings</h4>
                        <p>
                            Browse through a wide selection of rental properties with all
                            the details you need.
                        </p>
                    </div>
                    <div className="feature">
                        <h4>Easy to Use</h4>
                        <p>
                            Our user-friendly platform makes finding your next home a
                            breeze.
                        </p>
                    </div>
                    <div className="feature">
                        <h4>Trusted by Renters and Landlords</h4>
                        <p>
                            Built on a foundation of trust, LetsFindCasa brings landlords
                            and renters together.
                        </p>
                    </div>
                </div>
            </section>

            {/* Explore Section */}
            <section id="features2" className="features2">
                <h3>Explore Your Future Home</h3>
                <div className="slider-list">
                    <div className="feature2">
                        <Slider {...sliderSettings}>
                            {houseImages.map((image, index) => (
                                <div key={index} className="slider-image">
                                    <img src={image.src} alt={image.alt} />
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
            </section>

            {/* Footer Section */}
            <footer id="contact" className="footer">
                <p>&copy; 2024 LetsFindCasa</p>
                <p>Contact: lucky.h.fatch@gmail.com</p>
            </footer>
        </div>
    );
}

export default LandingPage;
