import './App.scss';
import React, {useState, useEffect} from 'react';
import {SearchBox} from './components/SearchBox';
import {HotelsContainer} from './components/HotelsContainers';
import {Spinner} from './components/Spinner';
import Axios from 'axios';
import {SortByName} from './components/SortByName';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('cars');
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sort,setSort] = useState(false);
  
  const getSearchTerm = (e) => {
    setLoading(true);
    setSearchTerm(e.target.value);
  }

  const sortByName = () => {
    setSort(true);
  }
  if (sort){
      hotels.sort((hotel1,hotel2)=> hotel1.name.toLowerCase().localeCompare(hotel2.name.toLowerCase()));
  }
  useEffect(() => {
    const fetchHotels = async () => {
        const result = await Axios.get(`/hotels?search=${searchTerm}`);
        const filteredHotels = result.data.result;
        setHotels(filteredHotels);
        setLoading(false);
    }
    fetchHotels();
  }, [searchTerm])
  return (
    <>
      <div className="query-section">
        <SearchBox onSearch={getSearchTerm}/>
        <SortByName sort={sortByName}/>
      </div>
      {loading ? <Spinner / >:<HotelsContainer hotels={hotels}/>}
    </>
  )
}

export default App;
