import * as React from 'react'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'

export function ShowPasswordButton({ showPass, setShowPass }) {
  return (
    <FormGroup sx={{ position: 'absolute', top: 295, left: 30 }}>
      <FormControlLabel
        control={
          <Checkbox
            onClick={() => setShowPass(!showPass)}
            size="small"
            sx={{
              '&, & + .MuiFormControlLabel-label': {
                color: '#5B5351 ',
              },
            }}
          />
        }
        label="Show password"
      />
    </FormGroup>
  )
}
