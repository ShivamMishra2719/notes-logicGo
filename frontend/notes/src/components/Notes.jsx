// import React, { useState, useEffect } from 'react'
// import { apiGetNotes, apiCreateNote } from '../api'

// export default function Notes({ token, username }) {
//   const [notes, setNotes] = useState([])
//   const [title, setTitle] = useState('')
//   const [content, setContent] = useState('')
//   const [err, setErr] = useState('')

//   const load = async () => {
//     if (!token) {
//       setErr('Not logged in')
//       return
//     }
//     const res = await apiGetNotes(token, username)
//     if (Array.isArray(res)) {
//       setNotes(res)
//     } else {
//       setErr(res?.message || 'error loading notes')
//     }
//   }

//   useEffect(() => {
//     load()
//   }, [])

//   const add = async (e) => {
//     e.preventDefault()
//     if (!title) return alert('title required')
//     const res = await apiCreateNote(token, username, title, content)
//     if (res?._id) {
//       setNotes((prev) => [res, ...prev])
//       setTitle('')
//       setContent('')
//     } else {
//       alert(res?.message || 'error creating note')
//     }
//   }

//   if (err) return <div style={{ color: 'red' }}>{err}</div>

//   return (
//     <div>
//       <h2>Your Notes</h2>
//       <form onSubmit={add} style={{ marginBottom: 20 }}>
//         <input
//           placeholder="title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           required
//         />
//         <br />
//         <textarea
//           placeholder="content"
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//         />
//         <br />
//         <button type="submit" >Add Note</button>
//       </form>

//       <div>
//         {notes.length === 0 ? (
//           <div>No notes yet</div>
//         ) : (
//           <ul>
//             {notes.map((n) => (
//               <li key={n._id} style={{ marginBottom: 10 }}>
//                 <strong>{n.title}</strong>
//                 <div>{n.content}</div>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   )
// }


import React, { useState, useEffect } from 'react'
import { apiGetNotes, apiCreateNote } from '../api'
import './Notes.css'   // <-- add this

export default function Notes({ token, username }) {
  const [notes, setNotes] = useState([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [err, setErr] = useState('')

  const load = async () => {
    if (!token) {
      setErr('Not logged in')
      return
    }
    const res = await apiGetNotes(token, username)
    if (Array.isArray(res)) {
      setNotes(res)
    } else {
      setErr(res?.message || 'error loading notes')
    }
  }

  useEffect(() => {
    load()
  }, [])

  const add = async (e) => {
    e.preventDefault()
    if (!title) return alert('title required')
    const res = await apiCreateNote(token, username, title, content)
    if (res?._id) {
      setNotes((prev) => [res, ...prev])
      setTitle('')
      setContent('')
    } else {
      alert(res?.message || 'error creating note')
    }
  }

  if (err) return <div style={{ color: 'red' }}>{err}</div>

  return (
    <div className="notes-container">
      <h2 className="notes-heading">📝 Your Notes</h2>

      <form onSubmit={add} className="note-form">
        <input
          className="note-input"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className="note-textarea"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit" className="note-btn">Add Note</button>
      </form>

      <div className="notes-list">
        {notes.length === 0 ? (
          <div className="empty-msg">No notes yet</div>
        ) : (
          notes.map((n) => (
            <div key={n._id} className="note-card">
              <h3 className="note-title">{n.title}</h3>
              <p className="note-content">{n.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
