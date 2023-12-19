import { Card, IconButton, Stack, TextField, Typography } from "@mui/material"
import { Controller } from "react-hook-form"
import { LoadingButton } from "@mui/lab"

import useResetPassword from "./hooks/useResetPassword"

import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import cocodrileLogin from '../../assets/cocodrile-login.png'
import { mainContainerStyles, resetPasswordCardStyles } from "./styles"

const ResetPasswordPage = () => {
  const { 
    control, errors, showPassword, passwordVisited, loadingResetPassword,
    handleClickShowPassword, handleMouseDownPassword, handleTextFieldFocus,
    handleTextFieldBlur, onSubmitResetPassword, handleSubmit
  } = useResetPassword()

  return (
    <div style={mainContainerStyles}>
      <Card sx={resetPasswordCardStyles}>
        <img src={cocodrileLogin} width={110} style={{margin:15}}/>
        <Stack spacing={3}>
          <Typography variant='h4'>Recover your password</Typography>
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
            loading={loadingResetPassword}
            loadingPosition='end'
            variant='contained' size='large' fullWidth
            onClick={handleSubmit(onSubmitResetPassword)}
          >
            <Typography sx={{textTransform: 'none'}} variant='body2'>
              Reset password
            </Typography>
          </LoadingButton>
        </Stack>
      </Card>
    </div>
  )
}

export default ResetPasswordPage