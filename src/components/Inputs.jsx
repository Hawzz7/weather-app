import React, { useState } from 'react';
import { UilSearch, UilLocationPoint } from '@iconscout/react-unicons'
import { toast } from 'react-toastify';

const Inputs = ({setQuery, units, setUnits}) => {
  const [city, setCity] = useState("")

  const hanndleUnitsChange = (e) => {
    const selectedUnit = e.currentTarget.name
    if(units !== selectedUnit) setUnits(selectedUnit);
  }

  const handleSearchClick = () => {
    if(city !== "") setQuery({q: city})
  }

  const handleLocationClick = () => {
    if(navigator.geolocation){
      toast.info("Fetching users location.")
      navigator.geolocation.getCurrentPosition((position) => {
        toast.success("Location fetched")
        let lat = position.coords.latitude
        let lon = position.coords.longitude

        setQuery({lat, lon});
      });
    };
  };

  return (
    <div className='flex flex-row justify-center my-6'>
        <div className='flex flex-row items-center justify-center w-3/4 space-x-4'>
            <input
            value={city}
            onChange={(e) => setCity(e.currentTarget.value)}
            type="text" 
            placeholder='search for city' className='w-full p-2 text-xl font-light capitalize rounded-md shadow-xl focus:outline-none placeholder:lowercase' />

            <UilSearch size={25} className="text-white transition ease-out cursor-pointer hover:scale-125"
            onClick={handleSearchClick}/>
            
            <UilLocationPoint size={25} className="text-white transition ease-out cursor-pointer hover:scale-125"
            onClick={handleLocationClick}
            />
        </div>

        <div className='flex flex-row items-center justify-center w-1/4'>
            <button name='metric' className='text-xl font-light text-white transition ease-out hover:scale-125'
            onClick={hanndleUnitsChange}
            >°C</button> 

            <p className='mx-1 text-xl text-white'>|</p>

            <button name='imperial' className='text-xl font-light text-white transition ease-out hover:scale-125'
            onClick={hanndleUnitsChange}
            >°F</button>
        </div>
    </div>
  )
}

export default Inputs