import { useSelector } from 'react-redux'
import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  Typography,
  Paper,
} from '@mui/material'
import { Link } from 'react-router-dom'

const Users = () => {
  const users = useSelector((state) => state.users)

  return (
    <div>
      <Paper sx={{ my: 2 }}>
        <Typography variant='h4' sx={{ pl: 1 }}>
          Users
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Blogs Created</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[...users].map((user) => (
                <TableRow key={user.id} hover>
                  <TableCell>
                    <Link to={`/users/${user.id}`}>{user.name}</Link>
                  </TableCell>
                  <TableCell>{user.blogs.length}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  )
}

export default Users
