import React from 'react';
import Navbar from '../components/Navbar';
import './HomePage.css';

const HomePage = () => {
    return (
        <div className="home-page">
            {/* Navbar Section */}
            <Navbar />
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-content">
                    <h1>Find Your Perfect Home</h1>
                    <p>Discover the best rental properties tailored to your needs.</p>
                    <button onClick={() => window.location.href = '/signup'}>Get Started</button>
                </div>
            </section>

            {/* Search Bar */}
            <section className="search-section">
                <form className="search-bar">
                    <input type="text" placeholder="Search by location, type, or price..." />
                    <button type="submit">Search</button>
                </form>
            </section>

            {/* Featured Listings */}
            <section className="listings">
                <h2>Featured Listings</h2>
                <div className="listing-grid">
                    {[1, 2, 3, 4].map((listing, index) => (
                        <div key={index} className="listing-item">
                            <img src={`/images/house${listing}.jpeg`} alt={`Listing ${listing}`} />
                            <h4>Modern Apartment {listing}</h4>
                            <p>Location: City {listing}</p>
                            <p>Price: ${1000 + index * 100}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* How It Works */}
            <section className="how-it-works">
                <h2>How It Works</h2>
                <div className="steps">
                    <div className="step">
                        <h4>Step 1</h4>
                        <p>Sign up and create your account.</p>
                    </div>
                    <div className="step">
                        <h4>Step 2</h4>
                        <p>Browse listings or post your property.</p>
                    </div>
                    <div className="step">
                        <h4>Step 3</h4>
                        <p>Connect with renters or owners directly.</p>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="testimonials">
                <h2>What Our Users Say</h2>
                <div className="testimonial-cards">
                    <div className="testimonial">
                        <p>"The platform is super easy to use. I found my dream home within days!"</p>
                        <h5>- Jane Doe</h5>
                    </div>
                    <div className="testimonial">
                        <p>"As a landlord, I've rented out my properties quickly. Highly recommended!"</p>
                        <h5>- John Smith</h5>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <p>&copy; 2024 LetsFindCasa. All Rights Reserved.</p>
                <p>Contact: lucky.h.fatch@gmail.com</p>
            </footer>
        </div>
    );
};

export default HomePage;