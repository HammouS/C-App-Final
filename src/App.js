// Importing the necessary files
import './App.css'; // Importing the CSS file for styling
import CountryInformation from './components/CountryInformation'; // Importing the CountryInformation component from the components directory

// Defining the main functional component named App
function App() {
    // Returning JSX (JavaScript XML) which represents the UI of the component
    return (
        <div className="App"> {/* Creating a div with class name "App" */}
            <CountryInformation /> {/* Rendering the CountryInformation component */}
        </div>
    );
}

// Exporting the App component as the default export of this file
export default App;
