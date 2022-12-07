
const { collection, getDocs, deleteDoc } = require("firebase/firestore/lite")
const { FirebaseDB } = require("../../../src/firebase/config")
const { savingNewNote, addNewEmptyNote, setActiveNote } = require("../../../src/store/journal/journalSlice")
const { startNewNote } = require("../../../src/store/journal/thunks")


describe('Pruebas en JorunalThunks', () => { 

    const dispatch = jest.fn()
    const getState = jest.fn()

    beforeEach( () => jest.clearAllMocks() )
    
    test('startNewNote debe de crear una nueva nota en blanco', async () => {
        
        const uid = 'TEST-UID'
        getState.mockReturnValue({ auth: {uid: uid }})
        
        await startNewNote()( dispatch, getState )

        expect( dispatch ).toHaveBeenCalledWith( savingNewNote() )
        expect( dispatch ).toHaveBeenCalledWith( addNewEmptyNote({
            body:'',
            title:'',
            id: expect.any( String ),
            date: expect.any( Number ),
            imageUrls: expect.any( Array )
        }))
        expect( dispatch ).toHaveBeenCalledWith( setActiveNote({
            body:'',
            title:'',
            id: expect.any( String ),
            date: expect.any( Number ),
            imageUrls: expect.any( Array )
        }))

        const collectionRef = collection( FirebaseDB, `${uid}/journal/notas` )
        const docs = await getDocs( collectionRef )

        const deletePromises = []
        docs.forEach( doc => deletePromises.push(deleteDoc( doc.ref)) );
        await Promise.all( deletePromises )

        
     })


     //Borrar de firabase
     

 })