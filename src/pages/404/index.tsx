import { Card, Typography } from '@mui/material'
import { Stack } from '@mui/system'

import { mainContainerStyles, notFoundCardStyles } from './styles'
import crocodileNotFound from '../../assets/crocodrile-404.png'

const NotFoundPage = () => {
  return (
    <div style={mainContainerStyles}>
      <Card sx={notFoundCardStyles}>
        <img src={crocodileNotFound} width={200} style={{margin:15}}/>
        <Stack spacing={3}>
          <Typography variant='h1' sx={{opacity: 0.5}}> 
              404
          </Typography>
          <Typography variant='h4'> 
              Page Not Found
          </Typography>
        </Stack>
      </Card>
    </div>
  )
}

export default NotFoundPage