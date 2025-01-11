const Person = ({name, number, removeNumber}) => {

    return (
        <div>
            <p>
                {name} {number} 
                <button onClick={removeNumber}>delete</button>
            </p>
            
        </div>
    )
}

export default Person