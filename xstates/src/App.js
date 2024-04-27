import React, { useState, useEffect } from 'react';
import './App.css'; // Import CSS file for styling

function App() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [error, setError] = useState(null); // State to handle API errors

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      fetchStates();
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedState) {
      fetchCities();
    }
  }, [selectedState]);

  const fetchCountries = async () => {
    try {
      const response = await fetch('https://crio-location-selector.onrender.com/countries');
      if (!response.ok) {
        throw new Error('Failed to fetch countries');
      }
      const data = await response.json();
      setCountries(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const fetchStates = async () => {
    // Implementation remains the same
  };

  const fetchCities = async () => {
    // Implementation remains the same
  };

  const handleCountryChange = (e) => {
    // Implementation remains the same
  };

  const handleStateChange = (e) => {
    // Implementation remains the same
  };

  const handleCityChange = (e) => {
    // Implementation remains the same
  };

  const isAllSelected = selectedCountry && selectedState && selectedCity;

  return (
    <div className="center-container">
      <div className="container">
        <h1>Select Location</h1>
        {error && <p className="error-message">Error: {error}</p>}
        <div className="select-container">
          <select className='country' value={selectedCountry} onChange={handleCountryChange}>
            <option value="" disabled>Select Country</option>
            {countries.map(country => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
        </div>
        <div className="select-container">
          <select className='state' value={selectedState} onChange={handleStateChange} disabled={!selectedCountry}>
            <option value="" disabled>Select State</option>
            {states.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>
        <div className="select-container">
          <select className='city' value={selectedCity} onChange={handleCityChange} disabled={!selectedState}>
            <option value="" disabled>Select City</option>
            {cities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>
        {isAllSelected && <p>You selected {selectedCity}, {selectedState}, {selectedCountry}</p>}
      </div>
    </div>
  );
}

export default App;
