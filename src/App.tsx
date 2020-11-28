import './App.scss';
import React, {useState, useEffect} from 'react';
import {SearchBox} from './components/SearchBox';
import {HotelsContainer} from './components/HotelsContainers';
import {Spinner} from './components/Spinner';
import Axios from 'axios';
import {SortByName} from './components/SortByName';

interface ServerResponse{
  data:ResponseData,
}
export interface Hotel{
  "_id": string,
  "id": number,
  "name": string,
  "address":string,
  "images":{ url: string, caption: string }[],
}
interface ResponseData {
  success: boolean,
  error:string,
  result: Hotel[],
}
const App: React.FunctionComponent = () => {

  const [searchTerm, setSearchTerm] = useState<string>('cars');
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [sort,setSort] = useState<boolean>(false);

  const getSearchTerm = (e: React.BaseSyntheticEvent) => {
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
        const response : ServerResponse = await Axios.get(`/hotels?search=${searchTerm}`);
        const filteredHotels : Hotel[] = response.data.result;
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
