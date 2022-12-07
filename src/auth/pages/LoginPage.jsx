import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { Google } from '@mui/icons-material';
import { AuthLayout } from '../layout/AuthLayout';



import { useForm } from '../../hook/useForm';
import {  startGoogleSignIn, startLoginWithEmailPassword } from '../../store/auth';


const formData = {
  email: '',
  password: ''
  }

// const formValidations = {
//   email:[( value ) => value.includes('@'), 'El correo debe de tener un @'],
//   displayName: [( value ) => value.length >1 , 'El nombre es obligatorio']
// }


export const LoginPage = () => {


  const { status, errorMessage } = useSelector(state => state.auth )

  const dispatch = useDispatch()

  const isAuthenticating =useMemo( () => status === 'checking', [ status ])
 


  
  const {  formState,   displayName,       email,      password, 
    isFormValid, displayNameValid , emailValid, passwordValid,
    onInputChange,
  } = useForm(formData)

  const onSubmit = ( event ) => {
    event.preventDefault()
    dispatch( startLoginWithEmailPassword ( {email, password } ))
  }

  const onGoolgeSignIn = ( event ) => {
    // console.log('onGoogleSignIn');
    dispatch ( startGoogleSignIn() )
  }
  



  return (
    <AuthLayout title="Login">
      <form 
      aria-label="submit-form"
      onSubmit={ onSubmit } 
      className='animate__animated animate__fadeIn animate__fast'>
          <Grid container>
            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Correo" 
                type="email" 
                placeholder='correo@google.com' 
                name='email'
                value={ email }
                onChange = { onInputChange }
                fullWidth
              />
            </Grid>

            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Contraseña" 
                type="password" 
                placeholder='Contraseña' 
                name='password'
                value={ password }
                onChange = { onInputChange }
                fullWidth
                inputProps = {{
                  'data-testid': 'password'
                }}
              />
            </Grid>

            <Grid 
              container
              display= { !!errorMessage? '': 'none' }
              sx={{mt: 1}}
            >
                <Grid 
                    item 
                    xs={ 12 }
                    
                  >
                    <Alert severity='error'>{errorMessage}</Alert>
                </Grid>
            </Grid>
            
            <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
              <Grid item xs={ 12 } sm={ 6 }>
                <Button disabled={isAuthenticating} type='submit' variant='contained' fullWidth>
                  Login
                </Button>
              </Grid>
              <Grid item xs={ 12 } sm={ 6 }>
                <Button 
                disabled={isAuthenticating} 
                variant='contained' 
                fullWidth
                onClick={ onGoolgeSignIn } 
                aria-label="google-btn"
                >
                  <Google />
                  <Typography sx={{ ml: 1 }}>Google</Typography>
                </Button>
              </Grid>
            </Grid>


            <Grid container direction='row' justifyContent='end'>
              <Link component={ RouterLink } color='inherit' to="/auth/register">
                Crear una cuenta
              </Link>
            </Grid>

          </Grid>


        </form>

    </AuthLayout>
  )
}
