import * as React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import InputLabel from "@mui/material/InputLabel";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { BASE_URL } from "../CONSTANTS";

async function signInUser(credentials,role) {
  try {
    const url = `${BASE_URL}/auth/${role}/signin`;
    let res = await axios.post(url, credentials);
    const token = res.status === 200 ? res.data.token : "";
    return token;
  } catch (err) {
    console.error("Error in Sign In", err);
    return "";
  }
}


const theme = createTheme();

export default function SignIn({ setToken }) {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const role = data.get("role");
    const body = {
      email: data.get("email"),
      password: data.get("password"),
    };
    // console.log(body);
    const token = await signInUser(body,role);

    setToken(token);

    navigate("/");
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Grid item xs={4}>
                <FormControl fullWidth>
                  <InputLabel id="roleLabel">Role</InputLabel>
                  <Select
                    labelId="roleLabel"
                    id="role"
                    label="Role"
                    name="role"
                  >
                    <MenuItem value={"traveller"}>Traveller</MenuItem>
                    <MenuItem value={"driver"}>Driver</MenuItem>
                    <MenuItem value={"manager"}>Transport Manager</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/forgot-password" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

SignIn.propTypes = {
  setToken: PropTypes.func.isRequired,
};
