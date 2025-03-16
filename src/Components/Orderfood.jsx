import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Orderfood = () => {
  const [user, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4040/get")
      .then((response) => setUsers(response.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Box
      sx={{
        margin: '4%',
        textAlign: 'center',
        background: 'linear-gradient(135deg, #f5f7fa, #c3cfe2)',
        borderRadius: 4,
        p: 4,
        boxShadow: 3,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          marginBottom: 3,
          fontWeight: 'bold',
          color: '#333',
          textTransform: 'uppercase',
          letterSpacing: 2,
        }}
      >
        Food Orders
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {user
          .filter((val) => val.foodItems.some((food) => food.includes("(food)")))
          .map((val, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Card
                sx={{
                  minWidth: 275,
                  boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                  borderRadius: 3,
                  p: 2,
                  backgroundColor: '#fff',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0 12px 24px rgba(0,0,0,0.3)',
                  },
                }}
              >
                <CardContent>
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ fontWeight: 'bold', color: '#1976d2', mb: 1 }}
                  >
                    🍔 Order Details
                  </Typography>
                  {val.foodItems
                    .filter((food) => food.includes("(food)"))
                    .map((food, index) => (
                      <Typography
                        variant="body1"
                        key={index}
                        sx={{ fontSize: '1.1rem', marginBottom: '0.4rem', color: '#555' }}
                      >
                        🍽️ {food.replace("(food)", "")}
                      </Typography>
                    ))}
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#555' }}>
                      💰 Price: <span style={{ color: '#1976d2' }}>{val.totalPrice}</span>
                    </Typography>
                    <Typography variant="h6" sx={{ color: '#555' }}>
                      ✉️ Email: <span style={{ color: '#1976d2' }}>{val.email}</span>
                    </Typography>
                    <Typography variant="h6" sx={{ color: '#555' }}>
                      📝 Name: <span style={{ color: '#1976d2' }}>{val.name}</span>
                    </Typography>
                    <Typography variant="h6" sx={{ color: '#555' }}>
                      📞 Phone: <span style={{ color: '#1976d2' }}>{val.phone}</span>
                    </Typography>
                    <Typography variant="h6" sx={{ color: '#555' }}>
                      🆔 ID: <span style={{ color: '#1976d2' }}>{val.id}</span>
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default Orderfood;
