import React from 'react';
import PropTypes from 'prop-types';

function CountryInfo({ countryData }) {
    const countryLatLng = countryData.capitalInfo.latlng;
    const countryMapLink = `https://www.google.com/maps?q=${countryLatLng[0]},${countryLatLng[1]}`;

    return (
        <div>
            <img src={countryData.flags.svg} alt="Flag" className="flagImage" />
            <h2>{countryData.name.common}</h2>
            <div className="row">
                <div className="dataRow">
                    <h4>Capital:</h4>
                    <span>{countryData.capital[0]}</span>
                </div>
            </div>
            <div className="row">
                <div className="dataRow">
                    <h4>Continent:</h4>
                    <span>{countryData.continents[0]}</span>
                </div>
            </div>
            <div className="row">
                <div className="dataRow">
                    <h4>Population:</h4>
                    <span>{countryData.population.toLocaleString()}</span>
                </div>
            </div>
            <div className="row">
                <div className="dataRow">
                    <h4>Area:</h4>
                    <span>{countryData.area.toLocaleString()} km²</span>
                </div>
            </div>
            <div className="row">
                <div className="dataRow">
                    <h4>Languages:</h4>
                    <span>{Object.values(countryData.languages).join(', ')}</span>
                </div>
            </div>
            <div className="row">
                <div className="dataRow">
                    <h4>Currency:</h4>
                    <span>{Object.values(countryData.currencies).map(c => c.name).join(', ')}</span>
                </div>
            </div>
            <div className="row">
                <div className="dataRow">
                    <h4>Time Zone:</h4>
                    <span>{countryData.timezones[0]}</span>
                </div>
            </div>
            <div className="row">
                <div className="dataRow">
                    <h4>Map:</h4>
                    <a href={countryMapLink} target="_blank" rel="noreferrer">View on Google Maps</a>
                </div>
            </div>
        </div>
    );
}

CountryInfo.propTypes = {
    countryData: PropTypes.object.isRequired,
};

export default CountryInfo;
