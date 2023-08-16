import { Stack, Typography } from '@mui/material'
import React from 'react'

const NoBoards = () => {
  return (
    <>
      <Stack direction={'column'} alignItems={'center'} justifyContent={'center'} sx={{ mt: 5, width: '100%' }}>
        <Typography variant="h6" color="inherit">No boards created</Typography>
        <Typography variant="body1" color="inherit">Create your first board today!</Typography>
      </Stack> 
    </>
  )
}

export default NoBoards
