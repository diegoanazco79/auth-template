import { Controller } from "react-hook-form"
import { Card, IconButton, Stack, TextField, Typography } from "@mui/material"
import LoadingButton from '@mui/lab/LoadingButton'

import useSignup from "./hooks/useSignup"

import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import cocodrileLogin from '../../assets/cocodrile-login.png'
import { mainContainerStyles, signupCardStyles } from "./styles"

const SignupPage = () => {
  const { 
    control, errors, showPassword, passwordVisited, loadingSignup,
    handleClickShowPassword, handleMouseDownPassword, handleTextFieldFocus,
    handleTextFieldBlur, onSubmitSignup, handleSubmit
  } = useSignup()

  return (
    <div style={mainContainerStyles}>
      <Card sx={signupCardStyles}>
        <img src={cocodrileLogin} width={110} style={{margin:15}}/>
        <Stack spacing={3}>
          <Typography variant='h4'>Sign Up</Typography>
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
            name='firstName'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                error={errors.firstName?.message !== undefined}
                label='First Name'
                variant='filled'
                placeholder='Type your first name'
              />
            )}
          />
          <Typography variant='error'>
            {errors.firstName?.message}
          </Typography>
          <Controller
            name='lastName'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                error={errors.lastName?.message !== undefined}
                label='Last Name'
                variant='filled'
                placeholder='Type your last name'
              />
            )}
          />
          <Typography variant='error'>
            {errors.lastName?.message}
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
          <LoadingButton 
            loading={loadingSignup}
            loadingPosition='end'
            variant='contained' size='large' fullWidth
            onClick={handleSubmit(onSubmitSignup)}
          >
            <Typography sx={{textTransform: 'none'}} variant='body2'>Sign up</Typography>
          </LoadingButton>
        </Stack>
      </Card>
    </div>
  )
}

export default SignupPage