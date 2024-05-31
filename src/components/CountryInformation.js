import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import './CountryInformation.css';
import CountryInfo from './CountryInfo';
import TouristLocations from './TouristLocation';
import PropTypes from 'prop-types';

const OPEN_TRIP_MAP_API_KEY = '5ae2e3f221c38a28845f05b60d6234dd138db79959e6be6cc1d1e495'; 

// Main component to fetch and display country information
function CountryInformation() {
    const [countryName, setCountryName] = useState('');
    const [countryData, setCountryData] = useState(null);
    const [touristLocations, setTouristLocations] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        // Get country name from URL parameters if available
        const params = new URLSearchParams(window.location.search);
        const country = params.get('country');
        if (country) {
            setCountryName(country);
            fetchCountryData(country);
        }
    }, []);

    const fetchCountryData = (name) => {
        const finalURL = `https://restcountries.com/v3.1/name/${name.trim()}?fullText=true`;
        console.log(`Fetching country data from: ${finalURL}`);

        fetch(finalURL)
            .then((response) => {
                if (!response.ok) {
                    console.error('Network response was not ok', response.statusText);
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                if (data.status === 404 || data.message === 'Not Found') {
                    setError("Country Information is not Found");
                    setCountryData(null);
                    setTouristLocations([]);
                } else if (data.length === 0) {
                    setError('Please enter a valid country name.');
                    setCountryData(null);
                    setTouristLocations([]);
                } else {
                    setError('');
                    setCountryData(data[0]);

                    // Fetch tourist locations based on the country's capital city
                    const touristURL = `https://api.opentripmap.com/0.1/en/places/geoname?name=${data[0].capital[0]}&apikey=${OPEN_TRIP_MAP_API_KEY}`;
                    console.log(`Fetching geoname data from: ${touristURL}`);
                    fetch(touristURL)
                        .then((response) => {
                            if (!response.ok) {
                                console.error('Failed to fetch geoname data', response.statusText);
                                throw new Error('Failed to fetch geoname data');
                            }
                            return response.json();
                        })
                        .then((geonameData) => {
                            const { lat, lon } = geonameData;
                            const attractionsURL = `https://api.opentripmap.com/0.1/en/places/radius?radius=10000&lon=${lon}&lat=${lat}&apikey=${OPEN_TRIP_MAP_API_KEY}`;
                            console.log(`Fetching attractions data from: ${attractionsURL}`);
                            return fetch(attractionsURL);
                        })
                        .then((response) => {
                            if (!response.ok) {
                                console.error('Failed to fetch attractions data', response.statusText);
                                throw new Error('Failed to fetch attractions data');
                            }
                            return response.json();
                        })
                        .then((attractionsData) => {
                            setTouristLocations(attractionsData.features);
                        })
                        .catch((err) => {
                            console.error('Error while fetching tourist locations:', err.message);
                            setError('An error occurred while fetching tourist locations.');
                            setTouristLocations([]);
                        });
                }
            })
            .catch((err) => {
                console.error('Error while fetching country data:', err.message);
                setError('An error occurred while fetching data.');
                setCountryData(null);
                setTouristLocations([]);
            });
    };

    const handleSearch = () => {
        if (!countryName.trim()) {
            setError('The input field cannot be empty');
            setCountryData(null);
            setTouristLocations([]);
            return;
        }
        fetchCountryData(countryName);
    };

    return (
        <div className="container">
            <div className="search">
                <input
                    type="text"
                    id="countryName"
                    placeholder="Enter a country name here..."
                    value={countryName}
                    onChange={(e) => setCountryName(e.target.value)}
                />
                <Button
                    variant="contained"
                    color="primary"
                    id="search-btn"
                    onClick={handleSearch}
                >
                    Search
                </Button>
            </div>
            <div id="result">
                {error && <h3 className="error">{error}</h3>}
                {countryData && <CountryInfo countryData={countryData} />}
                {touristLocations.length > 0 && <TouristLocations locations={touristLocations} />}
            </div>
        </div>
    );
}

// Define prop types for CountryInformation component
CountryInformation.propTypes = {
    setShowLinks: PropTypes.func.isRequired,
};

export default CountryInformation;
