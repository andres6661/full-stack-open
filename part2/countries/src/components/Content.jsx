import Countries from "./Countries"
import Country from "./Country"

const Content = ({ countries, selectCountries }) => {
    /*
    const countriesFilter = findCountries.length === 0 ? countries : countries.filter(c => c.name.common.toLowerCase().includes(findCountries.toLowerCase()))
    */
    if (countries.length > 10) {
        return (
            <p> to many matches, specify another filter </p>
        )
    }
    if (countries.length <= 10 && countries.length > 1) {
        return (
            <div>
                <Countries countries={countries} showContry={selectCountries}/>
            </div>
        )
    }
    if (countries.length === 1) {
        return(
            <Country country={countries[0]} />
        )
    }

}

export default Content