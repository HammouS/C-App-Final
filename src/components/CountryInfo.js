import React from 'react'; // Import React library
import PropTypes from 'prop-types'; // Import PropTypes library

function CountryInfo({ countryData }) { // Define functional component CountryInfo and destructure countryData from props
    const countryLatLng = countryData.capitalInfo.latlng; // Get latitude and longitude for the country
    const countryMapLink = `https://www.google.com/maps?q=${countryLatLng[0]},${countryLatLng[1]}`; // Construct Google Maps link

    return (
        <div>
            {/* Display the country flag */}
            <img src={countryData.flags.svg} alt="Flag" className="flagImage" />
            {/* Display the country name */}
            <h2>{countryData.name.common}</h2>
            {/* Display the country's capital */}
            <div className="row">
                <div className="dataRow">
                    <h4>Capital:</h4>
                    <span>{countryData.capital[0]}</span>
                </div>
            </div>
            {/* Display the continent */}
            <div className="row">
                <div className="dataRow">
                    <h4>Continent:</h4>
                    <span>{countryData.continents[0]}</span>
                </div>
            </div>
            {/* Display the population */}
            <div className="row">
                <div className="dataRow">
                    <h4>Population:</h4>
                    <span>{countryData.population}</span>
                </div>
            </div>
            {/* Display the currency */}
            <div className="row">
                <div className="dataRow">
                    <h4>Currency:</h4>
                    <span>
                        {countryData.currencies[Object.keys(countryData.currencies)[0]].name} - {Object.keys(countryData.currencies)[0]}
                    </span>
                </div>
            </div>
            {/* Display the common languages */}
            <div className="row">
                <div className="dataRow">
                    <h4>Common Languages:</h4>
                    <span>
                        {Object.values(countryData.languages).toString().split(',').join(', ')}
                    </span>
                </div>
            </div>
            {/* Display the country's borders */}
            <div className="row">
                <div className="dataRow">
                    <h4>Borders:</h4>
                    <span>
                        {(countryData.borders) ? countryData.borders.join(', ') : "NAN"}
                    </span>
                </div>
            </div>
            {/* Display the area */}
            <div className="row">
                <div className="dataRow">
                    <h4>Area:</h4>
                    <span>{countryData.area}</span>
                </div>
            </div>
            {/* Display the calling area */}
            <div className="row">
                <div className="dataRow">
                    <h4>Calling Area:</h4>
                    <span>{countryData.idd.root}{countryData.idd.suffixes[0]}</span>
                </div>
            </div>
            {/* Display the capital's latitude and longitude */}
            <div className="row">
                <div className="dataRow">
                    <h4>Capital Latitudes and Longitudes:</h4>
                    <span>{countryLatLng[0]} {countryLatLng[1]}</span>
                </div>
            </div>
            {/* Display the timezones */}
            <div className="row">
                <div className="dataRow">
                    <h4>TimeZones:</h4>
                    <span>
                        {countryData.timezones.join(', ')}
                    </span>
                </div>
            </div>
            {/* Display a link to the country's location on Google Maps */}
            <div className="row">
                <div className="dataRow">
                    <h4>View on Map:</h4>
                    <span>
                        <a href={countryMapLink} target="_blank" rel="noopener noreferrer">Google Maps</a>
                    </span>
                </div>
            </div>
        </div>
    );
}

// Define prop types for CountryInfo component
CountryInfo.propTypes = {
    countryData: PropTypes.shape({
        flags: PropTypes.shape({
            svg: PropTypes.string.isRequired,
        }).isRequired,
        name: PropTypes.shape({
            common: PropTypes.string.isRequired,
        }).isRequired,
        capital: PropTypes.arrayOf(PropTypes.string).isRequired,
        continents: PropTypes.arrayOf(PropTypes.string).isRequired,
        population: PropTypes.number.isRequired,
        currencies: PropTypes.object.isRequired,
        languages: PropTypes.object.isRequired,
        borders: PropTypes.arrayOf(PropTypes.string),
        area: PropTypes.number.isRequired,
        idd: PropTypes.shape({
            root: PropTypes.string.isRequired,
            suffixes: PropTypes.arrayOf(PropTypes.string).isRequired,
        }).isRequired,
        capitalInfo: PropTypes.shape({
            latlng: PropTypes.arrayOf(PropTypes.number).isRequired,
        }).isRequired,
        timezones: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
};

export default CountryInfo; // Export the CountryInfo component
