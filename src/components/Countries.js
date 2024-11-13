import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css';



const Countries = () => {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCountries = async () => {
        try {
            const response = await fetch(process.env.REACT_APP_URL);
            const data = await response.json();
            setCountries(data);
        } catch (err) {
            setError('Error fetching countries', err);
        } finally {
            setLoading(false);
        }
        };

        fetchCountries();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

    return (
        <div className='container'> 
            <h1>Available Countries</h1>
            <div className='countries-box'>
                {countries.map((country) => (
                <Link key={country} to={`/${country.countryCode}`} >
                    <li>{country.name}</li>
                </Link>
            ))}
            </div>
            
        </div>
    );
};

export {Countries};