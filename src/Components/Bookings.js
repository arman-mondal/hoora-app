import {React,useState,useEffect} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import "../CSS/tailwind.css"
import axios from "axios";

export default function Bookings() {
    
        const [bookingHistory, setBookingHistory] = useState([]);
        const userEmail =sessionStorage.getItem('email')

      
        useEffect(() => {
          // Fetch user-specific booking history data from your API
          async function fetchUserBookingHistory() {
            try {
              const userEmail =sessionStorage.getItem('email')
              const response = await axios.post('http://localhost:5050/api/booking-history', { email: userEmail });
              setBookingHistory(response.data);
            } catch (error) {
              console.error('Error fetching user booking history', error);
            }
          }
      
          fetchUserBookingHistory();
        }, [userEmail]);

  return (
    <Card variant='outline' className="m-5 mt-20" >
      <CardActionArea>
      
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            My Bookings
          </Typography>
          <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Car Model</TableCell>
            <TableCell>Car Brand</TableCell>
            <TableCell>Wash Type</TableCell>
            <TableCell>Booking Date & Time</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Transaction Time</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {bookingHistory.map((booking) => (
            <TableRow key={booking._id}>
              <TableCell>{booking.carModel}</TableCell>
              <TableCell>{booking.carBrand}</TableCell>
              <TableCell>{booking.washType}</TableCell>
              <TableCell>{new Date(booking.customBookingDateTime).toLocaleString()}</TableCell>

              <TableCell>{booking.address}</TableCell>
              <TableCell>{new Date(booking.bookingDateTime).toLocaleString()}</TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

        </CardContent>
      </CardActionArea>
      <CardActions>
        
      </CardActions>
    </Card>
  );
}
