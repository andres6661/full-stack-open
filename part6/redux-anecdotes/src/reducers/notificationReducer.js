import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        setNotification(state, action) {
            return action.payload
        },
        removeNotification(state, action) {
            return null
        }
    }
})

export const { setNotification, removeNotification } = notificationSlice.actions

export const notificationWithTimeout = (content, time) => {
    return async dispatch => {
        dispatch(setNotification(content))
        setTimeout(() => {
            dispatch(removeNotification())
        }, time * 1000);
    }
}
export default notificationSlice.reducer