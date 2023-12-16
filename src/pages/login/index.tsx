import {
  Button, Card, Divider, IconButton, Link, Stack, TextField,
  Typography
} from "@mui/material"
import { Controller } from "react-hook-form"

import useLogin from "./hooks/useLogin"

import cocodrileLogin from '../../assets/cocodrile-login.png'
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"

import { loginCardStyles, mainContainerStyles } from "./styles"

const LoginPage = () => {

  const {
    showPassword, passwordVisited, control, errors,
    handleClickShowPassword, handleMouseDownPassword,
    handleTextFieldFocus, handleTextFieldBlur, handleSubmit,
    onSubmitLogin
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
          <Controller
            name='email'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                error={errors.email?.message !== undefined}
                label='Email Address'
                variant='filled'
                placeholder='Type your email'
              />
            )}
          />
          <Typography variant='error'>
            {errors.email?.message}
          </Typography>
          <Controller 
            name='password'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                variant='filled'
                label='Password'
                placeholder='Type your password'
                error={errors.password?.message !== undefined}
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (passwordVisited || field.value !== "") && (
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword 
                        ? <VisibilityOff color='primary' sx={{width:20}} /> 
                        : <Visibility color='primary' sx={{width:20}} />
                      }
                    </IconButton>
                  ),
                }}
                onFocus={handleTextFieldFocus}
                onBlur={handleTextFieldBlur}
              />
            )}
          />
          <Typography variant='error'>
            {errors.password?.message}
          </Typography>
          <Link
            variant='body2'
            underline='hover'
            sx={loginCardStyles.forgotLink}
            href='/forgot-password'
          >
            Forgot password?
          </Link>
          <Button 
            variant='contained' size='large' fullWidth
            onClick={handleSubmit(onSubmitLogin)}
          >
            <Typography sx={{textTransform: 'none'}} variant='body2'>Log In</Typography>
          </Button>
          <Typography variant='body2'>
            Need to create an account?{" "} 
            <Link
              variant='body2'
              underline='hover'
              sx={loginCardStyles.signUpLink}
              href='/signup'
            >
              Sign Up
            </Link>
          </Typography>
        </Stack>
      </Card>
    </div>
  )
}

export default LoginPage
