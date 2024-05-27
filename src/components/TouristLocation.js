import React from 'react'; // Importing React
import PropTypes from 'prop-types'; // Importing PropTypes for type checking

// Functional component to display tourist locations
function TouristLocations({ locations }) { 
    return (
        <div>
            <h2>Tourist Locations</h2>
            <ul>
                {locations.map((location, index) => (
                    <li key={index}>
                        <h3>{location.properties.name}</h3>
                        <p>{location.properties.kinds}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

// Define prop types for TouristLocations component
TouristLocations.propTypes = {
    locations: PropTypes.arrayOf(PropTypes.shape({
        properties: PropTypes.shape({
            name: PropTypes.string.isRequired,
            kinds: PropTypes.string.isRequired,
        }).isRequired,
    })).isRequired,
};

// Exporting the component
export default TouristLocations;
