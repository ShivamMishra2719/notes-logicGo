import React, { useState, useEffect } from 'react'
import Register from './components/Register'
import Login from './components/Login'
import Notes from './components/Notes'

export default function App(){
const [token, setToken] = useState(localStorage.getItem('token') || '');
const [username, setUsername] = useState(localStorage.getItem('username') || '');

  useEffect(()=>{
  localStorage.setItem('token', token);
  localStorage.setItem('username', username);
  },[token, username]);

  return (
      <div style={{  margin: '50px 500px', textAlign:'center' ,fontFamily: 'Arial, sans-serif' }}>
      <h1>Simple Notes App</h1>
      {!token ? (
      <div style={{ display: 'flex', gap: 20 }}>
      <Register onRegisterMsg={msg => alert(msg)} />
      <Login onLogin={(t,u)=>{ setToken(t); setUsername(u); }} />
      </div>
      ) : (

      <>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <div>Logged in as <strong>{username}</strong></div>
    <button onClick={()=>{ setToken(''); setUsername(''); localStorage.clear(); }}>Logout</button>
    </div>
    <Notes token={token} username={username} />
    </>
)}
</div>
)
};


