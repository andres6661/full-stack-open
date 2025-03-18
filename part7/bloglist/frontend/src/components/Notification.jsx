import { useSelector } from 'react-redux'
import { Alert } from '@mui/material'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  return (
    <div>
      {notification && (
        <Alert severity={notification.type}>{notification.message} </Alert>
      )}
    </div>
  )
}

export default Notification
