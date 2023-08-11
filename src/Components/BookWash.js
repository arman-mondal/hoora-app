import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { DateTimePicker } from '@mui/lab';
import axios from 'axios';
import "../CSS/tailwind.css"

const WashBookingForm = () => {
  const [carModel, setCarModel] = useState('');
  const [carBrand, setCarBrand] = useState('');
  const [washType, setWashType] = useState('');
  const [bookingDateTime, setBookingDateTime] = useState(new Date());
  const [customBookingDateTime, setCustomBookingDateTime] = useState('');
  const [address, setAddress] = useState('');

  const handleBookCarWash = async () => {
    try {
        const email=sessionStorage.getItem('email');
        console.log(email)
        const formData = {
            email:email,
            carModel,
            carBrand,
            washType,
            bookingDateTime: bookingDateTime,
            customBookingDateTime, // Include customBookingDateTime in the request
            address,
          };
          const currentDate = new Date();
          if (new Date(formData.customBookingDateTime) <= currentDate) {
           alert('Booking date must be after the current date');
            return;
          }
      // Send the data to your API endpoint
      await axios.post('http://localhost:5050/api/book-car-wash', formData);

      console.log('Car wash booking successful');
      
    } catch (error) {
      console.error('Error booking car wash', error);
    }
  };

  return (
    <Box className="mt-20 ml-20" >
      <TextField
        label="Car Model"
        value={carModel}
        onChange={(e) => setCarModel(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Car Brand"
        value={carBrand}
        onChange={(e) => setCarBrand(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Autocomplete
        options={['Normal', 'Medium', 'Premium']}
        value={washType}
        onChange={(_, newValue) => setWashType(newValue)}
        renderInput={(params) => <TextField {...params} label="Wash Type" fullWidth margin="normal" />}
      />
      <DateTimePicker
        label="Default Booking Date & Time"
        value={bookingDateTime}
        onChange={(newDateTime) => setBookingDateTime(newDateTime)}
        renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
      />

      <TextField
        label="Custom Booking Date & Time"
        type="datetime-local"
        value={customBookingDateTime}
        onChange={(e) => setCustomBookingDateTime(e.target.value)}
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        label="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color='secondary' onClick={handleBookCarWash}>
        Book Car Wash
      </Button>
    </Box>
  );
};

export default WashBookingForm;
