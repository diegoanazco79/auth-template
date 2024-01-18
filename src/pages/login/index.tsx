import {
  Box,
  Card, CircularProgress, Divider, IconButton, Link, Stack, TextField,
  Typography
} from "@mui/material"
import { LoadingButton } from "@mui/lab"
import { Controller } from "react-hook-form"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'

import useLogin from "./hooks/useLogin"
import { useAuthStore } from "../../store/authStore"

import cocodrileLogin from '../../assets/crocodrile-login.png'
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"

import { googleButtonStyles, loginCardStyles, mainContainerStyles } from "./styles"

const LoginPage = () => {
  const {
    showPassword, passwordVisited, control, errors, loadingLogin,
    loadingGoogleLogin,
    handleClickShowPassword, handleMouseDownPassword,
    handleTextFieldFocus, handleTextFieldBlur, handleSubmit,
    onSubmitLogin, onGoogleLogin
  } = useLogin()

  const googleClientId = import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID

  const user = useAuthStore((state) => state.user)
  const navigate = useNavigate()

  useEffect(() => {
    if (user) navigate("/")
  }, [user]); // eslint-disable-line

  return (
    <div style={mainContainerStyles}>
      <Card sx={loginCardStyles}>
        <img src={cocodrileLogin} width={110} style={{margin:15}}/>
        <form onSubmit={handleSubmit(onSubmitLogin)}>
          <Stack spacing={3}>
            <Typography variant='h4'>Log In</Typography>
            <Box>
              <GoogleOAuthProvider clientId={googleClientId}>
                {loadingGoogleLogin ? (
                  <Box sx={googleButtonStyles}>
                    <CircularProgress size={20} />
                  </Box>
                ): (
                  <GoogleLogin
                    width='fit-content'
                    onSuccess={(res) => onGoogleLogin(res)}
                  />
                )}
              </GoogleOAuthProvider>
            </Box>
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
                  disabled={loadingGoogleLogin || loadingLogin}
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
                  disabled={loadingGoogleLogin || loadingLogin}
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
            <LoadingButton
              type='submit' 
              loading={loadingLogin}
              disabled={loadingGoogleLogin || loadingLogin}
              variant='contained' size='large' fullWidth
            >
              <Typography sx={{textTransform: 'none'}} variant='body2'>Log In</Typography>
            </LoadingButton>
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
        </form>
      </Card>
    </div>
  )
}

export default LoginPage
