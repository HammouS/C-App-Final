import React from 'react'; // Importing React
import PropTypes from 'prop-types'; // Importing PropTypes for type checking

// Function to remove duplicate tourist locations
const removeDuplicates = (locations) => {
    const uniqueLocations = [];
    const seenNames = new Set();

    locations.forEach(location => {
        if (!seenNames.has(location.properties.name)) {
            uniqueLocations.push(location);
            seenNames.add(location.properties.name);
        }
    });

    return uniqueLocations;
};

// Functional component to display tourist locations
function TouristLocations({ locations }) { 
    const uniqueLocations = removeDuplicates(locations);

    return (
        <div>
            <h2>Tourist Locations</h2>
            <ul style={{ padding: 0, listStyle: 'none' }}>
                {uniqueLocations.map((location, index) => (
                    <li key={index} style={{ marginBottom: '10px', overflowWrap: 'break-word', wordWrap: 'break-word' }}>
                        <h3 style={{ margin: 0 }}>{location.properties.name}</h3>
                        <p style={{ margin: 0 }}>{location.properties.kinds.split(',').join(', ')}</p>
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
