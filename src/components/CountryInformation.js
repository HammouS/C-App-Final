import React, { useState } from 'react'; // Importing React and useState hook
import Button from '@mui/material/Button'; // Importing the MUI Button component
import './CountryInformation.css'; // Importing CSS styles for the component
import CountryInfo from './CountryInfo'; // Importing the CountryInfo component
import PropTypes from 'prop-types'; // Importing PropTypes for type checking

function CountryInformation() { 
	// State variables to manage input value, fetched country data, and error messages
	const [countryName, setCountryName] = useState(''); 
	const [countryData, setCountryData] = useState(null); 
	const [error, setError] = useState(''); 

	// Function to handle search button click
	const handleSearch = () => { 
		// If input field is empty, set error message and reset country data
		if (!countryName) { 
			setError('The input field cannot be empty'); 
			setCountryData(null); 
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
				}
				// If no countries are found for the entered name, set error message and reset country data
				else if (data.length === 0) { 
					setError('Please enter a valid country name.'); 
					setCountryData(null); 
				} 
				// If country data is found, reset error message and set country data
				else { 
					setError(''); 
					setCountryData(data[0]); 
				} 
			}) 
			// Catching any errors that occur during fetching
			.catch(() => { 
				setError('An error occurred while fetching data.'); 
				setCountryData(null); 
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
			</div> 
		</div> 
	); 
} 

// Exporting the component
export default CountryInformation; 
