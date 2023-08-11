import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography } from '@mui/material';
import "../CSS/tailwind.css"
const ProfilePage = (props) => { return (
    <Container  maxWidth="md" sx={{ marginTop: '100px' }}>
      <Paper elevation={3} sx={{ padding: '20px' }}>
        <Typography variant="h4" gutterBottom>
          Profile Page
        </Typography>
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
    </Container>
  );
};

export default ProfilePage;
