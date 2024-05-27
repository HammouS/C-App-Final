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
                {uniqueLocations.map((location, index) => {
                    const { name, kinds, wikidata } = location.properties;
                    const [longitude, latitude] = location.geometry.coordinates;
                    const mapLink = `https://www.google.com/maps?q=${latitude},${longitude}`;

                    return (
                        <li key={index} style={{ marginBottom: '10px', overflowWrap: 'break-word', wordWrap: 'break-word' }}>
                            <h3 style={{ margin: 0 }}>{name}</h3>
                            <p style={{ margin: 0 }}>{kinds.split(',').join(', ')}</p>
                            <a href={mapLink} target="_blank" rel="noopener noreferrer">View on Map</a>
                        </li>
                    );
                })}
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
            wikidata: PropTypes.string,
        }).isRequired,
        geometry: PropTypes.shape({
            coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
        }).isRequired,
    })).isRequired,
};

// Exporting the component
export default TouristLocations;
