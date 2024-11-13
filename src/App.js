import { Routes, Route } from 'react-router-dom';
import { Countries } from './components/Countries';
import { CountryItem } from './components/CountryItem';
import './App.css';

function App() {
  return (
    <>
      <Routes>
          <Route path="/" element={<Countries />} />
          <Route path="/:countryCode" element={<CountryItem />} />
      </Routes>
    </>
  );
}
export default App;