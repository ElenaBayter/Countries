import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Population from './Population';


const CountryItem = () => {
    const {countryCode} = useParams();
    const navigate = useNavigate();
    const [countryName, setCountryName] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedFlagObject, setSelectedFlagObject] = useState(null);
    const [flagsArray, setFlagsArray] = useState([]);
    const [bordersArray, setBordersArray] = useState([]);

    const goBack = () => navigate(-1);

    useEffect(() => {
        const fetchFlags = async () => {
            try {
                const response = await fetch(process.env.REACT_APP_URL_FLAG);
                const data = await response.json();
                setFlagsArray(data.data);
                const selected = flagsArray.find((flag) => flag.iso2 === countryCode);
                setSelectedFlagObject(selected);
            } catch (err) {
                setError('Error fetching countries', err);
            } finally {
                setLoading(false);
            }
        };
        fetchFlags();
  }, [countryCode, flagsArray]);

  useEffect(() => {
    const fetchBorders = async () => {
        try {
            const response = await fetch(process.env.REACT_APP_URL_BORDERS + `/${countryCode}`);
            const data = await response.json();
            setBordersArray(data.borders);
            setCountryName(data.commonName);
        } catch (err) {
            setError('Error fetching countries', err);
        } finally {
            setLoading(false);
        }
    };
    fetchBorders();
}, [countryCode]);



  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

    return (
        <div style={styles.container}>
            {countryName && <h1>{countryName}</h1>}
            {selectedFlagObject ? (
                <div style={styles.flag}>  
                    <img style={styles.img} src={selectedFlagObject.flag} alt={selectedFlagObject.name}/>
                </div>
            ) : <p>No flag available for this country</p>}
            {bordersArray.length > 0 && 
                <>
                  <h3>Countries that have bodrers with {countryName}</h3>
                    <ul>
                        {bordersArray.map((border) => (
                            <Link key={border.countryCode} to={`/${border.countryCode}`}>
                                <li>{border.commonName}</li>
                            </Link>
                        ))}
                    </ul>  
                </> 
            }
            {bordersArray.length === 0 && <p>This country don't have neighbours</p>}
            <Population countryName={countryName}/>        
            <button style={styles.button} onClick={goBack}>Go back</button>
        </div>
    );
};
const styles = {
    container: {
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
    },
    flag: {
        width: '200px',
    },
    img:{
        width: 'inherit',
        border: '1px solid grey'
    },
    button: {
        borderRadius: '4px', 
        border: '1px solid grey', 
        padding: '5px 7px'
    }
}

export {CountryItem};