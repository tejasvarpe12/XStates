import React, { useState, useEffect } from 'react';
import './App.css'; // Import CSS file for styling

function App() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [error, setError] = useState(null); 

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
    const response = await fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`);
    const data = await response.json();
    setStates(data);
  };

  const fetchCities = async () => {
    const response = await fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`);
    const data = await response.json();
    setCities(data);
  };

  const handleCountryChange = (e) => {
    const country = e.target.value;
    setSelectedCountry(country);
    setSelectedState('');
    setSelectedCity('');
  };

  const handleStateChange = (e) => {
    const state = e.target.value;
    setSelectedState(state);
    setSelectedCity('');
  };

  const handleCityChange = (e) => {
    const city = e.target.value;
    setSelectedCity(city);
  };

  const isAllSelected = selectedCountry && selectedState && selectedCity;

  return (
    <div className="center-container">
      <div className="container">
        <h1>Select Location</h1>
        {error && <p className="error-message">Error: {error}</p>}
        
          <select className='country' value={selectedCountry} onChange={handleCountryChange}>
            <option value="" disabled>Select Country</option>
            {countries.map(country => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
        
        
          <select className='state' value={selectedState} onChange={handleStateChange} disabled={!selectedCountry}>
            <option value="" disabled>Select State</option>
            {states.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
       
          <select className='city' value={selectedCity} onChange={handleCityChange} disabled={!selectedState}>
            <option value="" disabled>Select City</option>
            {cities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        
        {isAllSelected && <p>You selected {selectedCity}, {selectedState}, {selectedCountry}</p>}
      </div>
    </div>
  );
}

export default App;
