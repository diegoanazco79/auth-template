import { Button, Card, CircularProgress, Stack, Typography } from '@mui/material'

import useVerifyEmail from './hooks/useVerifyEmail'

import cocodrileLogin from '../../assets/cocodrile-login.png'
import { mainContainerStyles, verifyCardStyles } from "./styles"

const VerifyEmailPage = () => {
  const { loadingVerifyEmail} = useVerifyEmail()

  return (
    <div style={mainContainerStyles}>
      <Card sx={verifyCardStyles}>
        {loadingVerifyEmail 
          ?  <CircularProgress />
          : <>
            <img src={cocodrileLogin} width={110} style={{margin:15}}/>
            <Stack spacing={3}>
              <Typography variant='h4'>
                Congratulations!
              </Typography>
              <Typography variant='body1'>
                Your email has been verified.
              </Typography>

              <Button 
                variant='contained' size='large' fullWidth
                href='/login'
              >
                <Typography sx={{textTransform: 'none'}} variant='body2'>Log In</Typography>
              </Button>
            </Stack>
          </>
        }
      </Card>
    </div>
  )
}

export default VerifyEmailPage