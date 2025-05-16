import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/health.css';

const Health = () => {
    const [location, setLocation] = useState('');
    const [specialty, setSpecialty] = useState('');
    const [areas, setAreas] = useState([]);
    const [selectedArea, setSelectedArea] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const specialties = [
        { id: 'general_physician', name: 'General Physician' },
        { id: 'ayurvedic', name: 'Ayurvedic Doctor' },
        { id: 'homeopathy', name: 'Homeopathy Doctor' },
        { id: 'cardiologist', name: 'Cardiologist' },
        { id: 'dermatologist', name: 'Dermatologist' },
        { id: 'pediatrician', name: 'Pediatrician' },
        { id: 'orthopedic', name: 'Orthopedic' },
        { id: 'neurologist', name: 'Neurologist' },
        { id: 'dentist', name: 'Dentist' }
    ];

    useEffect(() => {
        if (location) fetchAreas(location);
    }, [location]);

    const fetchAreas = async (location) => {
        setLoading(true);
        try {
            const { data } = await axios.get('https://nominatim.openstreetmap.org/search', {
                params: {
                    q: location,
                    format: 'json',
                    addressdetails: 1,
                    limit: 10,
                },
            });

            const fetchedAreas = data
                .filter(place => place.address && place.address.city)
                .map(place => place.address.suburb || place.address.neighbourhood || place.address.city);

            setAreas([...new Set(fetchedAreas)]);
            setSelectedArea(fetchedAreas[0] || '');
        } catch (err) {
            console.error(err);
            setError('Failed to fetch areas. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const searchQuery = `${specialty || ''} ${selectedArea || location}`.trim();

            const { data } = await axios.get('https://nominatim.openstreetmap.org/search', {
                params: {
                    q: searchQuery,
                    format: 'json',
                    addressdetails: 1,
                    limit: 50
                }
            });

            if (data.length === 0) {
                setError(`No results found for "${specialty}" in "${selectedArea || location}".`);
                setSearchResults([]);
                return;
            }

            const results = data.map((place) => ({
                id: place.place_id,
                name: place.display_name,
                type: place.type || 'Healthcare Facility',
                lat: place.lat,
                lon: place.lon,
                location: `${place.lat}, ${place.lon}`,
                placeId: place.osm_id
            }));

            setSearchResults(results);
        } catch (err) {
            console.error(err);
            setError('Failed to fetch medical facilities.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="health-container">
            <div className="health-header">
                <h1>Healthcare Services</h1>
                <p>Find doctors, hospitals, and medical facilities near you</p>
            </div>

            <div className="search-section">
                <form onSubmit={handleSearch} className="search-form">
                    <div className="form-group">
                        <label>Location</label>
                        <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="Enter your location"
                            className="search-input"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Area</label>
                        <select
                            value={selectedArea}
                            onChange={(e) => setSelectedArea(e.target.value)}
                            className="search-select"
                            disabled={!areas.length}
                        >
                            {areas.length > 0 ? (
                                areas.map((area, index) => (
                                    <option key={index} value={area}>{area}</option>
                                ))
                            ) : (
                                <option value="">No areas found</option>
                            )}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Medical Specialty</label>
                        <select
                            value={specialty}
                            onChange={(e) => setSpecialty(e.target.value)}
                            className="search-select"
                        >
                            <option value="">All Medical Services</option>
                            {specialties.map((spec) => (
                                <option key={spec.id} value={spec.name}>{spec.name}</option>
                            ))}
                        </select>
                    </div>

                    <button type="submit" className="search-button" disabled={loading}>
                        {loading ? 'Searching...' : 'Find Medical Services'}
                    </button>
                </form>
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="practitioners-grid">
                {searchResults.map((facility) => (
                    <div key={facility.id} className="practitioner-card">
                        <div className="practitioner-header">
                            <h3>{facility.name}</h3>
                        </div>
                        <div className="practitioner-info">
                            <p><strong>Type:</strong> {facility.type}</p>
                            <p><strong>Location:</strong> {facility.location}</p>
                        </div>
                        <div className="practitioner-actions">
                            <button
                                className="book-btn"
                                onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${facility.lat},${facility.lon}`, '_blank')}
                            >
                                Get Directions
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {searchResults.length === 0 && !loading && !error && (
                <div className="empty-state">
                    <p>Enter a location to find medical services near you</p>
                </div>
            )}
        </div>
    );
};

export default Health;
