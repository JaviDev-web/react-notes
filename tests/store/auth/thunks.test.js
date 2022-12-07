
import { loginWithEmailPassword, logoutFirebase, singInWithGoogle } from "../../../src/firebase/providers"
import { checkingCredentials, login, logout } from "../../../src/store/auth/authSlice"
import { checkingAuthentication, startGoogleSignIn, startLoginWithEmailPassword, startLogout } from "../../../src/store/auth/thunks"
import { clearNotesLogout } from "../../../src/store/journal/journalSlice"
import { demoUser } from "../../fixtures/authFixtures"

jest.mock('../../../src/firebase/providers')

describe('Pruebas en AuthThunks', () => { 

    const dispatch = jest.fn()

    beforeEach(()=> jest.clearAllMocks() )
    
    test('should de de llamar la funcion checkingAuthentication', async () => { 

        await checkingAuthentication()( dispatch )
        expect( dispatch ).toHaveBeenCalledWith(checkingCredentials())
        

     })

     test('la funcion startGoogleSignIn debe de llamar checkingCredentials y login', async () => { 

        const loginData = { ok: true,...demoUser }
        await singInWithGoogle.mockResolvedValue( loginData )

        await startGoogleSignIn()( dispatch )

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() )
        expect( dispatch ).toHaveBeenCalledWith( login( loginData ))

      })

      test('la funcion startGoogleSignIn debe de llamar checkingCredentials y lohouy - error', async () => { 

        const loginData = { ok: false, errorMessage: 'Un error de Google' }
        await singInWithGoogle.mockResolvedValue( loginData )

        await startGoogleSignIn()( dispatch )


        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() )
        expect( dispatch ).toHaveBeenCalledWith( logout( loginData.errorMessage ) )


      })

      test('startLoginWithEmailPassword debe de llamar chechingCredentials y login - Exito', async () => { 
        
        const loginData = { ok: true, ...demoUser }
        const formData = { email: demoUser.email, password: '1234567'}

        await loginWithEmailPassword.mockResolvedValue( loginData )

        await startLoginWithEmailPassword( formData )( dispatch )

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() )
        expect( dispatch ).toHaveBeenCalledWith( login( loginData ) )

        
       })

       test('startLogout debe de llamar logoutFirebase, clearNotes y logout', async () => { 
        
        await startLogout()( dispatch )

        expect( logoutFirebase ).toHaveBeenCalled()
        expect( dispatch ).toHaveBeenCalledWith( clearNotesLogout())
        // expect( logout ).toHaveBeenCalled()

        })

 })