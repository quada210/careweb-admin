import React, { useState } from "react";
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Container, 
  InputAdornment, 
  IconButton 
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
const Mediuserlogin = () => {
    const [password, setPassword] = useState("");
    const [userid, setUserid] = useState("");
    const [loginError, setLoginError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      axios
        .post("http://localhost:4040/mediuserlogin", { userid, password })
        .then((result) => {
          console.log(result.data);
          if (result.data === "successful") {
            navigate("/fhome");
          } else {
            setLoginError("Invalid email or password. Please try again.");
          }
        })
        .catch((err) => {
          console.error("Login error:", err);
          setLoginError("Something went wrong. Please try again later.");
        });
    };
  
    const handleClickShowPassword = () => {
      setShowPassword((prev) => !prev);
    };
  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
    <Box
      sx={{
        p: 4,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: "white",
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>
      {loginError && (
        <Typography color="error" align="center" sx={{ mb: 2 }}>
          {loginError}
        </Typography>
      )}
      <form onSubmit={handleSubmit}>
        <TextField
          label="User ID"
          variant="outlined"
          fullWidth
          margin="normal"
          value={userid}
          onChange={(e) => setUserid(e.target.value)}
        />
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          name="password"
          type={showPassword ? "text" : "password"}
          required
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          sx={{
            mb: 4,
            backgroundColor: "#f9f9f9",
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Login
        </Button>
      </form>
    </Box>
  </Container>
);
};
  

export default Mediuserlogin
