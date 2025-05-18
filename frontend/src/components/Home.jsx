import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SymptomChecker from './SymptomChecker';
import RecommendationResults from './RecommendationResults';
import './styles/home.css';
import './styles/main.css';
import api from '../api/config';

const Home = () => {
    const navigate = useNavigate(); 
    const [recommendations, setRecommendations] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSymptomSubmit = async (symptoms) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await api.post('/recommendations', { symptoms });
            setRecommendations(response.data.recommendations);
        } catch (error) {
            console.error('Error fetching recommendations:', error);
            setError('Failed to fetch recommendations. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const scrollToSystem = () => {
        const section = document.getElementById('recommendation-system');
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="hero-section">
            <div className="hero-content">
                <h1 className="hero-title">
                    Harnessing Herbs, Healing with Data
                </h1>
                <p className="hero-subtitle">
                    Your Symptoms, Nature’s Remedies
                </p>
                <button className="get-started-btn" onClick={scrollToSystem}>
                    Get Started
                </button>
                <button className="visit-store-btn" onClick={() => navigate('/herbstore')}>
                    🌿 Visit Herb Store
                </button>
            </div>

            <div id="recommendation-system" className="system-section">
                <div className="recommendation-content">
                    <SymptomChecker onSubmit={handleSymptomSubmit} />

                    {isLoading && (
                        <div className="loader">
                            <div className="loader-spinner"></div>
                            <p>Analyzing your symptoms...</p>
                        </div>
                    )}

                    {error && <div className="error-message">{error}</div>}

                    {recommendations && (
                        <RecommendationResults data={recommendations} />
                    )}
                </div>
            </div>
        </section>
    );
};

export default Home;
