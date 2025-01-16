import { useState, useEffect } from 'react'
import countriesService from './services/countries'
import axios from "axios"
import Content from './components/Content'


function App() {
  const [countries, setCountries] = useState([])
  const [findCountries, setFindCountries] = useState('')
  const [selectedCountries, setSelectedCountries] = useState([])


  useEffect(() => {
      countriesService.showAll()
    .then(response => {setCountries(response.data)})
  }, [])

  const handleCountries = (event) => {
    const newFilter = event.target.value
    const filteredCountries = newFilter.trim().length === 0 
    ? countries 
    : countries.filter(country => country.name.common.toLowerCase().includes(newFilter.trim().toLowerCase()))
    setSelectedCountries(filteredCountries)
    setFindCountries(newFilter)
    
  }

  const handleSelectCountries = (country) => setSelectedCountries([country])
  
  

  return (
      <div>
        find countries <input value={findCountries} onChange={handleCountries}>
         </input> 
         <Content 
         countries={selectedCountries}
         selectCountries={handleSelectCountries}
         />
      </div>

  )
}

export default App
