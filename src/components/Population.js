import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, LineController, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';

// Register necessary components for Chart.js
Chart.register(CategoryScale, LinearScale, LineController, LineElement, PointElement, Title, Tooltip, Legend);

const Population = ({ countryName }) => {
    const [populationArray, setPopulationArray] = useState([]);
    const [selectedPopulation, setSelectedPopulation] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPopulation = async () => {
            try {
                const response = await fetch(process.env.REACT_APP_URL_POP);
                const data = await response.json();
                setPopulationArray(data.data);

                const selectedCountry = data.data.find((country) => country.country === countryName);
                if (selectedCountry && selectedCountry.populationCounts) {
                    setSelectedPopulation(selectedCountry.populationCounts);
                } else {
                    setError('Country or population data not found');
                }
            } catch (err) {
                setError('Error fetching countries');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchPopulation();
    }, [countryName]);

    const data = {
        labels: selectedPopulation.map(el => el.year),
        datasets: [{
            label: 'Population by Year',
            data: selectedPopulation.map(el => el.value),
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    };

    const config = {
        type: 'line',
        data: data,
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h2>Population Growth: {countryName}</h2>
            <Line data={data} options={config} />
        </div>
    );
};

export default Population;