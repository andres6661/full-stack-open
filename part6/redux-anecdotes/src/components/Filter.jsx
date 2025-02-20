import { setFilter } from "../reducers/filterReducer"
import { useDispatch } from "react-redux"

const Filter = () => {
    const dispatch = useDispatch()

    const handleChange = (event) => {
        const search = event.target.value
        dispatch(setFilter(search.trim().toLowerCase()))
    }
    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        filter <input onChange={handleChange} />
      </div>
    )
  }
  
  export default Filter