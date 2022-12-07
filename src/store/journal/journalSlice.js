import { createSlice } from '@reduxjs/toolkit'

export const journalSlice = createSlice({
     name: 'journal',
     initialState: {
         isSaving: false,
         messageSaved:'',
         notes:[],
         active: null,
        // active: {
        //     id: 'ABC123',
        //     title:'',
        //     body:'',
        //     date:123456,
        //     imageUrls: [],//https://foto1.jpg, https://foto2.jpg, https://foto3.jpg
        // }
     },
     reducers: {
        savingNewNote:( state ) =>{
            state.isSaving = true
        },
        addNewEmptyNote:( state, action ) =>{

            state.notes.push( action.payload )
            state.isSaving = false

       },
        setActiveNote: ( state, action ) => {
            state.active = action.payload

        },
        setNotes: ( state, action) => {
            state.notes = action.payload
        },
        setSaving: ( state ) => {
            state.isSaving = true
            state.messageSaved = ''
            
            //TODO: mensaje de error... 
        },
        noteUpdated: ( state, action ) => {
            state.isSaving = false 
            state.notes = state.notes.map( note => {

                if( note.id === action.payload.id ){

                    return action.payload
                }
                return note
            } )
            state.messageSaved = `${ action.payload.title }, actualizada correctamente`
            //Todo: Mostrar mensaje de actualizacion 
        },
        setPhotosToActiveNote: ( state, action ) =>{
            state.active.imageUrls = [...state.active.imageUrls, ...action.payload]
            state.isSaving = false 
           
        },
        clearNotesLogout: ( state ) => {
            state.isSaving = false
            state.messageSaved
            state.notes = []
            state.active = null
        },
        deleteNoteById: ( state, action ) => {
            state.active = null
            state.notes = state.notes.filter( note => note.id !== action.payload)
            
        }

     },
   })


// Action creators are generated for each case reducer function
export const {  clearNotesLogout,
                savingNewNote,
                addNewEmptyNote,
                setActiveNote,
                setNotes,
                setSaving,
                noteUpdated,
                deleteNoteById,
                setPhotosToActiveNote,
             } = journalSlice.actions