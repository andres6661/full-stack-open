const Countries = ({countries, showContry}) =>{
    return(
        <div>
            {countries.map(country => <p key={country.name.common}>
                {country.name.common} <button onClick={() => showContry(country)}>show</button> </p> )}
                
        </div>
    )
}

export default Countries