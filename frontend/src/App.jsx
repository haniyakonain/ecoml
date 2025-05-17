import React, { useState } from 'react';
import { 
    BrowserRouter as Router, 
    Route, 
    Routes 
} from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Blog from './components/Blog';
import HerbDetail from './components/HerbDetail';
import Health from './components/Health';
import TestConnection from './components/TestConnection';
import './components/styles/main.css';
import axios from 'axios';
import logo from '/public/logo.jpg';

function App() {
    // State for farming section
    const [formData, setFormData] = useState({
        climate: 'tropical',
        soilType: 'loamy',
        waterAvailability: 'medium'
    });
    const [cropData, setCropData] = useState(null);
    
    // State for herb recommendations
    const [herbData, setHerbData] = useState(null);
    const [loading, setLoading] = useState(false);

    // Fetch crop data for farmers
    const fetchCropData = async () => {
        setLoading(true);
        try {
            const response = await axios.post('https://your-api-endpoint.com/crop-data', formData);
            setCropData(response.data);
        } catch (error) {
            console.error('Error fetching crop data:', error);
        } finally {
            setLoading(false);
        }
    };

   // In your App.jsx, change the fetchHerbData function to:
const fetchHerbData = async (symptoms) => {
    setLoading(true);
    try {
        const response = await axios.post(
            'http://localhost:5000/api/recommend', 
            { symptoms },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        setHerbData(response.data);
    } catch (error) {
        console.error('Full error details:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status,
            headers: error.response?.headers,
        });
    } finally {
        setLoading(false);
    }
};

    return (
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <div className="app">
                <NavBar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/blog/:id" element={<HerbDetail herbData={herbData} />} />
                    <Route path="/health" element={
                        <Health 
                            onSubmitSymptoms={fetchHerbData}
                            herbData={herbData}
                            loading={loading}
                        />
                    } />
                    <Route path="/test-connection" element={<TestConnection />} />
                </Routes>

                {/* Display farming results */}
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    cropData && (
                        <div>
                            <h2>Top 3 Crops to Grow</h2>
                            <ul>
                                {cropData.topCrops.map((crop, index) => (
                                    <li key={index}>
                                        {crop.name} - Market Trend: {crop.marketTrend} - Profit Margin: {crop.profitMargin}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )
                )}

                <footer className="footer">
                    <div className="footer-content">
                    <div className="footer-logo-section">
                            <h3>EcoMl</h3>
                        </div>
                        <p className="footer-text">
                            Made for a hackathon named Hackcelerate by team Ternary.
                        </p>
                        <div className="linkedin-links">
                            <a 
                                href="https://www.linkedin.com/in/haniya-konain-210882251/" 
                                className="linkedin-link" 
                                target="_blank" 
                                rel="noopener noreferrer"
                            >
                                <i className="fab fa-linkedin"></i>
                                <span>Haniya Konain</span>
                            </a>
                            <a 
                                href="https://www.linkedin.com/in/nadeeha-mapa-shoukat-9a834a175/" 
                                className="linkedin-link" 
                                target="_blank" 
                                rel="noopener noreferrer"
                            >
                                <i className="fab fa-linkedin"></i>
                                <span>Nadeeha Mapa Shoukat</span>
                            </a>
                            <a 
                                href="https://www.linkedin.com/in/fatima-syed-764b49249/" 
                                className="linkedin-link" 
                                target="_blank" 
                                rel="noopener noreferrer"
                            >
                                <i className="fab fa-linkedin"></i>
                                <span>Syeda Fatima</span>
                            </a>
                        </div>
                    </div>
                </footer>
            </div>
        </Router>
    );
}

export default App;