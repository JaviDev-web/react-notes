import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { addNewEmptyNote, savingNewNote, setActiveNote, setNotes, setSaving, noteUpdated, setPhotosToActiveNote, deleteNoteById } from "./";
import { fileUpload, loadNotes } from "../../helpers";

export const startNewNote = ()=>{

    return async( dispatch, getState ) => {

        //Todo todo
        dispatch( savingNewNote() )

        //uid
       const { uid } = getState().auth
    //    console.log( uid );

        const newNote = {
            title: '',
            body: '',
            imageUrls: [],
            date: new Date().getTime()

        }


        const newDoc = doc( collection( FirebaseDB, `${uid}/journal/notas` ))
        const setDocResp = await setDoc( newDoc, newNote ) 

        newNote.id = newDoc.id

        // console.log(newDoc);
        //!dispatch
        dispatch( addNewEmptyNote( newNote ) )
        dispatch( setActiveNote( newNote ) )
        


    }





}


export const startLoadingNotes =( ) => {

    return async( dispatch, getState ) => {

        const { uid } = getState().auth
        if (!uid ) throw new Error('El UID del usuario no existe')


        const notes = await loadNotes( uid )
        dispatch( setNotes( notes ))
    }

}

export const startSaveNote = () => {
    return async( dispatch, getState ) => {

        dispatch( setSaving() )

        const { uid } = getState().auth
        const { active:note } = getState().journal

        const noteToFireStore = { ...note }

        delete noteToFireStore.id

        const docRef= doc( FirebaseDB,`${uid}/journal/notas/${ note.id }` )
        await setDoc( docRef, noteToFireStore, {merge: true })
        dispatch( noteUpdated ( note ))
    }
}

export const startUploadingFiles = ( files ) => {
    return async( dispatch )=> {
        dispatch( setSaving() )

        console.log(files);

        // await fileUpload( files[0] )

         const fileUploadPromises = []

         for ( const file of files ) {
            fileUploadPromises.push ( fileUpload( file ))
         }

         const photosUrls = await Promise.all( fileUploadPromises )
         
         dispatch( setPhotosToActiveNote( photosUrls ))

    }
}

export const startDeletingNote = (  ) =>{
   
    return async ( dispatch, getState ) => {

        const { uid } = getState().auth
        const { active: note } = getState().journal

        const docRef = doc( FirebaseDB, `${ uid }/journal/notas/${ note.id }`)
        await deleteDoc( docRef )

        dispatch( deleteNoteById( note.id ))
        
    }
}