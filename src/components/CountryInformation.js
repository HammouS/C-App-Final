import React, { useState } from 'react'; 
import Button from '@mui/material/Button'; 
import './CountryInformation.css'; 
import CountryInfo from './CountryInfo'; 
import TouristLocations from './TouristLocation'; 
import PropTypes from 'prop-types'; 

const OPEN_TRIP_MAP_API_KEY = '5ae2e3f221c38a28845f05b60d6234dd138db79959e6be6cc1d1e495'; // Replace with your actual OpenTripMap API key

function CountryInformation() { 
    const [countryName, setCountryName] = useState(''); 
    const [countryData, setCountryData] = useState(null); 
    const [touristLocations, setTouristLocations] = useState([]); 
    const [error, setError] = useState(''); 

    const handleSearch = () => { 
        if (!countryName.trim()) { 
            setError('The input field cannot be empty'); 
            setCountryData(null); 
            setTouristLocations([]); 
            return; 
        } 

        const finalURL = `https://restcountries.com/v3.1/name/${countryName.trim()}?fullText=true`; 
        console.log(`Fetching country data from: ${finalURL}`); // Logging URL

        fetch(finalURL)
            .then((response) => {
                if (!response.ok) {
                    console.error('Network response was not ok', response.statusText); // Log response status
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

                    const touristURL = `https://api.opentripmap.com/0.1/en/places/geoname?name=${data[0].capital[0]}&apikey=${OPEN_TRIP_MAP_API_KEY}`;
                    console.log(`Fetching geoname data from: ${touristURL}`); // Logging URL
                    fetch(touristURL)
                        .then((response) => {
                            if (!response.ok) {
                                console.error('Failed to fetch geoname data', response.statusText); // Log response status
                                throw new Error('Failed to fetch geoname data');
                            }
                            return response.json();
                        })
                        .then((geonameData) => {
                            const { lat, lon } = geonameData;
                            const attractionsURL = `https://api.opentripmap.com/0.1/en/places/radius?radius=10000&lon=${lon}&lat=${lat}&apikey=${OPEN_TRIP_MAP_API_KEY}`;
                            console.log(`Fetching attractions data from: ${attractionsURL}`); // Logging URL
                            return fetch(attractionsURL);
                        })
                        .then((response) => {
                            if (!response.ok) {
                                console.error('Failed to fetch attractions data', response.statusText); // Log response status
                                throw new Error('Failed to fetch attractions data');
                            }
                            return response.json();
                        })
                        .then((attractionsData) => {
                            setTouristLocations(attractionsData.features);
                        })
                        .catch((err) => {
                            console.error('Error while fetching tourist locations:', err.message); // Log error
                            setError('An error occurred while fetching tourist locations.');
                            setTouristLocations([]);
                        });
                } 
            })
            .catch((err) => { 
                console.error('Error while fetching country data:', err.message); // Log error
                setError('An error occurred while fetching data.'); 
                setCountryData(null); 
                setTouristLocations([]); 
            }); 
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
                {error && <h3>{error}</h3>} 
                {countryData && (<CountryInfo countryData={countryData} />)} 
                {touristLocations.length > 0 && (<TouristLocations locations={touristLocations} />)}
            </div> 
        </div> 
    ); 
} 

CountryInfo.propTypes = {
    countryData: PropTypes.object.isRequired,
};

TouristLocations.propTypes = {
    locations: PropTypes.array.isRequired,
};

export default CountryInformation;
