import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async (content) => {
    const obj = {content, votes: 0}
    const response = await axios.post(baseUrl, obj)
    return response.data
}

const updateVote = async (object) => {
    const changeObj = {...object, votes: object.votes + 1}
    const response = await axios.put(`${baseUrl}/${object.id}`, changeObj)
    return response.data
}

export default {
    getAll,
    createNew,
    updateVote
}