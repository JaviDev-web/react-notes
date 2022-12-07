import { authSlice, checkingCredentials, login, logout } from "../../../src/store/auth/authSlice"
import { authenticatedState, demoUser, initialState, notAuthenticatedState } from "../../fixtures/authFixtures"

describe('Pruebas en el authSlice', () => { 
    
    test('should de regresar el estado inicial y llamarase', () => { 
        
        const state = authSlice.reducer( initialState, {} )
        
        
        expect( state ).toEqual( initialState )
        expect( authSlice.name).toBe('auth')

     })

     test('should de realizar la autenticacion', () => { 
        
        const state = authSlice.reducer( initialState, login( demoUser ) )
        

        expect( state ).toEqual( {
        status: 'authenticated',
        uid: demoUser.uid,
        email: demoUser.email,
        displayName: demoUser.displayName,
        photoURL: demoUser.photoURL,
        errorMessage: null,})
      })

      test('should de realizar el logout sin argumentos ', () => { 
        
        const state = authSlice.reducer( authenticatedState, logout())

        
        expect( state ).toEqual({
            status: 'not-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: undefined
          })
       })


       test('should de realizar el logout con argumentos ', () => { 
        
        const errorMessage = 'Credenciales no son correctas'
        const state = authSlice.reducer( authenticatedState, logout({ errorMessage }))


        // console.log( state );


        expect( state ).toEqual({
            status: 'not-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: 'Credenciales no son correctas'
          })
       })


       test('should de cambiar el estado a cheking', () => { 
        
            const state = authSlice.reducer( notAuthenticatedState, checkingCredentials())
            // console.log( state);

            expect( state.status).toBe("checking")
        })



 })