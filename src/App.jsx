import React from 'react'
import Editor from "./components/Editor"
import Sidebar from "./components/Sidebar"
import Split from 'react-split'
import { nanoid } from "nanoid"
import { onSnapshot, addDoc, doc, deleteDoc, setDoc } from 'firebase/firestore'
import { notesCollection, db } from "./firebase"
import './App.css'

export default function App() {

  const [notes, setNotes] = React.useState([])
  const [currentNoteId, setCurrentNoteId] = React.useState("")

  const currentNote = notes.find((note) => note.id === currentNoteId) || notes[0]

  const sortedNotes = notes.sort((a,b) => b.updatedAt - a.updatedAt)


  React.useEffect(() => {
   const unsubscribe = onSnapshot(notesCollection, function(snapshot) {
        const newArr = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id
        }))
        setNotes(newArr)
   })
   return unsubscribe
  },[])

  React.useEffect(() => {
    if (notes.length > 0 && !currentNoteId) {
        setCurrentNoteId(notes[0]?.id);
    }
}, [notes]);


  async function createNewNote() {
    const newNote = {
        body: "Enter your title here",
        createdAt: Date.now(),
        updatedAt: Date.now(),
    };
    const newNoteRef = await addDoc(notesCollection, newNote);
    setCurrentNoteId(newNoteRef.id);
  }


  async function updateNote(text){
    const docRef = doc(db, "notes", currentNoteId)
    await setDoc(
      docRef,
      {body: text, updatedAt: Date.now()},
      {merge: true}
    )
  }

  
  async function deleteNote(noteId) {
    const docRef = doc(db, "notes", noteId)
    await deleteDoc(docRef)
  }


  return (
    <main>
      {
        notes.length > 0 ?
        <Split
          sizes={[30,70]}
          direction="horizontal"
          className="split"
        >
          <Sidebar
            notes={sortedNotes}
            setCurrentNoteId={setCurrentNoteId}
            currentNote={currentNote}
            createNewNote={createNewNote}
            deleteNote={deleteNote}
          />
          {
            <Editor
              currentNote = {currentNote}
              updateNote = {updateNote}
            />
          }
        </Split>
        :
        <div className='no-notes'>
          <h1>You have no notes</h1>
          <button className='first-note' onClick={createNewNote}>
            Create New One
          </button>
        </div>
      }
    </main>  
  )
}


// To use localStorage instead of Firebase:


// const [notes, setNotes] = React.useState( () =>
//   JSON.parse(localStorage.getItem("notes")) || []
// )

// React.useEffect(() => {
//  localStorage.setItem("notes", JSON.stringify(notes))
// },[notes])

// function createNewNote() {
//   const newNote = {
//     id: nanoid(),
//     body : "Enter your title here"
//   }
//   setNotes([newNote, ...notes])
//   setCurrentNoteId(newNote.id)
// } 

// function deleteNote(event, noteId) {
//   event.stopPropagation()
//   setNotes(oldNotes => oldNotes.filter(note => note.id !== noteId))
// }
