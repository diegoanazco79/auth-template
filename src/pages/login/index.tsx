import {
  Button, Card, Divider, IconButton, Link, Stack, TextField,
  Typography
} from "@mui/material"

import useLogin from "./hooks/useLogin"

import cocodrileLogin from '../../assets/cocodrile-login.png'
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
        <img src={cocodrileLogin} width={110} style={{margin:15}}/>
        <Stack spacing={3}>
          <Typography variant='h4'>Log In</Typography>
          <Button variant='outlined' fullWidth>
            Google Login Button
          </Button>
          <Divider>
            <Typography variant='body2'>Or</Typography>
          </Divider>
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
                  {showPassword ? <VisibilityOff sx={{width:20}} /> : <Visibility sx={{width:20}} />}
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
          <Button variant='contained' size='large' fullWidth>
            <Typography sx={{textTransform: 'none'}} variant='body2'>Log In</Typography>
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
