import {
  Button, Card, Divider, IconButton, Link, Stack, TextField,
  Typography
} from "@mui/material"

import useLogin from "./hooks/useLogin"

import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"

import { loginCardStyles, mainContainerStyles } from "./styles"

const LoginPage = () => {

  const {
    password, showPassword, passwordVisited,
    handlePasswordChange, handleClickShowPassword, handleMouseDownPassword,
    handleTextFieldFocus, handleTextFieldBlur,
  } = useLogin()

  return (
    <div style={mainContainerStyles}>
      <Card sx={loginCardStyles}>
        <Stack spacing={2}>
          <Typography variant='h4'>Log In</Typography>
          <Button variant='outlined' fullWidth>
            Google Login Button
          </Button>
          <Divider>Or</Divider>
          <Typography variant='body1'>Log in using email address</Typography>
          <TextField
            label='Email Address'
            variant='filled'
            placeholder='Type your email'
          />
          <TextField
            variant='filled'
            label='Password'
            value={password}
            placeholder='Type your password'
            type={showPassword ? "text" : "password"}
            onChange={handlePasswordChange}
            InputProps={{
              endAdornment: (passwordVisited || password !== "") && (
                <IconButton
                  aria-label='toggle password visibility'
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              ),
            }}
            onFocus={handleTextFieldFocus}
            onBlur={handleTextFieldBlur}
          />
          <Link
            variant='body2'
            underline='hover'
            sx={loginCardStyles.forgotLink}
          >
            Forgot password?
          </Link>
          <Button variant='contained' fullWidth>
            Log In
          </Button>
          <Typography variant='body2'>
            Need to create an account?  
            <Link
              variant='body2'
              underline='hover'
              sx={loginCardStyles.signUpLink}
            >
              {" "} Sign Up
            </Link>
          </Typography>
        </Stack>
      </Card>
    </div>
  )
}

export default LoginPage
