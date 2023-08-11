import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';
import { Typography } from '@mui/material';
import Paper from '@mui/material/Paper';

// Generate Sales Data

export default function Chart(props) {
  const theme = useTheme();

  return (
    <React.Fragment>
      <Title>Hello, {props.name}</Title>
      <ResponsiveContainer>
       
      <Paper elevation={3} sx={{ padding: '20px' }}>
      
        <div>
          <Typography variant="body1">
            <strong>Name:</strong> {props.name}
          </Typography>
        </div>
        <div>
          <Typography variant="body1">
            <strong>Email:</strong> {props.email}
          </Typography>
        </div>
        <div>
          <Typography variant="body1">
            <strong>Phone:</strong> {props.phone}
          </Typography>
        </div>
      </Paper>


      </ResponsiveContainer>
    </React.Fragment>
  );
}