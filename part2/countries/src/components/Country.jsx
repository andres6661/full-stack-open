import Weather from "./Weather"

const Country = ({ country }) => {
    return (
        <div>
            <h2>{country.name.common}</h2>
            <p>Capital: {country.capital}</p>
            <p>Area: {country.area}</p>
            <h3>languages:</h3>
            <ul>
                {Object.keys(country.languages).map((key) =>
                    <li key={key}>{country.languages[key]} </li>
                )}
            </ul>
            <img src={country.flags.png} alt={country.flags.alt}></img>
            <Weather capital={country.capital[0]}
                lat={country.capitalInfo.latlng[0]}
                lon={country.capitalInfo.latlng[1]}
            />
        </div>
    )
}

export default Country