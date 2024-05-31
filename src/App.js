import React, { useState } from 'react';
import './App.css';
import CountryInformation from './components/CountryInformation';

function App() {
    const [showLinks, setShowLinks] = useState(false);
    const countries = ['USA', 'UK', 'Spain', 'Japan', 'Italy', 'India', 'Germany', 'France', 'Canada', 'Australia']; // List of countries

    // Sort the countries alphabetically
    const sortedCountries = countries.sort((a, b) => a.localeCompare(b));

    return (
        <div className="App">
            <div className="toggle-links-container">
                <button className="toggle-button" onClick={() => setShowLinks(!showLinks)}>Toggle Links</button>
                {showLinks && (
                    <div className="nav-links">
                        {sortedCountries.map((country, index) => (
                            <a key={index} href={`?country=${encodeURIComponent(country)}`} className="nav-link">{country}</a>
                        ))}
                    </div>
                )}
            </div>
            <CountryInformation setShowLinks={setShowLinks} />
        </div>
    );
}





export default App;
