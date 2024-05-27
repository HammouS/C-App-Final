import React, { useState } from 'react'; // Importing React and useState hook
import Button from '@mui/material/Button'; // Importing the MUI Button component
import './CountryInformation.css'; // Importing CSS styles for the component
import CountryInfo from './CountryInfo'; // Importing the CountryInfo component
import TouristLocations from './TouristLocation'; // Importing the TouristLocations component
import PropTypes from 'prop-types'; // Importing PropTypes for type checking

const OPEN_TRIP_MAP_API_KEY = '5ae2e3f221c38a28845f05b60d6234dd138db79959e6be6cc1d1e495'; // Replace with your actual OpenTripMap API key

function CountryInformation() { 
    // State variables to manage input value, fetched country data, tourist locations, and error messages
    const [countryName, setCountryName] = useState(''); 
    const [countryData, setCountryData] = useState(null); 
    const [touristLocations, setTouristLocations] = useState([]); 
    const [error, setError] = useState(''); 

    // Function to handle search button click
const handleSearch = () => { 
    // If input field is empty, set error message and reset country data
    if (!countryName) { 
        setError('The input field cannot be empty'); 
        setCountryData(null); 
        setTouristLocations([]); // Reset tourist locations
        return; 
    } 

    // Constructing the URL for fetching country data
    const finalURL = `https://restcountries.com/v3.1/name/${countryName.trim()}?fullText=true`; 
    fetch(finalURL) // Fetching data from the URL
        .then((response) => response.json()) // Parsing the JSON response
        .then((data) => { // Handling the fetched data
            // If country information is not found, set error message and reset country data
            if(data.message === "Not Found"){ 
                setError("Country Information is not Found"); 
                setCountryData(null); 
                setTouristLocations([]); // Reset tourist locations
            }
            // If no countries are found for the entered name, set error message and reset country data
            else if (data.length === 0) { 
                setError('Please enter a valid country name.'); 
                setCountryData(null); 
                setTouristLocations([]); // Reset tourist locations
            } 
            // If country data is found, reset error message and set country data
            else { 
                setError(''); 
                setCountryData(data[0]); 

                // Fetch tourist locations for the country
                const touristURL = `https://api.opentripmap.com/0.1/en/places/geoname?name=${data[0].capital[0]}&apikey=${OPEN_TRIP_MAP_API_KEY}`;
                fetch(touristURL)
                    .then((response) => response.json())
                    .then((geonameData) => {
                        const { lat, lon } = geonameData;
                        const attractionsURL = `https://api.opentripmap.com/0.1/en/places/radius?radius=10000&lon=${lon}&lat=${lat}&apikey=${OPEN_TRIP_MAP_API_KEY}`;
                        return fetch(attractionsURL);
                    })
                    .then((response) => response.json())
                    .then((attractionsData) => {
                        setTouristLocations(attractionsData.features); // Assuming the API returns a features array
                    })
                    .catch(() => {
                        setError('An error occurred while fetching tourist locations.');
                        setTouristLocations([]); // Reset tourist locations
                    });
            } 
        }) 
        // Catching any errors that occur during fetching
        .catch(() => { 
            setError('An error occurred while fetching data.'); 
            setCountryData(null); 
            setTouristLocations([]); // Reset tourist locations
        }); 
};  

    // Rendering the component
    return ( 
        <div className="container"> 
            <div className="search"> 
                {/* Input field for entering country name */}
                <input 
                    type="text"
                    id="countryName"
                    placeholder="Enter a country name here..."
                    value={countryName} 
                    onChange={(e) => setCountryName(e.target.value)} 
                /> 
                {/* Search button triggering handleSearch function */}
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
                {/* Displaying error message if there is any */}
                {error && <h3>{error}</h3>} 
                {/* Rendering CountryInfo component if country data is available */}
                {countryData && (<CountryInfo countryData={countryData} />)} 
                {/* Rendering TouristLocations component if tourist locations are available */}
                {touristLocations.length > 0 && (<TouristLocations locations={touristLocations} />)}
            </div> 
        </div> 
    ); 
} 

// Exporting the component
export default CountryInformation;
