import { Button, Card, Stack, Typography } from "@mui/material"

import { useAuthStore } from "../../store/authStore"

import crocodileDashboard from '../../assets/crocodrile-dashboard.png'
import { dashboardCardStyles, mainContainerStyles } from "./styles"

const DashboardPage = () => {
  const { user, token, logout } = useAuthStore((state) => ({
    user: state.user,
    token: state.token,
    logout: state.logout
  }))

  return (
    <div style={mainContainerStyles}>
      <Card sx={dashboardCardStyles}>
        <img src={crocodileDashboard} width={110} style={{margin:15}}/>
        {token && (
          <Stack spacing={3}>
            <Typography variant='h4'> 
              Hi, {user?.firstName} {user?.lastName}
            </Typography>
            <Button 
              variant='contained' color='primary'
              onClick={() => logout()}
            >
              <Typography sx={{textTransform: 'none'}} variant='body2'>Log Out</Typography>
            </Button>
          </Stack>
        )}
      </Card>
    </div>
  )
}

export default DashboardPage
