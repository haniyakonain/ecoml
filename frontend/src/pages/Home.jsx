import React, { useEffect, useState } from 'react';
import SymptomChecker from '../components/SymptomChecker';
import '../components/styles/home.css';
import axios from 'axios';

const Home = () => {
    const [showSymptomChecker, setShowSymptomChecker] = useState(false);
    const [recommendations, setRecommendations] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleScroll = () => {
        const remediesSection = document.getElementById('remedies-section');
        if (remediesSection) {
            setShowSymptomChecker(true);
            remediesSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleSymptomSubmit = async (symptoms) => {
        try {
            const response = await axios.post('http://localhost:5173/api/recommendations', {
                symptoms: symptoms
            });
            
            if (response.data && response.data.recommendations) {
                return response.data.recommendations;
            }
            return [];
            
        } catch (error) {
            console.error('Error:', error);
            return [];
        }
    };

    return (
        <div className="home-container">
            <main className="main-content">
                <section className="hero-section">
                    <div className="hero-content">
                        <h1 className="hero-title">
                            Harnessing Herbs, Healing with Data
                        </h1>
                        <p className="hero-subtitle">
                           Your Symptoms, Nature's Remedies
                        </p>
                    </div>
                    <div className="scroll-indicator" onClick={handleScroll}>  <span>Click</span>
</div>
                </section>

                <section id="remedies-section" className="remedies-section">
                    <div className="remedies-content">
                        {showSymptomChecker ? (
                            <SymptomChecker 
                                onSubmit={handleSymptomSubmit}
                                loading={loading}
                                recommendations={recommendations}
                            />
                        ) : (
                            <div className="placeholder-message">
                                <h2>Scroll down to begin your wellness journey</h2>
                                <p>We'll help you find the perfect herbal remedies for your needs.</p>
                            </div>
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Home; 