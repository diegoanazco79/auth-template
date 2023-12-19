import { Card, Stack, TextField, Typography } from "@mui/material"
import { LoadingButton } from "@mui/lab"
import { Controller } from "react-hook-form"

import useForgotPassword from "./hooks/useForgotPassword"

import cocodrileLogin from "../../assets/cocodrile-login.png"
import { forgotPasswordCardStyles, mainContainerStyles } from "./styles"

const ForgotPasswordPage = () => {
  const { 
    control, errors, loadingSendEmail,
    handleSubmit, onSubmitForgotPassword 
  } = useForgotPassword()

  return (
    <div style={mainContainerStyles}>
      <Card sx={forgotPasswordCardStyles}>
        <img src={cocodrileLogin} width={110} style={{ margin: 15 }} />
        <Stack spacing={3}>
          <Typography variant='h4'>Forgot your password?</Typography>
          <Typography variant='body1'>
            Enter your email address below and we&apos;ll send you a link to reset your password.
          </Typography>
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
          <Typography variant='error'>{errors.email?.message}</Typography>
          <LoadingButton 
            loading={loadingSendEmail}
            variant='contained' size='large' fullWidth
            onClick={handleSubmit(onSubmitForgotPassword)}
          >
            <Typography sx={{textTransform: 'none'}} variant='body2'>Send Email</Typography>
          </LoadingButton>
        </Stack>
      </Card>
    </div>
  )
}

export default ForgotPasswordPage
