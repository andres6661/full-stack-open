import { createContext, useReducer, useContext } from "react";

const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'message':
            return {content: action.payload}
        case 'remove':
            return {content: action.payload}
        default:
            return state
    }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, {content: ''})

    return(
        <NotificationContext.Provider value={[notification, notificationDispatch]}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export const setNotification = () => {
    const notificationAndDispatch = useContext(NotificationContext)
    const dispatch = notificationAndDispatch[1]
    return (payload) => {
        dispatch({type: 'message', payload})
        setTimeout(() => {
            dispatch({type: 'remove', payload: ''})
        }, 5000);
    }
}

export const useNotificationValue = () => {
    const notificationAndDispatch = useContext(NotificationContext)
    return notificationAndDispatch[0].content
}

export default NotificationContext
